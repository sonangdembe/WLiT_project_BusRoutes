// // app.js

// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// const port = 3000;

// app.use(bodyParser.urlencoded({ extended: true }));
// app.set('view engine', 'ejs');


const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.get('/locations', (req, res) => {
  res.render('locations');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
