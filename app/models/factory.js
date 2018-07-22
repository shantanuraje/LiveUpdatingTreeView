let mongoose = require('mongoose');

module.exports = mongoose.model('Factory', {
    name: {
        type: String,
        required: true,
        minlength: 1
    },
    numOfChildren: {
        type: Number,
        min: 1,
        max: 15,
        required: true
    },
    lowerBound: {
        type: Number,
        required: true
    },
    upperBound: {
        type: Number,
        required: true
    },
    children: {
        type: Array,
        required: true
    }
});
