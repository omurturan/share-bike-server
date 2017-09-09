var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DropOffSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the name of the drop-off zone'
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    coordinates: {
        type: [{lat: Number, lng: Number}],
        validate: [coordinatesArrayLimit, "{PATH} should have more than 3 points"]
    }
});

function coordinatesArrayLimit(val) {
    return val.length > 3;
}

module.exports = mongoose.model('DropOff', DropOffSchema);
