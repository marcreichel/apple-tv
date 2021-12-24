var header = new Muuri('.header .grid', {
    dragEnabled: true,
    layoutOnResize: true,
    dragHandle: '.apple-tv-card',
    dragStartPredicate: {
        distance: 1,
    },
    dragRelease: {
        useDragContainer: false,
    },
    dragSort: getAllGrids,
});
var grid = new Muuri('.body .grid', {
    dragEnabled: true,
    layoutOnResize: true,
    dragHandle: '.apple-tv-card',
    dragStartPredicate: {
        distance: 1,
    },
    dragRelease: {
        useDragContainer: false,
    },
    dragSort: getAllGrids,
});

header.on('receive', function (data) {
    header.refreshItems([data.item], true);
    const count = header.getItems().length;
    if (count >= 6) {
        header.send(count - 1, grid, 0, {
            appendTo: document.querySelector('.header .grid'),
            layoutSender: function (isAborted, items) {
                synchronize();
            },
            layoutReceiver: function (isAborted, items) {
                synchronize();
            },
        });
    }
});

grid.on('receive', function (data) {
    grid.refreshItems([data.item], true);
    grid.layout();
    synchronize();
});

header.on('dragReleaseStart', function() {
    grid.refreshItems();
    grid.layout();
    synchronize();
});

grid.on('dragReleaseStart', function() {
    grid.refreshItems();
    grid.layout();
    synchronize();
});

function getAllGrids(item) {
    return [header, grid];
}

function synchronize() {
    setTimeout(() => {
        header.synchronize();
        grid.synchronize();
    });
}

document.querySelectorAll('.apple-tv-card .content').forEach((hyperlink) => {
    hyperlink.addEventListener('click', function (event) {
        const element = event.target.closest('.muuri-item');
        if (element.classList.contains('muuri-item-releasing')) {
            event.preventDefault();
            event.stopImmediatePropagation();
            event.stopPropagation();
        }
    });
});
