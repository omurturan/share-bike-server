var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DropOffSchema = new Schema({
    name: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        enum: ['Point',
               'MultiPoint',
               'LineString',
               'MultiLineString',
               'Polygon',
               'MultiPolygon'
        ],
        default: 'Point'
    },
    coordinates: {
        // Array of {lat,lng} objects
        type: [{lat:{type:Number,max:90.0,min:-90.0},
            lng:{type:Number,max:180.0,min:-180.0},
            _id:false
        }],
        default: [{lat:0,lng:0}] // Lat Lon
    }
});

function coordinatesArrayLimit(val) {
    return val.length > 3;
}

module.exports = mongoose.model('DropOff', DropOffSchema);
