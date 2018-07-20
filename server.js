// var express = require('express');
// var app = express();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
var http = require("http");
var express = require("express");
var socketIO = require("socket.io");

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var port = process.env.PORT || 3000;

var mongoose = require('mongoose');
var Factory = require('./app/models/factory.js');

mongoose.connect('mongodb://127.0.0.1:27017/test');
let db = mongoose.connection;


app.use(express.static(__dirname + '/public'));

//Whenever someone connects this gets executed
io.on('connection', function (socket) {
    console.log('A user connected');
    
    Factory.find({}, function (err, docs) {
        console.log("initialization");
        io.sockets.emit("initialization", docs)
    })
    
    socket.on("add:factory", function (factory) {
        console.log("add:factory");
        
        let factoryInstance = new Factory(factory);
        io.sockets.emit("send:factory", factoryInstance)
        // socket.broadcast.emit("send:factory", factoryInstance)
        factoryInstance.save(function (err) {
            if (err) return handleError(err);
            // saved!
        });
    });

    socket.on("delete:factory", function (data) {
        console.log("delete:factory");
        
        io.sockets.emit("remove:factory", data.index);
        // socket.broadcast.emit("remove:factory", data.index)
        Factory.findByIdAndRemove(data.factory._id, function (err) {
            if (err) return handleError(err);
        })
    })
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
});

server.listen(port, function () {
    console.log('listening on *:${port}');
});


const handleError = function(err) {
    console.error(err);
    // handle your error
};