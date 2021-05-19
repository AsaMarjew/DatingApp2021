// Asa Marjew

// Loading the things we need
const express = require('express')
const path = require('path')
const app = express()
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
const port = 3000

// public folder location
app.use(express.static("public"));

// set the view engine to ejs
app.set('view engine', 'ejs');

var matches = [
    { fullName: "Rosa Matisse", accountName: "Moby Dick", password: "Moby-dick-is-cool", birthdate: "24/02/1995", gender: "female", 
    placeResidence: "Amsterdam", knowledge: "Amature", about: "I like colorfull art", location: "Noord-Holland", 
    category: "Art", goal: "Knowledge"},
    { fullName: 'Luuk Dali', accountName: "Moby Dick", password: "Moby-dick-is-cool", birthdate: "24/02/1995", gender: "female", 
    placeResidence: "Amsterdam", knowledge: "Amature", about: "I like colorfull art", location: "Noord-Holland", 
    category: "Art", goal: "Knowledge"},
    { fullName: 'Chris Darwin', accountName: "Moby Dick", password: "Moy-dick-is-cool", birthdate: "24/02/1995", gender: "female", 
    placeResidence: "Amsterdam", knowledge: "Amature", about: "I like colorfull art", location: "Noord-Holland", 
    category: "Art", goal: "Knowledge"}
];

app.post('/index', function(req, res) {
    console.log(req.body);
    matches.push(req.body);
    console.log(matches);
    res.render('pages/results');
});

// index page with data
app.get('/index', function(req, res) {

    var tagline = "No match is complete without your bestfriend at your side.";

    res.render('pages/index', {
        matches: matches,
        tagline: tagline
    });
});

// about page
app.get('/about', function(req, res) {
    res.render('pages/about');
});

// results page
app.get('/results', function(req, res) {
    res.render('pages/results');
});

/*// index page
app.get('/', function(req, res) {
    res.render('pages/index');
});

// about page
app.get('/about', function(req, res) {
    res.render('pages/about');
});
*/

/*// Send file to server

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/login.html'));
})

*/


// error
app.use(function(req, res, next){
    res.status(404);
  // default to plain-text. send()
    res.type('txt').send('404 NOT FOUND...');
  });

// port of server
app.listen(port, () => {
    console.log('Server running on http://localhost:3000')
})