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
    res.render('pages/index');
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

    var item = 
        { fullName: req.body.fullName, accountName: req.body.accountName, password: req.body.password, birthdate: req.body.birthdate, gender: req.body.gender, 
        placeResidence: req.body.placeResidence, knowledge: req.body.knowledge, about: req.body.about, location: req.body.location, 
        category: req.body.category, goal: req.body.goal};
    
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var database = db.db("DatingApp2021");
            database.collection("users").insertOne(item, function(err, res) {
              if (err) throw err;
              console.log("1 document inserted");
            //   res.status(200).json("Mongo succes")
              db.close();
            });
          });

    res.render('pages/profileview');
});

// res.status(200).json("kjbhkjhkj");
// {res.status(400).json("stop");

// error page
function error(req, res) {
    res.status(404).render("404");
  };

// port of server
app.listen(port, () => {
    console.log('Server running on http://localhost:3000')
})