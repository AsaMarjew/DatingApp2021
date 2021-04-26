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
        { name: 'Christof & Sammy', breed: "Pug", age: 35},
        { name: 'Evan & Tux', breed: "Golden retriever", age: 14},
        { name: 'Rosa & Moby Dock', breed: "Berner sennen", age: 25}
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