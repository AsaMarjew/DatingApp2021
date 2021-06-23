// Asa Marjew Tech 6

/*---------------------------
    Loading in the things we need
---------------------------*/

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000;
let user;

// Connection with Mongodb
const MongoClient = require('mongodb').MongoClient;
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@datingapp2021.pdjok.mongodb.net/DatingApp2021?retryWrites=true&w=majority`;

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  console.log('Connected to MongoDB!');
  db.close();
});

// Makes is possible to get form information from another body
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Public folder location
app.use(express.static('public'));

/*---------------------------
        Render routes
---------------------------*/

// Render Index page in home route
app.get('/', (req, res) => {
  res.render('pages/index');
});

// Render Registration page in registerpage route
app.get('/registerpage', (req, res) => {
  res.render('pages/registerpage');
});

// Render Registration alert page in alertRegister route
app.get('/alertRegister', (req, res) => {
  res.render('pages/alertRegister');
});

// Render Dashboard page in dashboard route
app.get('/dashboard', renderDashboard);

// Render Results page in results route
app.get('/results', (req, res) => {
  res.render('pages/results');
});

// Render Update page in update route
app.get('/update', (req, res) => {
  res.render('pages/update');
});

// Render Delete page in delete route
app.get('/delete', (req, res) => {
  res.render('pages/delete');
});

// Render Update alert page in alertUpdate route
app.get('/alertUpdate', (req, res) => {
  res.render('pages/alertUpdate');
});

// Render Delete alert page in alertDelete route
app.get('/alertDelete', (req, res) => {
  res.render('pages/alertDelete');
});

/*---------------------------
        Handle route
---------------------------*/

// Handle register with handleRegister function
app.post('/register', handleRegister);

// Handle update with handleUpdate function
app.post('/update', handleUpdate);

// Handle delete with handleDelete function
app.post('/delete', handleDelete);

/*---------------------------
    GET render functions
---------------------------*/

// Sending the user name to the dashbboard page
// using bodyparser
function renderDashboard(req, res) {
  res.render('pages/dashboard', {
    user: user,
  });
  res.render('pages/dashboard');
}

/*---------------------------
    POST handle functions
---------------------------*/

// Getting the form data with bodyparser and write the data in
// a document in the mongodb database
function handleRegister(req, res) {
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

  user = req.body.accountName;

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    const database = db.db('DatingApp2021');
    database.collection('user').insertOne(item, function (err, res) {
      db.close();
    });
  });
  res.render('pages/alertRegister');
}

// Getting the form data from Update form with bodyparser and
// update an excisting document with findOneAndUpdate
function handleUpdate(req, res) {
  const item = {
    fullName: req.body.updateFullName,
    accountName: req.body.updateAccountName,
    email: req.body.updateEmail,
    password: req.body.updatePassword,
    birthdate: req.body.updateBirthdate,
    gender: req.body.updateGender,
    placeResidence: req.body.updatePlaceResidence,
    knowledge: req.body.updateKnowledge,
    about: req.body.updateAbout,
    location: req.body.updateLocation,
    category: req.body.updateCategory,
    goal: req.body.updateGoal,
  };

  user = req.body.updateAccountName;

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;

    const collection = db.db('DatingApp2021').collection('user');
    collection.findOneAndUpdate(
      { email: item.email },
      {
        $set: {
          fullName: item.fullName,
          accountName: item.accountName,
          email: item.email,
          password: item.password,
          birthdate: item.birthdate,
          gender: item.gender,
          placeResidence: item.placeResidence,
          knowledge: item.knowledge,
          about: item.about,
          location: item.location,
          category: item.category,
          goal: item.goal,
        },
      }
    );
    db.close();
    res.render('pages/alertUpdate');
  });
}

// Getting deleteEmail with bodyparser and delete this
// excisting document from the database
function handleDelete(req, res) {
  const item = { email: req.body.deleteEmail };
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    const database = db.db('DatingApp2021');
    //Find the first document  in the users collection:
    database
      .collection('user')
      .deleteOne({ email: item.email }, function (err, result) {
        if (err) throw err;
        console.log(err);
        db.close();
        res.render('pages/alertDelete');
      });
  });
}

/*---------------------------
        Server port
---------------------------*/

app.listen(port, () => {
  console.log('Server running on http://localhost:3000');
});
