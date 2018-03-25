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


module.exports.createMovie = function(req, res){
    Mov.create({
        name: req.body.name,
        seasons: req.body.seasons,
        years: req.body.years,
        genres: req.body.genres,
        netflixlink: req.body.netflixlink
    }, function(err, movie){
        if(err){
            res.status(400);
            res.json(err);
        } else {
            res.status(201);
            res.json(movie);
        }
    });
}
//test
//{"name" : "The puma", "seasons": 15, "years": "2000-", "netflixlink":"https://www.puma.org", "genres": [{"genre":"TV Shows"}, {"genre": //"Docuseries"}]}

module.exports.deleteMovie = function(req, res){
    var movieid = req.params.movieid;
    if (movieid){
        Mov.findByIdAndRemove(movieid)
           .exec(
                function(err, movie){
                    if(err){
                        res.status(404);
                        res.json(err);
                        return;
                    }
                    res.status(204);
                    res.json(null);
                });
    } else {
        res.status(404);
        res.json({"message":"no id"});
    } 
}