var express = require('express');
var router = express.Router();
var netflixSeries = require('../controllers/series');
/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

router.get('/netflixseries', netflixSeries.getSeries);
module.exports = router;
