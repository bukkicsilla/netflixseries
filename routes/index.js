var express = require('express');
var router = express.Router();
var netflixSeries = require('../controllers/series');

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

//router.get('/', netflixSeries.getSeries);
router.get('/', netflixSeries.moviesAll);
//router.get('/movie', netflixSeries.getMovie);
router.get('/movie/:movieid', netflixSeries.readMovie);

router.get('/newmovie', netflixSeries.formMovie);
router.post('/newmovie', netflixSeries.createMovie);

router.get('/updatemovie/:movieid', netflixSeries.formGenres);
router.post('/updatemovie/:movieid', netflixSeries.updateGenres);

router.get('/deletemovie/:movieid', netflixSeries.deleteMovie);

module.exports = router;
