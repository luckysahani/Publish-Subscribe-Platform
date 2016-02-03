window.onload = function() {
 
    var messages = [];
    var socket = io.connect('http://localhost:5000');
 
    socket.on('movieadded', function (data) {
        console.log(data);
    });
 
}