var bodyParser = require('body-parser');
var multer = require('multer');
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

var websites = [
    {
        name: "Site 1", pages: [
            { name: "Page 1, 1", widgets:
            [
                { name: "Widget 1,1,1" },
                { name: "Widget 1,1,2" },
                { name: "Widget 1,1,3" }
            ]
             },
            { name: "Page 1, 2", widgets: [] },
            { name: "Page 1, 3", widgets: [] }
        ]
    },
    {
        name: "Site 2", pages: [
          { name: "Page 2, 1", widgets: [] },
          { name: "Page 2, 2", widgets: [] },
          { name: "Page 2, 3", widgets: [] }
        ]
    },
    {
        name: "Site 3", pages: [
            { name: "Page 2, 1", widgets: [] },
            { name: "Page 2, 2", widgets: [] },
            { name: "Page 2, 3", widgets: [] }
        ]
    },
    { name: "Site 4", pages: [] }
];

app.delete("/api/website/:siteId/page/:pageId", function (req, res) {
    websites[req.params.siteId].splice(req.params.pageId, 1);
    res.json(websites);
});

app.get("/api/website", function (req, res) {
    res.json(websites);
});

app.get("/api/website/:id", function (req, res) {
    res.json(websites[req.params.id]);
});

app.delete("/api/website/:id", function (req, res) {
    websites.splice(req.params.id, 1);
    res.json(websites);
});

app.post("/api/website", function (req, res) {
    websites.push(req.body);
    res.json(websites);
});




//  Set the environment variables we need.
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ip);