// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.
var mongoose = require("mongoose");
var db = require("./models");
var albumsList =[
  // put data here!
  {
  	
	  artistName: 'the Old Kanye',
	  name: 'The College Dropout',
	  releaseDate: '2004, February 10',
	  genres: [ 'rap', 'hip hop' ]
  },
  {
  
	  artistName: 'the Newish Kanye',
	  name: 'The Life of Pablo',
	  releaseDate: '2016, Febraury 14',
	  genres: [ 'hip hop' ]
  }, 
  {
	  artistName: 'the always rude Kanye',
	  name: 'My Beautiful Dark Twisted Fantasy',
	  releaseDate: '2010, November 22',
	  genres: [ 'rap', 'hip hop' ]
  },
  {
  	  
	  artistName: 'the sweet Kanye',
	  name: '808s & Heartbreak',
	  releaseDate: '2008, November 24',
	  genres: [ 'r&b', 'electropop', 'synthpop' ]
  }
];

var sampleSongs = [];

sampleSongs.push({ name: 'Famous',
                   trackNumber: 1
});
sampleSongs.push({ name: "All of the Lights",
                   trackNumber: 2
});
sampleSongs.push({ name: 'Guilt Trip',
                   trackNumber: 3
});
sampleSongs.push({ name: 'Paranoid',
                   trackNumber: 4
});
sampleSongs.push({ name: 'Ultralight Beam',
                   trackNumber: 5
});
sampleSongs.push({ name: 'Runaway',
                   trackNumber: 6
});
sampleSongs.push({ name: 'Stronger',
                   trackNumber: 7
});

function createNewAlbum() {
  db.Album.remove({}, function(err){ 
    if(err) {
      console.log(err);
    }
    console.log("removed albums");
    albumsList.forEach(function(album) {
        db.Album.create(album, function(err, newAlbum) {
          if (err) {
            console.log(err)
          } else {
            sampleSongs.forEach(function(song) {
              db.Song.create({song}, function(err, newSong) {
                if(err) {
                  console.log(err)
                } else {
                  console.log("Success" + newSong);
                  newAlbum.songs.push(newSong);
                  newAlbum.save();
                }
              });
            })
          }
        });
      });
     //process.exit();
  });

}


module.exports = createNewAlbum;
