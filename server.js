var config = require('./config/config.js')
var environment = process.env.NODE_ENV || 'development';
console.log(config[environment]);


var http = require("http");
var express = require("express");
var socketIO = require("socket.io");

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


var mongoose = require('mongoose');
var Factory = require('./app/models/factory.js');

mongoose.connect(config[environment].db);
let db = mongoose.connection;


app.use(express.static(__dirname + '/public'));

server.listen(config[environment].port, config[environment].host, function () {
    console.log(`listening on ${config[environment].host}: ${config[environment].port}`);
});


const handleError = function(err) {
    console.error(err);
    // handle your error
};


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
        // socket.broadcast.emit("send:factory", factoryInstance)
        factoryInstance.save(function (err) {
            if (err){
                io.sockets.emit("error:validation", err);
                return handleError(err);  
            }else{
                io.sockets.emit("send:factory", factoryInstance)

            }
            // saved!
        });
    });

    socket.on("delete:factory", function (data) {
        console.log("delete:factory");
        
        // socket.broadcast.emit("remove:factory", data.index)
        Factory.findByIdAndRemove(data.factory._id, function (err) {
            if (err) {
                io.sockets.emit("error:validation", err);
                return handleError(err)
            }else{
                io.sockets.emit("remove:factory", data.index);

            }
        })
    })

    socket.on("update:factory", function (data) {
        console.log("update:factory", data);
        let error = Factory.validateSync(data.factory);
        console.log(error);
        
        Factory.findOneAndUpdate(data.id,data.factory, function (err) {
            if (err){
                io.sockets.emit("error:validation", err);
                return handleError(err);  
            }else{

                io.sockets.emit("send:updated factory", {'index':data.index, 'factory': data.factory});

            }

        })
        
    })
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
});
