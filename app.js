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
            layoutSender: () => synchronize(),
            layoutReceiver: () => synchronize(),
        });
    }
});

grid.on('receive', function (data) {
    grid.refreshItems([data.item], true);
    grid.layout();
    synchronize();
    const count = header.getItems().length;
    if (count < 5) {
        const itemIndex = data.toIndex ? 0 : 1;
        grid.send(itemIndex, header, count, {
            appendTo: document.querySelector('.header .grid'),
            layoutSender: () => synchronize(),
            layoutReceiver: () => synchronize(),
        });
    }
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

document.body.onload = () => {
    let activeIconIndex = 0;
    const icons = document.querySelectorAll('.content');

    // add event listener to listen for arrow key presses
    document.addEventListener('keydown', (event) => {
        const key = event.key;
        switch (key) {
            case 'ArrowUp':
            activeIconIndex = Math.max(activeIconIndex - 5, 0);
            break;
          case 'ArrowDown':
            activeIconIndex = Math.min(activeIconIndex + 5, icons.length - 1);
            break;
          case 'ArrowLeft':
            activeIconIndex = Math.max(activeIconIndex - 1, 0);
            break;
          case 'ArrowRight':
            activeIconIndex = Math.min(activeIconIndex + 1, icons.length - 1);
            break;
        }

        // unfocus all icons
        icons.forEach(icon => icon.blur());

        // focus the selected icon
        icons[activeIconIndex].focus();
    });
}
