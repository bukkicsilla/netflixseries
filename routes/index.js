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


router.get('/replaceinfo/:movieid', netflixSeries.formInfo);
router.post('/replaceinfo/:movieid', netflixSeries.replaceInfo);

router.get('/replaceseasons/:movieid', netflixSeries.formSeasons);
router.post('/replaceseasons/:movieid', netflixSeries.replaceSeasons);

router.get('/replaceyears/:movieid', netflixSeries.formYears);
router.post('/replaceyears/:movieid', netflixSeries.replaceYears);

//router.get('/replacegenres/:movieid', netflixSeries.formGenresReplace);
//router.post('/replacegenres/:movieid', netflixSeries.formGenresReplace);

//router.get('/replacelink/:movieid', netflixSeries.formLink);
//router.post('/replacelink/:movieid', netflixSeries.replaceLink);

router.get('/deletemovie/:movieid', netflixSeries.deleteMovie);

module.exports = router;
