var express = require('express');
var router = express.Router();
var netflixSeries = require('../controllers/series');

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

//router.get('/', netflixSeries.getSeries);
router.get('/', netflixSeries.moviesAll);
router.get('/movie', netflixSeries.getMovie);
module.exports = router;
