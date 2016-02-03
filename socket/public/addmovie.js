window.onload = function() {
 
    var messages = [];
    var socket = io.connect('http://192.168.1.13:5000');
 
 	if(data.message!='Normal'){
 		var dataToEmit = {genre:data.genre, message:data.message , user: data.user};
 		socket.emit('movieadded', {data:dataToEmit})
 	}
}