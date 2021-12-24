> Please note: This project is just a **proof of concept** and only for **experimenting purposes**. It is also not optimized for production use. And it is a **work in progress**.

# Apple TV Homescreen (Experimental)

This is an experimental implementation of my [apple-tv-card](https://github.com/marcreichel/apple-tv-card) project.

![Screenshot](docs/screenshot.png)

## Features

- Hover animation of the apps (thanks to my [apple-tv-card](https://github.com/marcreichel/apple-tv-card) package)
- Drag and drop apps around (thanks to the [muuri.js](https://github.com/haltu/muuri) package)

## Demo

[Live Demo](https://marcreichel.github.io/apple-tv)

## Roadmap

Things I may implement in the future.

- Change the header part of the homescreen to content matching the recent hovered/focused app from the dock.
- Persist the sorted apps to local storage.

## Known issues

All known issues are listed below and may be addressed in the future.

- When dragging an app to the "dock" there is a little layout shift due to the app title which is hidden for apps inside
  the dock.
- After reordering the apps the focus order is not correct.

