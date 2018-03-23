module.exports.getSeries = function(req, res){
   res.render('index', {title: 'Netflix series'});
};

module.exports.getMovie = function(req, res){
    res.render('movie', {title: 'Movie info'});
};