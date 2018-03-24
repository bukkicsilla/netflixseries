var mongoose = require('mongoose');
var Mov = mongoose.model('Movie');

module.exports.moviesAll = function(req, res){
     Mov.find({}, function(err, docs){
        if (!err){
           res.status(200);
           res.json(docs); 
         } else {throw err;}
        });
}

module.exports.showMovie = function(req, res){
    if (req.params && req.params.movieid){
      Mov.findById(req.params.movieid)
         .exec(function(err, movie){
          if (!movie){
              res.status(404);
              res.json({'message': 'id not found'});
              return;
          } else if(err){

              res.status(404);
              res.json(err);
              return;
          }
          res.status(200);
          res.json(movie);
      });
    } else {
        res.status(404);
        res.json({'message': 'no id in request'});
    }
    
}