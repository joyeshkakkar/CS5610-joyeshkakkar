var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World');
})

app.get('/bye', function (req, res) {
    res.send('Good Bye');
})

app.listen(3000);