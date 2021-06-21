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

// Makes is possible to get form information from another body
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Public folder location
app.use(express.static('public'));

// Define routes
app.get('/', pageRegistration);
app.get('/dashboard', pageDashboard);
app.get('/results', pageResults);
app.get("/update'", pageUpdate);
app.get("/delete'", pageDelete);

//app.get("*", error);

// Registration page render
function pageRegistration(req, res) {
  res.render('pages/registerpage');
}

// About page render
function pageHome(req, res) {
  res.render('pages/index');
}

// Results page render
function pageResults(req, res) {
  res.render('pages/results');
}

// Update page render
function pageUpdate(req, res) {
  res.render('pages/update');
}

// Delete page render
function pageDelete(req, res) {
  res.render('pages/delete');
}

// Dashboard page render
function pageDashboard(req, res) {
  MongoClient.connect((err, db) => {
    if (err) throw err;

    db.db('DatingApp2021')
      .collection('user')
      .findOne({ fullName: fullName })
      .then(() => {
        res.render('pages/dashboard', { fullName: fullName });
        db.close();
      });
  });
}

// Request accountName
function findAccountName(req, res) {
  MongoClient.connect((err, db) => {
    if (err) throw err;

    db.db('DatingApp2021')
      .collection('user')
      .findOne({ accountName: accountName })
      .then(() => {
        res.render('pages/dashboard', { accountName: AccountName });
        db.close();
      });
  });
}

// Write the form data in the mongodb database
app.post('/dashboard', function (req, res) {
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

  res.render('pages/dashboard');
});

// app.get('/test', function routeHandler(req, res) {
//     res.send('ok');
// });

app.get('/update', function routeHandeler(req, res) {
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
    const database = db.db('DatingApp2021');
    //Find the first document  in the users collection:
    database.collection('user').updateOne(
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
      },
      function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);

        //   const user = result;
        //   res.render('pages/profileview', {
        //     user: user
        //   });

        db.close();
      }
    );
  });
});

app.post('/delete', function routeHandeler(req, res) {
  const item = { email: req.body.email };

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    const database = db.db('DatingApp2021');
    //Find the first document  in the users collection:
    database
      .collection('user')
      .deleteOne({ email: item.email }, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);

        db.close();
      });
  });
});

// port of server
app.listen(port, () => {
  console.log('Server running on http://localhost:3000');
});
