let mongoose = require('mongoose');

module.exports = mongoose.model('Factory', {
    name : String,
    numOfChildren : Number,
    lowerBound : Number,
    upperBound : Number,
    children : Array
});
