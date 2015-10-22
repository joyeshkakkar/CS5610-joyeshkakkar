var bodyParser = require('body-parser');
var multer = require('multer');
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

var alice = { username: "alice", password: "wonderland" };

var developers = [
    {
        firstName: "Alice", lastName: "Wonderland", application: [
            { name: "Word" }, { name: "Excel" }, { name: "PowerPoint" }
        ]
    },
    { firstName: "Bob", lastName: "Marley", application: [] },
    { firstName: "Charlie", lastName: "Garcia", application: [] },
    { firstName: "David", lastName: "Guetta", application: [] },
    { firstName: "Ed", lastName: "Norton", application: [] },
    { firstName: "Frank", lastName: "Zhu", application: [] }
];

app.delete("/developer/:id", function (req, res) {
    var idx = req.params.id;
    developers.splice(idx, 1);
    res.json(developers);
});

app.get("/alice", function (req, res) {
    res.json(alice);
});

app.put("/developer/:id", function (req, res) {
    developers[req.params.id] = req.body;
    res.json(developers);
});

app.post("/developer", function (req, res) {
    var obj = req.body;
    developers.push(obj);
    res.json(developers);
});

app.get("/developer", function (req, res) {
    res.json(developers);
});

app.get("/developer/:index", function (req, res) {
    var idx = req.params.index;
    res.json(developers[idx]);
});

app.get("/developer/:index/application", function (req, res) {
    var idx = req.params.index;
    res.json(developers[idx].application);
});

app.get("/developer/:index/application/:appIndex", function (req, res) {
    var idx = req.params.index;
    var appIdx = req.params.appIndex;
    res.json(developers[idx].application[appIdx]);
});

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.get('/bye', function (req, res) {
    res.send('Good Bye');
});

app.listen(3000);