var config = require('./config/config.js')
var environment = process.env.NODE_ENV || 'development';
console.log(config[environment]);

// var validateFactoryFields = require('./app/validation/validateFactory.js')
// console.log(validateFactoryFields);

var http = require("http");
var express = require("express");
var socketIO = require("socket.io");

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


var mongoose = require('mongoose');
var Factory = require('./app/models/factory.js');
var FactorySchema = Factory.schema;

// console.log(Factory);
mongoose.connect(config[environment].db);
let db = mongoose.connection;


app.use(express.static(__dirname + '/public'));

server.listen(config[environment].port, config[environment].host, function () {
    console.log(`listening on ${config[environment].host}: ${config[environment].port}`);
});


const handleError = function (err) {
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
        console.log(factoryInstance);

        factoryInstance.save(function (err) {
            if (err) {
                io.sockets.emit("error:validation", err);
                return handleError(err);
            } else {
                console.log("Factory validation successful");
                Factory.findOne({name: factoryInstance.name}, function (err, factory) {
                    if (err) {
                        console.log(err);
                        io.sockets.emit("error:not found", err)
                    }else{

                        io.sockets.emit("send:factory", factory)
                    }
                    
                })

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
            } else {
                io.sockets.emit("remove:factory", data.index);

            }
        })
    })

    socket.on("update:factory", function (data) {
        console.log("update:factory", data);
        console.log("Factory validation successful");
        Factory.findByIdAndUpdate(data.id, data.factory, function (err) {
            if (err) {
                io.sockets.emit("error:validation", err);
                return handleError(err);
            } else {

                io.sockets.emit("send:updated factory", { 'index': data.index, 'factory': data.factory });

            }

        })


    })
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
});
