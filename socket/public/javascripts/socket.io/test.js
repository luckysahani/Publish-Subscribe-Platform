var socket = io.connect();
socket.on('userCount', function (data) {
  console.log(data.userCount);
});