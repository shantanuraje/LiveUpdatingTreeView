let mongoose = require('mongoose');
let factorySchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 1,
        unique: true,
        required: [true, 'Factory Name is required'],
        validate: {
            validator: function (value) {
                if (value == "" || value.match(/[^a-zA-Z0-9 ]/)) {
                    return false;
                } else {
                    return true;
                }
            },
            message: '{VALUE} is not a valid Factory Name'
        }
    },
    numOfChildren: {
        type: Number,
        min: 1,
        max: 15,
        required: [true, 'Number of Children is required'],
        validate: {
            validator: function (value) {
                if (typeof parseInt(value) != 'number' || value < 1 || value > 15 || isNaN(parseInt(value))) {
                    return false;
                } else {
                    return true;
                }
            },
            message: '{VALUE} is not a valid value for Number of Children'
        }
    },
    lowerBound: {
        type: Number,
        required: [true, 'Lower Bound is required'],
        validate: [
            {
                validator: function (value) {
                    if (typeof parseFloat(value) === 'number' && value !== undefined && !isNaN(parseFloat(value)) && isFinite(parseFloat(value))) {
                        return true;
                    } else {
                        return false;
                    }
                },
                message: '{VALUE} is not a valid Lower Bound'
            },
            {
                validator: function (value) {
                    return this.upperBound > value
                },
                message: 'Lower bound is greater than or equal to Upper bound'

            }
        ]
    },
    upperBound: {
        type: Number,
        required: [true, 'Upper Bound is required'],
        validate: [
            {
                validator: function (value) {
                    if (typeof parseFloat(value) === 'number' && value !== undefined && !isNaN(parseFloat(value)) && isFinite(parseFloat(value))) {
                        return true;
                    } else {
                        return false;
                    }
                },
                message: '{VALUE} is not a valid Upper Bound'
            },
            {
                validator: function (value) {
                    return this.lowerBound < value
                },
                message: 'Lower bound is greater than or equal to Upper bound'

            }
        ]
    },
    children: {
        type: [Number],
        required: [true, 'Children are required']
    }
})
module.exports = mongoose.model('Factory', factorySchema);
