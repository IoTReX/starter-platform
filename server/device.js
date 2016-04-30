var five = require ('johnny-five'),
    board = new five.Board(),
    photoresistor,
    photoresistor2;

function getDecorateIO() {
  function decorateIO(io) {
  	board.on('ready', function() {

      photoresistor = new five.Sensor({
        pin: "A0",
        freq: 250
      });

      photoresistor2 = new five.Sensor({
        pin: "A1",
        freq: 250
      });

      io.on('connection', function (socket) {
        console.log('sockets on connection');

        photoresistor.on('data', function(){
          var data = this.value;
          socket.emit('photoData', data);
        });

        photoresistor2.on('data', function(){
          var data = this.value;
          socket.emit('photoData2', data);
        });

        

      });
    });
  };

  return decorateIO;
};

module.exports = getDecorateIO;