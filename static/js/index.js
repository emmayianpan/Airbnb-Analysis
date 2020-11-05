var PORT = process.env.PORT || 5000;
var express = require (‘express’);
var app = express ();
var http = require (‘http’);
var server = http.server (‘app’);
app.use (express static (‘client’));
server.listen (PORT, functions ()){
    console.log (‘chat server running’);
});
var io = require (‘socket. io’)(server);
io.on (‘connection’, function (socket){
    socket.on (‘message’, function (msg){
io.emit (‘message’, msg);
});
});