var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FactorySchema = new Schema({
    name: String,
    numOfChildren: Number,
    lowerBound: Number,
    upperBound: Number,
    children: Array
});

var Factory = mongoose.model('Factory', FactorySchema);

mongoose.connect('mongodb://127.0.0.1:27017/test');
let db = mongoose.connection;


app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('new factory', function (factory) {
        console.log('new factory', factory);
        let factoryInstance = new Factory(factory);
        factoryInstance.save(function (err) {
            if (err) return handleError(err);
            // saved!
          });
    });
});


http.listen(3000, function () {
    console.log('listening on *:3000');
});