var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var port = 5000;

app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

var routes = require('./routes/users');
app.use('/', routes);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('index');
});
app.get("/test", function(req, res){
    res.send("It works!");
});


// var userCount = 0;

// io.on('connection', function (socket) {
//   console.log('sdasd');
//   userCount++;
//   io.sockets.emit('userCount', { userCount: userCount });
//   socket.on('disconnect', function() {
//     userCount--;
//     io.sockets.emit('userCount', { userCount: userCount });
//   });
// });

// var io = require('socket.io').listen(app.listen(app.get('port')));
// server.listen(3700);
// var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});

console.log("Listening on port " + port);
server.listen(5000);