// Asa Marjew Tech 6

// Loading the things we need
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config()
const port = 3000


// connection with Mongodb
const MongoClient = require('mongodb').MongoClient;
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@datingapp2021.pdjok.mongodb.net/DatingApp2021?retryWrites=true&w=majority`;

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Connected to MongoDB!");
    db.close();
  });




// set the view engine to ejs
app.set("view engine", "ejs");

// public folder location
app.use(express.static("public"));

// define routes
app.get("/index", pageRegistration);
app.get("/about", pageAbout);
app.get("/results", pageResults);
app.get("*", error);

// Registration page render
function pageRegistration(req, res) {
    res.render('pages/index', {
        matches: matches
    });
}

// About page render
function pageAbout(req, res) {
    res.render('pages/about');
}

// Results page render
function pageResults(req, res) {
    res.render('pages/results');
}




app.use(bodyParser.urlencoded({extended: true}));

app.post('/index', function(req, res) {
    var item = {
        fullName: req.body.fullName,

    }
    console.log(req.body);
    matches.push(req.body);
    console.log(matches);

    Data.push({
        fullName: req.body.fullName
    })

    res.render('pages/profileview');
});


var matches = [
    { fullName: "Rosa Matisse", accountName: "Moby Dick", password: "Moby-dick-is-cool", birthdate: "24/02/1995", gender: "female", 
    placeResidence: "Amsterdam", knowledge: "Amature", about: "I like colorfull art", location: "Noord-Holland", 
    category: "Art", goal: "Knowledge"},
];



// error page
function error(req, res) {
    res.status(404).render("404");
  };

// port of server
app.listen(port, () => {
    console.log('Server running on http://localhost:3000')
})