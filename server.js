//load environment config file
let config = require('./config/config.js');
//check if production (AWS) or development (0.0.0.0) environment
let environment = process.env.NODE_ENV || 'development';

//log environment parameters
console.log("Environment: ", environment);
console.log("Environment Config: ", config[environment]);

//get required modules for http and socket server creation 
let http = require("http");
let express = require("express");
let socketIO = require("socket.io");//using Socket.io library
let app = express();
let server = http.createServer(app); //setup http express server to server index.html
let io = socketIO(server); //setup socket server for real-time bidirectional communication

// require mongoose to connect to and work on MongoDB database
let mongoose = require('mongoose');
let Factory = require('./app/models/factory.js'); // import Factory Model

// setup connection with MongoDB according to environment
mongoose.connect(config[environment].db);
let db = mongoose.connection;

//expressjs serves static files stored in /public directory
app.use(express.static(__dirname + '/public'));

//start the server on specified ip and port number (according to config)
server.listen(config[environment].port, config[environment].host, function () {
    console.log(`Listening on ${config[environment].host}: ${config[environment].port}`);
});


//setup listeners for out socket.io server
io.on('connection', function (socket) {
    console.log('A user connected');

    //INITIALIZATION: get all documents in database, emit all documents to client for initialization
    Factory.find({}, function (err, docs) {
        console.log("Retrieving all documents");
        io.sockets.emit("initialization", docs)
    })

    //ADD FACTORY: listener event to handle when a new factory is added from the client
    socket.on("add:factory", function (factory) {
        let factoryInstance = new Factory(factory);
        console.log("add:factory", factoryInstance);

        //save this new factory to database. Factory is automatically validated by validator functions in FactorySchema (./app/models/factory.js)
        factoryInstance.save(function (err) {
            if (err) {
                //if error is encounterd, emit error message back to client
                io.sockets.emit("error:validation", err);
                console.error(err);
            } else {
                //if no error, check if new factory name already exists in database
                console.log("Factory validation successful");
                Factory.findOne({name: factoryInstance.name}, function (err, factory) {
                    if (err) {
                        //if name already exists, emit error message back to client
                        console.log(err);
                        io.sockets.emit("error:duplicate name", err);
                    }else{
                        //if no error, emit new factory back to client
                        io.sockets.emit("send:factory", factory);
                    }
                })
            }
        });
    });

    //DELETE FACTORY: listener event to handle when a factory is deleted from the client
    socket.on("delete:factory", function (data) {
        console.log("delete:factory");
        //find this factory by querying the database
        Factory.findByIdAndRemove(data.factory._id, function (err) {
            if (err) {
                //if not found, emit error message back to client
                io.sockets.emit("error:not found", err);
                console.error(err);
            } else {
                //if found, emit id of factory to be removed back to client
                io.sockets.emit("remove:factory", data.index);
            }
        });
    });

    //UPDATE FACTORY: listener event to handle when a factory is updated from the client
    socket.on("update:factory", function (data) {
        console.log("update:factory", data);
        console.log("Factory validation successful");

        //save this updated factory to database. Factory is automatically validated by validator functions in FactorySchema
        Factory.findByIdAndUpdate(data._id, data, function (err) {
            if (err) {
                //if error is encounterd, emit error message back to client
                io.sockets.emit("error:validation", err);
                console.error(err);
            } else {
                //if no error, emit updated factory back to client
                io.sockets.emit("send:updated factory", data);
            }
        });
    });

    //DISCONNECTION: Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
});
