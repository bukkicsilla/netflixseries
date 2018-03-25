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

/*module.exports.getSeries = function(req, res){
   res.render('index', {
       title: 'Netflix series',
       info: { 
              topic: 'CRUD with Express and MOngoDB'
            },
       movies: [{
           name: 'The 100',
           seasons: '4',
           years: '2014-',
           genres: ['TV Shows', 'TV Action & Adventure', 'TV Dramas', 'TV Sci-Fi & Fantasy'],
           netflixlink: 'https://www.netflix.com/search?q=100&jbv=70283264&jbp=0&jbr=0'
       },
        {
           name: "Grey's Anatomy",
            seasons: '13',
            years: '2005-',
            genres: ['TV Shows', 'Romantic TV Shows', 'TV Dramas', 'Medical TV Dramas'],
            netflixlink:'https://www.netflix.com/search?q=grey&jbv=70140391&jbp=0&jbr=0'
        },
        {
            name: 'When calls the Heart',
            seasons: '4',
            years: '2014-', 
            genres: ['TV Shows', 'TV Dramas', 'Period Pieces'],
            netflixlink: 'https://www.netflix.com/search?q=when%20calls%20the%20heart&jbv=80036407&jbp=0&jbr=0'
        },
        {
            name: 'The Hunt',
            seasons: '1',
            years: '2015',
            genres: ['TV Shows', 'British TV Shows', 'Science & Nature TV', 'Docuseries'],
            netflixlink: 'https://www.netflix.com/search?q=the%20hunt&jbv=80097726&jbp=0&jbr=0'
        },
        {
            name:'AD Kingdom and Empire',
            seasons: '1',
            years: '2015',
            genres: ['TV Shows', 'Miniseries', 'TV Dramas', 'Faith & Spirituality'],
            netflixlink: 'https://www.netflix.com/search?q=AD%20ki&jbv=70295758&jbp=2&jbr=0'
        }, 
        {
            name: 'Stranger Things',
            seasons: '2',
            years: '2016-',
            genres: ['TV Shows', 'TV Sci-Fi & Fantasy', 'Teen TV Shows'],
            netflixlink: 'https://www.netflix.com/search?q=stranger%20&jbv=80057281&jbp=1&jbr=0'
        },
        {
            name: 'Rita',
            seasons: '4',
            years: '2012-',
            genres: ['TV Shows', 'Danish TV Show', 'TV Comedies', 'TV Dramas'],
            netflixlink: 'https://www.netflix.com/search?q=rita&jbv=70285368&jbp=0&jbr=0'
        },
        {
            name:'Switched at Birth',
            seasons: '5',
            years: '2011-2017',
            genres: ['TV Shows', 'TV Dramas'],
            netflixlink: 'https://www.netflix.com/search?q=switched&jbv=70189301&jbp=0&jbr=0'
        },
        {
            name: 'FantastiC',
            seasons: '1',
            years: '2016',
            genres: ['TV Shows', 'Korean TV Shows', 'Korean TV Dramas'],
            netflixlink: 'https://www.netflix.com/search?q=fantastic&jbv=80197682&jbp=0&jbr=0'
        },
        {
            name: 'The 4400',
            seasons: '4',
            years: '2004-2007',
            genres: ['TV Shows', 'TV Dramas', 'TV Mysteries', 'TV Sci-Fi & Fantasy'],
            netflixlink: 'https://www.netflix.com/search?q=4400&jbv=70157231&jbp=0&jbr=0'
        }
           
       ]
    });
};*/

module.exports.readMovie = function(req,res){
    var requestOps, path;
    path = "/api/netflixseries/" + req.params.movieid;
    //console.log("path answer " + path);
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
                //var title;
                if (response.statusCode === 404){
                    title = "404, page not found";
                    console.log("Try with a different id, page not found.");
                } else {
                    title = response.statusCode + ", sorry";
                    console.log("something went wrong");
                }
                
           res.status(response.statusCode);
            //body = [];
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
        }//function
           );
    
}

module.exports.getMovie = function(req, res){
    res.render('movie', {
        title: 'Movie info',
        info: {
           name: 'The 4400',
           seasons: '4',
           years: '2004-2207',
           //genres: ['TV Shows', 'TV Dramas', 'TV Mysteries'],
           genres: [{
                     genre: 'TV SHOWS',
                    },
                    {
                     genre: 'TV DRAMAS'    
                    }
               
           ],
            netflixlink: 'https://www.netflix.com/search?q=4400&jbv=70157231&jbp=0&jbr=0'
    }
    });
};