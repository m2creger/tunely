var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// var song = require('./song.js');
// var SongSchema = require('Song').schema;

let SongSchema = new Schema ({
	 name: String,
  	 trackNumber: Number
});

let AlbumSchema = new Schema({
  artistName: String,
  name: String,
  releaseDate: String,
  genres: [ String ],
  songs: [SongSchema]
});

let Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;