# starter-platform
A simple stack to allow you to get started using RxJS to read analog data from hardware. It's flexible and expandible - the goal is to give developers a platform that will allow them to understand the usage of observables with relation to hardware. From there, the sky is the limit on how to apply this new found revelation!

## Getting Started

To get up and running:

1. Plug in an Arduino or other johnny-five compatible board.
2. Flash your board with the latest Firmata firmware.
3. Fork or clone this repo.
4. `npm install` to install dependencies.
5. Configure your device and circuit pieces in johnny-five in the `/server/device.js` file.
6. Change whatever you wish in the client CSS, JS, and HTML files. RxJS lets you use sockets as observables, so the world is your oyster!
7. Run `npm start` to build and run.
8. Head over to `localhost:8080` to watch in amazement.

## Building on the Starter Platform (a documentation work in progress)

IoTReX is designed to be modular so that you can replace and enhance whatever area of the stack you want to change. Let's look at each piece of the stack as it is out of the box so that you can decide how you want to customize and expand.

## The Server

The device and server set-up is inspired by Rachel White's [Robokitty](https://github.com/rachelnicole/robokitty) project. Thanks, Rachel!

### The Device

- johnny-five

### The Server

- Hapi.js
- Socket.io

## The Client

- jQuery
- RxJS
- Marbelous

### The Build

- Gulp