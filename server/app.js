var express = require('express');
var http = require('http');
var app = express();

app.get('/', function (req, res) {
   res.end('hello from /')
});

app.post('/drop-off', function (req, res) {
   res.end();
});

app.put('/drop-off/:id', function (req, res) {
    res.end();
});

app.delete('drop-off/:id', function (req, res) {
    res.end();
});

app.get('/drop-off', function (req, res) {
    res.end();
});

app.post('/end-reservation', function () {
    res.end();
});


http.createServer(app).listen(8081, function () {
   console.log('be app started at 8081')
});
