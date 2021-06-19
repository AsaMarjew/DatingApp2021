// Asa Marjew Tech 6

// Loading the things we need
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000;

// Connection with Mongodb
const MongoClient = require('mongodb').MongoClient;
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@datingapp2021.pdjok.mongodb.net/DatingApp2021?retryWrites=true&w=majority`;

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  console.log('Connected to MongoDB!');
  db.close();
});

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Public folder location
app.use(express.static('public'));

// Define routes
app.get('/', pageRegistration);
app.get('/about', pageAbout);
app.get('/results', pageResults);
app.get("/profileview'", pageProfileview);
//app.get("*", error);

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

// Profileview page render
function pageProfileview(req, res) {
  res.render('pages/profileview');
}

// Makes is possible to get form information from another body
app.use(bodyParser.urlencoded({ extended: true }));

// Write the form data in the mongodb database
app.post('/profileview', function (req, res) {
  const item = {
    fullName: req.body.fullName,
    accountName: req.body.accountName,
    email: req.body.email,
    password: req.body.password,
    birthdate: req.body.birthdate,
    gender: req.body.gender,
    placeResidence: req.body.placeResidence,
    knowledge: req.body.knowledge,
    about: req.body.about,
    location: req.body.location,
    category: req.body.category,
    goal: req.body.goal,
  };

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var database = db.db('DatingApp2021');
    database.collection('user').insertOne(item, function (err, res) {
      if (err) throw err;
      console.log('1 document inserted');
      db.close();
    });
  });

  res.render('pages/profileview');
});

// app.get('/test', function routeHandler(req, res) {
//     res.send('ok');
// });

app.get('/profileview', function routeHandeler(req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    const database = db.db('DatingApp2021');
    //Find the first document  in the users collection:
    database.collection('user').findOne({}, function (err, result) {
      if (err) throw err;
      res.send(result);

      //   const user = result;
      //   res.render('pages/profileview', {
      //     user: user
      //   });

      db.close();
    });
  });
});

// res.status(200).json("continue");
// res.status(400).json("stop");

// error page
// function error(req, res) {
//     res.status(404).render('pages/404');
//   };

// port of server
app.listen(port, () => {
  console.log('Server running on http://localhost:3000');
});
