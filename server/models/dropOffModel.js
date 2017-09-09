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
    coordinates: [
        { langitude: Number, longitude: Number }]
});

module.exports = mongoose.model('DropOff', DropOffSchema);