var bodyParser = require('body-parser');
var multer = require('multer');
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();

var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/upbeat';
mongoose.connect(connectionString);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
app.use(session({ secret: 'secret string' }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());// do not ask everytime for user credentials, check in session for username and password

//  Set the environment variables we need.
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ip);


/**********DB data and functions START**********/
var TrackSchema = new mongoose.Schema({
    name: String,
    addedOn: { type: Date, default: Date.now }
}, { collection: "track" });

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,    
    tracks: [TrackSchema]
}, { collection: "user" });

var UserModel = mongoose.model("User", UserSchema);

var user1 = new UserModel({
    username: "admin", password: "admin", firstName: "admin", lastName: "admin", tracks: []
})/*;
var user2 = new UserModel({
    firstName: "Benni", lastName: "Banasia", stocks: [
            { name: "MSFT", boughtOn: "Mar 10 2014" },
            { name: "GS", boughtOn: "Mar 10 2014" },
            { name: "FB", boughtOn: "Mar 10 2014" }
    ]
});*/

user1.save();

//Find all users
app.get("/api/user", function (req, res) {
    UserModel.find(function (err, data) {
        res.json(data);
    });
});

//Delete one user
app.delete("/api/user/:id", function (req, res) {
    UserModel.findById(req.params.id, function (err, doc) {
        doc.remove();
        UserModel.find(function (err, data) {
            res.json(data);
        });
    });
});

//Adds one user
app.post("/api/user", function (req, res) {
    var user0 = new UserModel(req.body);
    user0.save(function (err, doc) {
        UserModel.find(function (err, data) {
            res.json(data);
        });
    });
});

//Update a user record
app.put("/api/user/:id", function (req, res) {
    UserModel.update({ _id: req.params.id }, { $set: req.body }, function (err, doc) {
        UserModel.find(function (err, data) {
            res.json(data);
        });
    });
});

//Find by Id
app.get("/api/user/:id", function (req, res) {
    UserModel.findById(req.params.id, function (err, doc) {
        res.json(doc);
    });
});

//Find tracks for a user
app.get("/api/user/:id/tracks", function (req, res) {
    UserModel.findById(req.params.id, function (err, doc) {
        res.json(doc.tracks);
    });
});
/**********DB data and functions END**********/


/*****************Passport related functions****************************/
passport.use(new LocalStrategy(
    function (username, password, done) {
        UserModel.findOne({ username: username, password: password }, function (err, user) {
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        });

    }));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.post("/api/login", passport.authenticate('local'),
    function (req, res) { // once user is authenticated by passport it puts the user object in req 
        var user = req.user;
        res.json(user);
    });

app.post("/api/logout", function (req, res) {
    req.logout();
    res.send(200);
});

app.get("/api/loggedin", function (req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
});
