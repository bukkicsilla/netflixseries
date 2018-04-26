var mongoose = require('mongoose');

var genreSchema = new mongoose.Schema({
    genre: {type: String, required: true}
});

var movieSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true},
    seasons: {type: Number, min:1, max: 100},
    years: {type: String},
    genres: [genreSchema],
    netflixlink: {type: String}
});

mongoose.model('Movie', movieSchema);

/*db.movies.save({
    name: "The 4400",
    seasons: 4,
    years: '2004-2007',
    netflixlink: 'https://www.netflix.com/search?q=4400&jbv=70157231&jbp=0&jbr=0'
})*/

/*db.movies.update({
    name: 'The 4400'
}, {
    $push: {
        genres: {
            $each: [{
                genre: 'TV Shows'
            },
               {
               genre: 'TV Dramas'
               },
               {
               genre: 'TV Mysteries'
               },
               {
               genre: 'TV Sci-Fi & Fantasy'
               }
            ]
        }
    }
})*/
