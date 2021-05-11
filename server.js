// Asa Marjew

// Loading the things we need
const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.use(express.static('static'))

// set the view engine to ejs
app.set('view engine', 'ejs');


// index page 
app.get('/', function(req, res) {
    var matches = [
        { fullName: 'Rosa Matisse', accountName: "Moby Dick", password: "Mody-dick-is-cool", birthdate: "24/02/1995", gender: "female", 
        placeResidence: "Amsterdam", knowledge: "Amature", about: "I like colorfull art", location: "Noord-Holland", 
        category: "Art", goal: "Knowledge"},
        { fullName: 'Luuk Dali', accountName: "Moby Dick", password: "Mody-dick-is-cool", birthdate: "24/02/1995", gender: "female", 
        placeResidence: "Amsterdam", knowledge: "Amature", about: "I like colorfull art", location: "Noord-Holland", 
        category: "Art", goal: "Knowledge"},
        { fullName: 'Chris Darwin', accountName: "Moby Dick", password: "Mody-dick-is-cool", birthdate: "24/02/1995", gender: "female", 
        placeResidence: "Amsterdam", knowledge: "Amature", about: "I like colorfull art", location: "Noord-Holland", 
        category: "Art", goal: "Knowledge"}
    ];
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

app.get('/', function (req, res) {
    throw new Error('404 Not Found') // Express will catch this on its own.
  })

app.listen(port, () => {
    console.log('Server running on http://localhost:3000')
})