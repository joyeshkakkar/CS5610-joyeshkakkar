var bodyParser = require('body-parser');
var multer = require('multer');
var express = require('express');
var mongoose = require('mongoose');

var app = express();

var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/cs5610';
mongoose.connect(connectionString);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

/**********Node JS Experiments data and functions START**********/
var users = [
    {
        firstName: "Armin", lastName: "Van Buuren", stocks: [
            { name: "AAPL" }, { name: "AMZN" }, { name: "FB" }
        ]
    },
    {
        firstName: "Benni", lastName: "Banasia", stocks: []
    },
    {
        firstName: "Carl", lastName: "Cox", stocks: [
            { name: "GOOG" }, { name: "GS" }, { name: "MSFT" }
        ]
    },
    {
        firstName: "David", lastName: "Guetta", stocks: [
            { name: "ORCL" }, { name: "GOOG" }, { name: "GS" }
        ]
    },
    {
        firstName: "Eric", lastName: "Prydz", stocks: [
        { name: "AAPL" }, { name: "ORCL" }, { name: "FB" }
        ]
    },
    {
        firstName: "Frank", lastName: "Zhu", stocks: [
            { name: "FB" }, { name: "GOOG" }, { name: "ORCL" }
        ]
    },
    {
        firstName: "Gareth", lastName: "Emery", stocks: [
            { name: "ORCL" }, { name: "FB" }, { name: "AMZN" }
        ]
    }
];

app.get("/api/user", function (req, res) {
    res.json(users);
});

app.get("/api/user/:index", function (req, res) {
    var idx = req.params.index;
    res.json(users[idx]);
});

app.delete("/api/user/:id", function (req, res) {
    var idx = req.params.id;
    users.splice(idx, 1);
    res.json(users);
});

app.post("/api/user", function (req, res) {
    users.push(req.body);
    res.json(users);
});

app.put("/api/user/:id", function (req, res) {
    users[req.params.id] = req.body;
    res.json(users);
});

app.get("/api/user/:index/stock", function (req, res) {
    var idx = req.params.index;
    res.json(users[idx].stocks);
});
/**********Node JS Experiments data and functions END**********/

/**********Mongo DB Experiments data and functions START**********/
var StockScehema = new mongoose.Schema({
    name: String,
    boughtOn: { type: Date, default: Date.now }
}, { collection: "stock" });

var UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    stocks: [StockScehema]
}, { collection: "user" });

var UserModel = mongoose.model("User", UserSchema);

var user1 = new UserModel({
    firstName: "Armin", lastName: "Van Buuren", stocks: [
        {name: "AAPL", boughtOn:"Mar 10 2014"},
        {name: "AMZN", boughtOn:"Mar 10 2014"},
        {name: "FB", boughtOn:"Mar 10 2014"}
    ]
});
var user2 = new UserModel({
    firstName: "Benni", lastName: "Banasia", stocks: [
            { name: "MSFT", boughtOn: "Mar 10 2014" },
            { name: "GS", boughtOn: "Mar 10 2014" },
            { name: "FB", boughtOn: "Mar 10 2014" }
    ]
});
var user3 = new UserModel({ firstName: "Carl", lastName: "Cox", stocks: [
        {name: "GOOG", boughtOn:"Mar 10 2014"},
        {name: "GS", boughtOn:"Mar 10 2014"},
        {name: "MSFT", boughtOn:"Mar 10 2014"}
    ] 
});
var user4 = new UserModel({ firstName: "David", lastName: "Guetta", stocks: [
        {name: "ORCL", boughtOn:"Mar 10 2014"},
        {name: "GOOG", boughtOn:"Mar 10 2014"},
        {name: "GS", boughtOn:"Mar 10 2014"}
    ] 
});
var user5 = new UserModel({ firstName: "Eric", lastName: "Prydz", stocks: [
        {name: "AAPL", boughtOn:"Mar 10 2014"},
        {name: "ORCL", boughtOn:"Mar 10 2014"},
        {name: "FB", boughtOn:"Mar 10 2014"}
    ] 
});
var user6 = new UserModel({ firstName: "Frank", lastName: "Zhu", stocks: [
        {name: "FB", boughtOn:"Mar 10 2014"},
        {name: "GOOG", boughtOn:"Mar 10 2014"},
        {name: "ORCL", boughtOn:"Mar 10 2014"}
    ] 
});
var user7 = new UserModel({ firstName: "Gareth", lastName: "Emery", stocks: [
        {name: "ORCL", boughtOn:"Mar 10 2014"},
        {name: "FB", boughtOn:"Mar 10 2014"},
        {name: "AMZN", boughtOn:"Mar 10 2014"}
    ] 
});

user1.save();
user2.save();
user3.save();
user4.save();
user5.save();
user6.save();
user7.save();

//Find all users
app.get("/api/userMD", function (req, res) {
    UserModel.find(function (err, data) {
        res.json(data);
    });
});

//Delete one user
app.delete("/api/userMD/:id", function (req, res) {
    UserModel.findById(req.params.id, function (err, doc) {
        doc.remove();
        UserModel.find(function (err, data) {
            res.json(data);
        });
    });
});

//Adds one user
app.post("/api/userMD", function (req, res) {
    var user0 = new UserModel(req.body);
    user0.save(function (err, doc) {
        UserModel.find(function (err, data) {
            res.json(data);
        });
    });
});

//Update a user record
app.put("/api/userMD/:id", function (req, res) {
    UserModel.update({ _id: req.params.id }, { $set: req.body }, function (err, doc) {
        UserModel.find(function (err, data) {
            res.json(data);
        });
    });
});

//Find by Id
app.get("/api/userMD/:id", function (req, res) {
    UserModel.findById(req.params.id, function (err, doc) {
        res.json(doc);
    });
});

//Find stocks for a user
app.get("/api/userMD/:id/stock", function (req, res) {
    UserModel.findById(req.params.id, function (err, doc) {
        res.json(doc.stocks);        
    });
});
/**********Mongo DB Experiments data and functions END**********/


//  Set the environment variables we need.
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ip);