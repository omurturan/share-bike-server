var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DropOffSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the name of the drop-off zone'
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    coordinates: {
        type: [{latitude: Number, longitude: Number}],
        validate: [coordinatesArrayLimit, "{PATH} should have more than 3 points"]
    }
});

function coordinatesArrayLimit(val) {
    return val.length > 2;
}

module.exports = mongoose.model('DropOff', DropOffSchema);