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
            movie: body,
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
            //console.log(err);
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

module.exports.formMovie = function(req, res){
    console.log("create movie");
    res.render('createmovie', {
    title: 'Create Movie',
    error: req.query.err
  });
}

module.exports.createMovie = function(req, res){
    var requestOps, path, postdata;
    path = '/api/netflixseries';
    postdata = {
    name: req.body.formtitle,
    seasons: req.body.formseasons,
    years: req.body.formyears,
    netflixlink: req.body.formnetflix
    //answers: new Array(req.body.answer)
  };
    
    console.log("********** ", postdata.name);
    
    requestOps = {
    url : apiOps.server + path,
    method : "POST",
    json : postdata
  };
  if (!postdata.name) {
      console.log("empry string");
    res.redirect('/newmovie/');
  } else {
    request(
      requestOps,
      function(err, response, body) {
          console.log("name ", body.name);
        if (response.statusCode === 201) {
          res.redirect('/');
        } else if (response.statusCode === 400 && body.name && body.name === "ValidationError" ) {
          res.redirect('/newmovie/');
        } else {
          console.log(body);
          //_showError(req, res, response.statusCode);
        res.status(response.statusCode);
        res.render('generic-text', {
           title : 'You used a wrong string, try again please!',
           content : 'title is unique'
  });
        }
      }
    );
  }  
}

module.exports.formGenres = function(req, res){
    console.log("req", req.params);
    res.render('updategenres', {
    title: 'Update Genres',
    error: req.query.err
  });
};

module.exports.updateGenres = function(req, res){
    var requestOps, path, movieid, postdata;
    movieid = req.params.movieid;
    console.log("id :::" + movieid);
    
  path = "/api/netflixseries/" + req.params.movieid;
  
  postdata = {
    //answers: req.body.answer
    //answers: new Array(req.body.answer)
      genres: [{"genre": req.body.formgenre}]
  };
    console.log("new genre ", postdata.genres);
    requestOps = {
    url : apiOps.server + path,
    method : "PUT",
    json : postdata
  };
    console.log("empty ?", !postdata.genres );
   /*if (!postdata.genres) {
      console.log("empry string");
    res.redirect('/');*/
    if (!req.body.formgenre){
        console.log("empry string");
    res.redirect('/updatemovie/'+movieid);
    
  } else {
    request(
      requestOps,
      function(err, response, body) {
        if (response.statusCode === 200) {
          res.redirect('/movie/'+movieid);
        } else if (response.statusCode === 400 && body.genres && body.genres === "ValidationError" ) {
          res.redirect('/newmovie/');
        } else {
          console.log(body);
          //_showError(req, res, response.statusCode);
        res.status(response.statusCode);
        res.render('errormovie', {
               message: "field is empty",
               movieid: movieid,
                error: {
                    status: response.statusCode,
                    stack: 'go back to movie'
                }
           });
        }
      }
    );
  } //else
};

/***********************************************************************************************************/

module.exports.formInfo = function(req, res){
    /*res.render('replaceinfo', {
    title: 'Replace Info',
    error: req.query.err
  });*/
    
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
            //if (response.statusCode === 200){
                console.log('success');
               //renderMovie(req, res, body);   
                res.render('replaceinfo', {
            title: 'Replace Info',
            error: req.query.err,
            movie: body,
            info:{
                name: body.name,
                seasons: body.seasons,
                years: body.years,
                genres: body.genres,
                netflixlink: body.netflixlink
            }
      });
            //}
       
    });
    
};

