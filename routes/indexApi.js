var express = require('express');
var router = express.Router();
var netflixseries = require('../controllers/seriesApi');

router.get('/netflixseries', netflixseries.moviesAll);
router.post('/netflixseries', netflixseries.createMovie);
router.get('/netflixseries/:movieid', netflixseries.showMovie);
router.put('/netflixseries/:movieid', netflixseries.updateMovie);

router.patch('/netflixseries/:movieid', netflixseries.replaceInfo);

//router.patch('/netflixseries/:movieid', netflixseries.replaceGenres);


router.delete('/netflixseries/:movieid', netflixseries.deleteMovie);

module.exports = router;