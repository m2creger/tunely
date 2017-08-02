var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Song = require('./song');
//var SongSchema = require('Song').schema;

// let SongSchema = new Schema ({
// 	 name: String,
//   	 trackNumber: Number
// });

var AlbumSchema = new Schema({
  artistName: String,
  name: String,
  releaseDate: String,
  genres: [ String ],
  songs: [Song.schema]
});

var Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;