module.exports.replaceInfo = function(req, res){
    
    var requestOps, path, movieid, postdata;
    movieid = req.params.movieid;
    //console.log("id :::" + movieid);
    //console.log("******  ", req.params);
  path = "/api/netflixseries/" + req.params.movieid;
  
  postdata = {
    //answers: req.body.answer
    //answers: new Array(req.body.answer)
      genres: [{"genre": req.body.formgenre}],
      seasons: req.body.formseasons,
      years: req.body.formyears,
      netflixlink: req.body.formnetflixlink
  };
    
    //console.log("replace seasons ", postdata.seasons);
    requestOps = {
    url : apiOps.server + path,
    method : "PATCH",
    json : postdata
  };
    console.log("seasons ", postdata.seasons);
    if (!postdata.seasons) {
      console.log("empry string");
    res.redirect('/replaceinfo/'+movieid);
  }
    else {
    request(
      requestOps,
      function(err, response, body) {
          console.log("here");
        if (response.statusCode === 200) {
            console.log("ok 200");
          res.redirect('/movie/'+movieid);
        } else if (response.statusCode === 400 && body.formseasons && body.formseasons === "ValidationError" ) {
          res.redirect('/newmovie/');
        } else {
          console.log(body);
          //_showError(req, res, response.statusCode);
        res.status(response.statusCode);
        res.render('errormovie', {
           message: "field is empty",
               movieid: movieid,
                error: {
                    status: response.statusCode,
                    stack: 'go back to movie'
                }
  });
        }
      }
    );
  } //else 
    
    
    
}

/*************************************************************************************************************/

module.exports.formSeasons = function(req, res){
    
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
            //if (response.statusCode === 200){
                console.log('success');
               //renderMovie(req, res, body);   
                res.render('replaceseasons', {
            title: 'Replace Seasons',
            error: req.query.err,
            movie: body,
            info:{
                name: body.name,
                seasons: body.seasons,
                years: body.years,
                genres: body.genres,
                netflixlink: body.netflixlink
            }
      });
            //}
       
    });
    
};

module.exports.replaceSeasons = function(req, res){
    
    var requestOps, path, movieid, postdata;
    movieid = req.params.movieid;
    //console.log("id :::" + movieid);
    console.log("******  ", req.params);
  path = "/api/netflixseries/" + req.params.movieid;
  
  postdata = {
      seasons: req.body.formseasons
  };
    
    //console.log("replace seasons ", postdata.seasons);
    requestOps = {
    url : apiOps.server + path,
    method : "PATCH",
    json : postdata
  };
    console.log("seasons ", postdata.seasons);
    if (!postdata.seasons) {
      console.log("empry string");
    res.redirect('/replaceseasons/'+movieid);
  }
    else {
    request(
      requestOps,
      function(err, response, body) {
          console.log("here");
        if (response.statusCode === 200) {
            console.log("ok 200");
          res.redirect('/movie/'+movieid);
        } else if (response.statusCode === 400 && body.formseasons && body.formseasons === "ValidationError" ) {
          res.redirect('/newmovie/');
        } else {
          console.log(body);
          //_showError(req, res, response.statusCode);
        res.status(response.statusCode);
        res.render('errormovie', {
           message: "field is empty",
               movieid: movieid,
                error: {
                    status: response.statusCode,
                    stack: 'go back to movie'
                }
  });
        }
      }
    );
  } //else 
    
    
    
}

/**************************************************************************************************************************/


module.exports.formYears = function(req, res){
    
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
            //if (response.statusCode === 200){
                console.log('success');
               //renderMovie(req, res, body);   
                res.render('replaceyears', {
            title: 'Replace Years',
            error: req.query.err,
            movie: body,
            info:{
                name: body.name,
                seasons: body.seasons,
                years: body.years,
                genres: body.genres,
                netflixlink: body.netflixlink
            }
      });
            //}
       
    });
    
};

