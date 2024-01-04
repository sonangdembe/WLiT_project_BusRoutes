var express = require('express');
var router = express.Router();
var Stop = require('../models/busRoute')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/stops', async function(req, res, next){
  var stops = await Stop.find()
  res.render('db',{title: "Bus stops", stops})
});


// router.get('/login', async function(req, res, next){
//   var login = await Login.find()
//   res.render('login',{title: "Log In", login})
// });

module.exports = router;
