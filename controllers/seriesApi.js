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
              //sendJsonResponse(res, 404, {
                //  "message": "id not found"
              //});
              res.status(404);
              res.json("id not found");
              return;
          } else if(err){
              //sendJsonResponse(res, 404, err);
              res.status(404);
              res.json(err);
              return;
          }
          
          //sendJsonResponse(res, 200, questionanswer);
          res.status(200);
          res.json(movie);
      });
    } else {
        //sendJsonResponse(res, 404, {
          //  "message": "no id in request"
        //});
        res.status(404);
        res.json("no id in request");
    }
    
}