module.exports.replaceYears = function(req, res){
    
    var requestOps, path, movieid, postdata;
    movieid = req.params.movieid;
    //console.log("id :::" + movieid);
    console.log("******  ", req.params);
  path = "/api/netflixseries/" + req.params.movieid;
  
  postdata = {
      years: req.body.formyears
  };
    
    //console.log("replace seasons ", postdata.seasons);
    requestOps = {
    url : apiOps.server + path,
    method : "PATCH",
    json : postdata
  };
    console.log("years ", postdata.years);
    if (!postdata.years) {
      console.log("empry string");
    res.redirect('/replaceyears/'+movieid);
  }
    else {
    request(
      requestOps,
      function(err, response, body) {
          console.log("here");
        if (response.statusCode === 200) {
            console.log("ok 200");
          res.redirect('/movie/'+movieid);
        } else if (response.statusCode === 400 && body.formyears && body.formsyears === "ValidationError" ) {
          res.redirect('/newmovie/');
        } else {
          console.log(body);
          //_showError(req, res, response.statusCode);
        res.status(response.statusCode);
        res.render('errormovie', {
           message: "field is empty",
               movieid: movieid,
                error: {
                    status: response.statusCode,
                    stack: 'go back to movie'
                }
  });
        }
      }
    );
  } //else 
    
    
    
}

/**************************************************************************************************************************/

module.exports.formLink = function(req, res){
    
    var requestOps, path;
    path = "/api/netflixseries/" + req.params.movieid;
    
    requestOps = {
        url: apiOps.server + path,
        method: "GET",
        json: {}
    };
    request(requestOps, 
           function(err, response, body){
            console.log("form netflixlink "+ body.netflixlink);
            //if (response.statusCode === 200){
                console.log('success');
               //renderMovie(req, res, body);   
                res.render('replacelink', {
            title: 'Replace Link',
            error: req.query.err,
            movie: body,
            info:{
                name: body.name,
                seasons: body.seasons,
                years: body.years,
                genres: body.genres,
                netflixlink: body.netflixlink
            }
      });
            //}
       
    });
    
};

module.exports.replaceLink = function(req, res){
    
    var requestOps, path, movieid, postdata;
    movieid = req.params.movieid;
    //console.log("id :::" + movieid);
    console.log("******  ", req.params);
  path = "/api/netflixseries/" + req.params.movieid;
  
  postdata = {
      netflixlink: req.body.formlink
  };
    
    //console.log("replace seasons ", postdata.seasons);
    requestOps = {
    url : apiOps.server + path,
    method : "PATCH",
    json : postdata
  };
    console.log("link ", postdata.link);
    if (!postdata.netflixlink) {
      console.log("empry string");
    res.redirect('/replacelink/'+movieid);
  }
    else {
    request(
      requestOps,
      function(err, response, body) {
          console.log("here");
        if (response.statusCode === 200) {
            console.log("ok 200");
          res.redirect('/movie/'+movieid);
        } else if (response.statusCode === 400 && body.formlink && body.formlink === "ValidationError" ) {
          res.redirect('/newmovie/');
        } else {
          console.log(body);
          //_showError(req, res, response.statusCode);
        res.status(response.statusCode);
        res.render('errormovie', {
           message: "field is empty",
               movieid: movieid,
                error: {
                    status: response.statusCode,
                    stack: 'go back to movie'
                }
  });
        }
      }
    );
  } //else 
    
    
    
}

/**************************************************************************************************************************/


module.exports.deleteMovie = function(req, res){
    var requestOps, path;
    //console.log(req.params);
    path = "/api/netflixseries/" + req.params.movieid;
    console.log("path in delete " + path);
    requestOps = {
        url: apiOps.server + path,
        method: "DELETE",
        json: {}
    };
    request(requestOps, 
           function(err, response, body){
            if (response.statusCode === 204){
                res.redirect('/');
            } else  {
                if (response.statusCode === 404){
                    title = "404, page not found";
                    console.log("Try with a different id, page not found.");
                } else {
                    title = response.statusCode + ", sorry";
                    console.log("something went wrong");
                }
                
           res.status(response.statusCode);
            res.render('error', {
               message: "Try with different id, page not found",
                error: {
                    status: response.statusCode,
                    stack: 'go back to movie list'
                }
           });    
         }//else
        }
           );
}