// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();
var createAlbums = require('./seed.js');
// serve static files from public folder
app.use(express.static(__dirname + '/public'));
var db = require('./models');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */
createAlbums();
app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/*
 * JSON API Endpoints
 */

app.get('/api', function api_index (req, res){
  res.json({
    message: "Welcome to tunely!",
    documentation_url: "https://github.com/tgaff/tunely/api.md",
    base_url: "http://tunely.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
});

app.get('/api/albums', function album_index(req, res){
  db.Album.find({}, function(err, albums) {
    res.json(albums);
  });
  
});

// Add New albums

app.post('/api/albums', function newAlbumPost(req, res) {
    var newArtistName = req.body.artistName;
    var newName = req.body.name;
    var newReleaseDate = req.body.releaseDate;
    var genres = [req.body.genres];
    var newAlbum = {
      artistName: newArtistName,
      name: newName,
      releaseDate: newReleaseDate,
      genres: genres
    };
    db.Album.create(newAlbum, function(err, newAlbum) {
      if(err) {
        console.log(err);
      } else {
        res.redirect('/api/albums');
      }
    
  });
  
});
app.delete('/api/albums/:id', function deleteAlbum(req, res) {

});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
