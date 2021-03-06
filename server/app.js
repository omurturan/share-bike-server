var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DropOff = require('./models/dropOffModel');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
// TODO Check CORS policy
app.options('*', cors());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/share-bike');

app.get('/', function (req, res) {
   res.end('hello from /')
});

app.post('/drop-off', function (req, res) {
    // TODO sanity check & try/catch probably. JSON.parse is dangerous
    var coordinates = req.body.coordinates;
    var name = req.body.name;

    DropOff.create({
        type: "Polygon",
        name: name,
        coordinates: coordinates
    }, function (err, awesome_instance) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        // saved!
        res.json(awesome_instance);
    });
});

app.put('/drop-off/:id', function (req, res) {
    // new: true => means that it will return the modified object instead of the original
    // TODO Sanity checks on req.body. Do not trust client.
    DropOff.findOneAndUpdate({
        _id: req.params.id
    }, req.body, {
        new: true
    }, function(err, dropOff) {
        if (err)
            res.send(err);
        res.json(dropOff);
    });
});

app.delete('/drop-off/:id', function (req, res) {
    // Maybe we should do a soft-delete
    DropOff.remove({
        _id: req.params.id
    }, function(err, dropOff) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        res.json({ message: 'Drop-off zone successfully deleted' });
    });
});

app.get('/drop-off', function (req, res) {
    // we return all drop-offs without any restriction
    // it is probably a good idea to sort at least.
    DropOff.find({}, function(err, dropOffs) {
        if (err) {
            res.send(err);
        }
        res.json(dropOffs);
    });
});

app.post('/end-reservation', function (req, res) {
    var lng = req.body.lng;
    var lat = req.body.lat;
    // Coordinates of Ankara for testing purposes
    lng = 39.812703;
    lat = 31.896619;
    var geojsonPoint = { type: 'Point', coordinates: [lng, lat] };
    DropOff.find({
        loc: {
            $geoIntersects: {
                $geometry: geojsonPoint
            }
        }
    }, function(err, list) {
        if(err) {
            console.log(err);
            res.send(err);
            return;
        }
        console.log(list);
        res.json(list);
    });

});


http.createServer(app).listen(8081, function () {
   console.log('server app started at 8081');
});
