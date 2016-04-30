var socket = io.connect('http://localhost:8080', {reconnect: true});

const recordObservation = Marbelous.createMarbleDisplay(document.getElementById('marbles-container'));

function visualize(name,observable) {
  observable.subscribe( e => recordObservation(name,e) );
}

let source$ = Rx.Observable.fromEvent(socket, 'photoData').distinctUntilChanged();

visualize('Photosensor Data', source$);

let mins = source$
  .scan(Math.min)
  .distinctUntilChanged();

let maxes = source$
  .scan(Math.max)
  .distinctUntilChanged();

visualize('Minimum Reading', mins);
visualize('Maximum Reading', maxes);

let source2$ = Rx.Observable.fromEvent(socket, 'photoData2').distinctUntilChanged();
visualize('Photosensor 2 Data', source2$);