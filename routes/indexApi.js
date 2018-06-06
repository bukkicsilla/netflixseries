var express = require('express');
var router = express.Router();
var netflixseries = require('../controllers/seriesApi');

router.get('/netflixseries', netflixseries.moviesAll);
router.post('/netflixseries', netflixseries.createMovie);
router.get('/netflixseries/:movieid', netflixseries.showMovie);
router.put('/netflixseries/:movieid', netflixseries.updateMovie);

router.patch('/netflixseries/:movieid', netflixseries.replaceInfo);
//router.patch('/netflixseries/:movieid/seasons', netflixseries.replaceSeasons);
//router.patch('/netflixseries/:movieid', netflixseries.replaceYears);
//router.patch('/netflixseries/:movieid', netflixseries.replaceGenres);
//router.patch('/netflixseries/:movieid', netflixseries.replaceLink);

router.delete('/netflixseries/:movieid', netflixseries.deleteMovie);

module.exports = router;