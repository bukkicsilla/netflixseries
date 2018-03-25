var request = require('request');
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
}

var apiOps = {
  server : "http://localhost:3000"
};
console.log('server ', apiOps.server);
if (process.env.NODE_ENV === 'production') {
    apiOps.server = "https://netflixseries.herokuapp.com";
}

module.exports.moviesAll = function(req, res){
    var requestOps, path;
    path = '/api/netflixseries';
    requestOps = {
       url: apiOps.server + path,
       method:"GET",
        json: {},
        qs: {}
        };
    request(requestOps, function(err, response, body){
        //renderMovies(req, res, body);
        var msg;
         //shuffle(body);
      if (!(body instanceof Array)){
        msg = "api lookup error";
        body = [];
    } else {
        if(!body.length){
            msg = "no question found";
        }
    }//else
        //rendering
        res.render('index', {
            title : 'Netflix series',
            info:{
                topic: 'CRUD with Express and MongoDB'
            },
            movies: body,
            message: msg
         });
    })
}


module.exports.readMovie = function(req,res){
    var requestOps, path;
    path = "/api/netflixseries/" + req.params.movieid;
    
    requestOps = {
        url: apiOps.server + path,
        method: "GET",
        json: {}
    };
    request(requestOps, 
           function(err, response, body){
            console.log("body "+ body);
            if (response.statusCode === 200){
                console.log('success');
               //renderMovie(req, res, body);   
                res.render('movie', {
            title: 'Movie info',
            info:{
                name: body.name,
                seasons: body.seasons,
                years: body.years,
                genres: body.genres,
                netflixlink: body.netflixlink
            }
      });
            } else  {
                if (response.statusCode === 404){
                    title = "404, page not found";
                    console.log("Try with a different id, page not found.");
                } else {
                    title = response.statusCode + ", sorry";
                    console.log("something went wrong");
                }
                
           res.status(response.statusCode);
            console.log(err);
            res.render('error', {
               title: title,
               message: "Try with different id, page not found",
                error: {
                    status: response.statusCode,
                    stack: 'go back to movie list'
                }
           });   
         }//else
        });//function
}

