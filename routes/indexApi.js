var express = require('express');
var router = express.Router();
var netflixseries = require('../controllers/seriesApi');

router.get('/netflixseries', netflixseries.moviesAll);
//router.post('/questionanswers', questionanswers.questionanswersCreate);
router.get('/netflixseries/:movieid', netflixseries.showMovie);
//router.put('/questionanswers/:questionanswerid', questionanswers.questionanswersUpdate);
//router.patch('/questionanswers/:questionanswerid', questionanswers.questionanswersReplace);
//router.delete('/questionanswers/:questionanswerid', questionanswers.questionanswersDelete);

module.exports = router;