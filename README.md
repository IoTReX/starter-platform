# starter-platform
A simple stack to allow you to get started using RxJS to read analog data from hardware. It's flexible and expandible - the goal is to give developers a platform that will allow them to understand the usage of observables with relation to hardware. From there, the sky's the limit!

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

## Expanding on the Starter Platform *(work in progress)*

This platform is designed to be modular so that you can replace and enhance whatever area of the stack you want to change. Let's look at each piece of the stack as it is out of the box so that you can decide how you want to customize and expand.

## The Server

The device and server set-up is inspired by Rachel White's [Robokitty](https://github.com/rachelnicole/robokitty) project. Thanks, Rachel!

### The Device

The device set-up is a host-client relationship using [johnny-five](https://github.com/rwaldron/johnny-five/). What this means to you is that you can use any device and configuration compatible with johnny-five, which relies on the [Firmata](https://github.com/firmata/) firmware. The johnny-five documentation is quite good with regard to how to set up and configure different boards and devices.

In `server/device.js`, you'll see that currently two photoresistor cells are plugged in to pins A1 and A2:

```javascript
photoresistor = new five.Sensor({
        pin: "A0",
        freq: 250
      });

      photoresistor2 = new five.Sensor({
        pin: "A1",
        freq: 250
      });
```

You could swap these out with sensors of any kind, as well as servos or other modules. You're only limited by johnny-five. You can then create sockets that emit this data to the server.

### The Server

The server right now is a super simple implementation of Hapi.js in `server/server.js` that serves up the `dist` directory.

Then, in `app.js`, socket.io is used to decorate the server. You now have data streaming from your analog sensors on your device to your server using socket.io. Way to go!

## The Client

The client is where there is a mind-boggling possibility for customization. 

The `client` directory is home to all of your front end files. Since RxJS is a functional reactive approach that uses array operators all day long, I've included Babel in the build process so you can take advantage of ES6 niceties like arrow functions.

The core of the IoTReX concept is the connection between socket.io and RxJS, so in `client/app.js` you'll see the following:

```javascript
var socket = io.connect('http://localhost:8080', {reconnect: true});
```

From there, you can use Rx to create observables from the socket, like so:

```javascript
let source$ = Rx.Observable.fromEvent(socket, 'photoData').distinctUntilChanged();
```

To illustrate just how cool using RxJS to read and manipulate data from hardware is, I've included Pete Hodgson's Marbelous library, which uses jQuery and d3 to help visualize observables in the style of [RxMarbles](http://www.rxmarbles.com).

Really, though, you can do just about anything you want with this set-up. Here are some ideas:

- Use Redux for data flow
- Use Angular 2 (RxJS is already built in!)
- Use React
- Show off those amazing d3 and animation skills you have
- Map observable data to pitch or tone to make music (I used Timbre.js to make a theremin!)

### The Build

Since front end build processes are the wild west these days, and the ideal set-up depends greatly on what framework you'reusing, I opted to go super simple with a gulp build process that uses paths defined in `package.json`.  The good news is it's very straight-forward: when you run `gulp build`, it concatenates your CSS, transpiles your ES6 JS to ES5, concatenates the JS, injects the files into `index.html`, and spits all the new files into the `dist` folder.

The bad news is that I left this super barebones right now. Ideas for the build process are many:

- Add jshint
- Add the testing framework of your choice
- Switch to webpack
- Use a modular system so you don't have to keep track of file paths

If anyone wants to pitch in on refining this build process, submit a PR It'd make my day.

## Thanks

Thanks to the following people for their help, support, and libraries:
- [Rachel White](https://github.com/rachelnicole)
- [Rick Waldron](https://github.com/rwaldron)
- [Rob Wormald](https://github.com/robwormald)
- [Matt Podwysocki](https://github.com/mattpodwysocki)
- [Andrew Chalkers](https://github.com/chalkers)
- [Pete Hodgson](https://github.com/moredip)