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

module.exports.updateMovie = function(req, res){
        if(!req.params.movieid){
            res.status(404);
            res.json({"message": "id not found, it is required"});    
            return;
    }
    Mov.findById(req.params.movieid)
       .select('-name -seasons -years -netflixlink')
       .exec(
        function(err, movie){
            if(!movie){
                console.log("id ", err);
                res.status(404);
                res.json({"message": "movie id is not found"});
                return;
            } else if (err) {
                console.log("ERROR");
                res.status(400);
                res.json(err);
                return;
            }
            //questionanswer.question = req.body.question;
            //questionanswer.answers = req.body.answers;
            //concatenation of the old list and the new item in list
            movie.genres = movie.genres.concat(req.body.genres);
            console.log("API genre " + movie.genres);
            movie.save(function(err,  movie){
                if (err){
                    console.log("ERR");
                    res.status(404);
                    res.json(err);
                } else {
                    console.log("SUCCESS");
                    res.status(200);
                    res.json(movie);
                }
            });
        })
};

//{"genres" : [{"genre":"Funny Movie"}]}


module.exports.replaceInfo = function(req, res){
    //sendJsonResponse(res, 200, {"status" : "success"});
    if(!req.params.movieid){
        res.status(404);
        res.json({"message": "id not found, it is required"});    
        return;
    }
    Mov.findById(req.params.movieid)
       .select('-name')
       .exec(
        function(err, movie){
            if(!movie){
                res.status(404);
                res.json({"message":"movie is not found"});
                return;
            } else if (err) {
                res.status(400);
                res.json(err);
                return;
            }
            //questionanswer.question = req.body.question;
            //questionanswer.answers = req.body.answers;
            //concatenation of the old list and the new item in list
            //movie.genres = [];
            //movie.genres = movie.genres.concat(req.body.genres);
            movie.genres = movie.genres;
            //console.log("API answer " + movie.genres);
            //console.log("seasons ", req.body.seasons);
            if (req.body.seasons)  movie.seasons = req.body.seasons;
            if (req.body.years) movie.years = req.body.years;
            if (req.body.netflixlink) movie.netflixlink = req.body.netflixlink;
            
            movie.save(function(err,  movie){
                if (err){
                    res.status(404);
                    res.json(err);
                } else {
                    res.status(200);
                    res.json(movie);
                }   
        });
  });
}
  
//{"genres" : [{"genre":"Douserries"} ,{"genre": "Funny"}]}


module.exports.replaceSeasons = function(req, res){
    //sendJsonResponse(res, 200, {"status" : "success"});
    if(!req.params.movieid){
        res.status(404);
        res.json({"message": "id not found, it is required"});    
        return;
    }
    Mov.findById(req.params.movieid)
       .select('-name')
       .exec(
        function(err, movie){
            if(!movie){
                res.status(404);
                res.json({"message":"movie is not found"});
                return;
            } else if (err) {
                res.status(400);
                res.json(err);
                return;
            }
            //questionanswer.question = req.body.question;
            //questionanswer.answers = req.body.answers;
            //concatenation of the old list and the new item in list
            //movie.genres = [];
            //movie.genres = movie.genres.concat(req.body.genres);
            movie.genres = movie.genres;
            console.log("API answer genres " + movie.genres);
            //console.log("seasons ", req.body.seasons);
            if (req.body.seasons)  movie.seasons = req.body.seasons;
            if (req.body.years) movie.years = req.body.years;
            if (req.body.netflixlink) movie.netflixlink = req.body.netflixlink;
            
            movie.save(function(err,  movie){
                if (err){
                    res.status(404);
                    res.json(err);
                } else {
                    res.status(200);
                    res.json(movie);
                }   
        });
  });
}


module.exports.deleteMovie = function(req, res){
    var movieid = req.params.movieid;
    console.log("api req params ", req.params);
    console.log("api delete ", movieid);
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