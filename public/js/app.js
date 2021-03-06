/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */


/* hard-coded data! */
var sampleAlbums = [];
sampleAlbums.push({
             artistName: 'Ladyhawke',
             name: 'Ladyhawke',
             releaseDate: '2008, November 18',
             genres: [ 'new wave', 'indie rock', 'synth pop' ]
           });
sampleAlbums.push({
             artistName: 'The Knife',
             name: 'Silent Shout',
             releaseDate: '2006, February 17',
             genres: [ 'synth pop', 'electronica', 'experimental' ]
           });
sampleAlbums.push({
             artistName: 'Juno Reactor',
             name: 'Shango',
             releaseDate: '2000, October 9',
             genres: [ 'electronic', 'goa trance', 'tribal house' ]
           });
sampleAlbums.push({
             artistName: 'Philip Wesley',
             name: 'Dark Night of the Soul',
             releaseDate: '2008, September 12',
             genres: [ 'piano' ]
           });
/* end of hard-coded data */

var albumId;

$(document).ready(function() {
  console.log('app.js loaded!');
  $.get("http://localhost:3000/api/albums").done(function(data) {
    let kanyeAlbums = data;
      kanyeAlbums.forEach(function(album) {
        console.log("The new album created is " + album);
        console.log(album);
        renderAlbum(album);
    });
  });

  $("form").on("submit", function(event) {
    event.preventDefault();
    var datastring = $(this).serialize();
    console.log(datastring);
    $.ajax({
      type: "POST",
      url: '/api/albums',
      data: datastring,
      dataType: "json",
      success: function(data) {
        //var obj = jQuery.parseJSON(data);
      }, error: function() {
        console.log("error posting form data")
      }

    });

    $(this).trigger("reset");
  });

  $('#albums').on('click', '.add-song', function(element) {
    console.log("add song clicked");
    //Set album id 
    albumId = $(this).parents('.album').data('album-id');
    console.log(this);
    console.log('id',albumId);
    handleNewSongButtonClick(albumId);
  });
  $('#saveSong').on('click', function(event) {
    event.preventDefault();
    handleNewSongSubmit();
  })
  $('#deleteButton').click(function() {
    console.log("delete button clicked");
  });
   
});


function buildSongsHtml(songs) {
  console.log(songs);
  console.log("making songs******************");
  var songText = "--";
  songs.forEach(function(song) {
    console.log(song.trackNumber);
    console.log(song.name);
    songText = songText + "(" + song.trackNumber + ")" + song.name + "-";
    console.log(songText);
  });
  var songHTML =  
   "   <!-- one song -->" +
    "<li class='list-group-item'>" +
    "<h4 class='inline-header'>Songs:</h4>" +
    "<span>" + songText + "</span>" +
    "</li>"+
    "  <!-- end one song -->";
  console.log(songHTML);
  // $('.albumReleaseDate').append(songHTML);
  return songHTML;
  
}

// this function takes a single album and renders it to the page
function renderAlbum(album) {
  console.log('rendering album:', album);
  console.log(album._id);
  var songsArray = album.songs;
  var albumHtml =
  "        <!-- one album -->" +
  "        <div class='row album' data-album-id='" + album._id + "'>" +
  "          <div class='col-md-10 col-md-offset-1'>" +
  "            <div class='panel panel-default'>" +
  "              <div class='panel-body'>" +
  "              <!-- begin album internal row -->" +
  "                <div class='row'>" +
  "                  <div class='col-md-3 col-xs-12 thumbnail album-art'>" +
  "                     <img src='" + "http://placehold.it/400x400'" +  " alt='album image'>" +
  "                  </div>" +
  "                  <div class='col-md-9 col-xs-12'>" +
  "                    <ul class='list-group'>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Album Name:</h4>" +
  "                        <span class='album-name'>" + album.name + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Artist Name:</h4>" +
  "                        <span class='artist-name'>" +  album.artistName + "</span>" +
  "                      </li>" +
  "                      <li class='albumReleaseDate' class='list-group-item'>" +
  "                        <h4 class='inline-header'>Released date:</h4>" +
  "                        <span class='album-releaseDate'>" + album.releaseDate + "</span>" +
  "                      </li>" + buildSongsHtml(songsArray) +
  "                    </ul>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of album internal row -->" +

  "              </div>" + // end of panel-body

  "              <div class='panel-footer'>" +
  "                  <button class='btn btn-primary add-song'>Add Song</button>" +
  "              </div>" +

  "            </div>" +
  "          </div>" +
  "          <!-- end one album -->";

  
  // render to the page with jQuery
  $('#albums').prepend(albumHtml);
 
  
  console.log("making albums*******************")
  buildSongsHtml(songsArray);

}
// this function will be called when someone clicks a button to create a new song
//   it has to determine what album (in the DB) the song will go to
function handleNewSongButtonClick(id) {
  console.log("calling modal");
  console.log("the id is " + id);
  // get the current album's id from the row the button is in
  // set the album-id data attribute on the modal (jquery)
  $('#songModal').data('album-id', id);
  $('#songModal').modal("show");
  // display the modal
}

// call this when the button on the modal is clicked
function handleNewSongSubmit() {
  
  // get data from modal fields
  var songName = $('#songName').val();
  console.log(songName);
  var trackNumber = $('#trackNumber').val();
  var datastring = '&name=' + songName + "&trackNumber=" + trackNumber;
  console.log(datastring);
  
  // POST to SERVER
  $.ajax({
      type: "POST",
      url: '/api/albums/'+ albumId + '/songs',
      data: datastring,
      dataType: "json",
      success: successfulAlbumUpdate,
      error: function() {
        console.log("error posting form data")
      }

    });
  // clear form
  $(this).trigger("reset");
  // close modal
  $('#songModal').modal("hide");
  // update the correct album to show the new song
}

function successfulAlbumUpdate() {
  // $.get( '/api/albums/' + albumId, function( data ) {
  //   renderUpdatedAlbum(data);
  // });

  $.ajax({
      type: "GET",
      url: '/api/albums/'+ albumId,
      success: renderUpdatedAlbum,
      error: function() {
        console.log("error posting form data")
      }

    });
}

function renderUpdatedAlbum(json) {
  console.log(json);
  var albumToUpdate = $("div").find("[data-album-id=" + albumId + "]");
  albumToUpdate.remove();
  renderAlbum(json);
}
