let express = require('express');
let router = express.Router();
let indexController = require('../controller/index.js');

router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Home'
  });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', {
    title: "Home"
  });
});



module.exports = router;
