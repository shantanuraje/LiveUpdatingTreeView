var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var Factory = require('./app/models/factory.js');

mongoose.connect('mongodb://127.0.0.1:27017/test');
let db = mongoose.connection;


app.use(express.static(__dirname + '/public'));

//Whenever someone connects this gets executed
io.on('connection', function (socket) {
    console.log('A user connected');
    
    Factory.find({}, function (err, docs) {
        console.log(docs);
        socket.emit("initialization", docs)
    })
    
    socket.on("add:factory", function (factory) {
        console.log(factory);
        
        let factoryInstance = new Factory(factory);
        socket.emit("send:factory", factoryInstance)
        socket.broadcast.emit("send:factory", factoryInstance)
        factoryInstance.save(function (err) {
            if (err) return handleError(err);
            // saved!
        });
    });

    socket.on("delete:factory", function (data) {
        console.log(data);
        
        socket.emit("remove:factory", data.index)
        socket.broadcast.emit("remove:factory", data.index)
        Factory.remove(data.factory, function (err) {
            if (err) return handleError(err);
        })
    })
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
});

// io.on('connection', function (socket) {
//     console.log('a user connected');

//     socket.on("init", function () {

//     })

//     socket.on('add:factory', function (factory) {
//         console.log('add:factory', factory);
//         let factoryInstance = new Factory(factory);
//         factoryInstance.save(function (err) {
//             if (err) return handleError(err);
//             // saved!
//         });


//     });

//     Factory.find({}, function (err, docs) {
//         io.emit('all factories', docs)

//     })
// });



http.listen(3000, function () {
    console.log('listening on *:3000');
});


const handleError = function() {
    console.error(err);
    // handle your error
};