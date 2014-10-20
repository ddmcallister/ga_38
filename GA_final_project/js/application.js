/*if ("geolocation" in navigator) {
  console.log("geolocation is available");
  } else {
  console.log("geolocation IS NOT available")
}

var output = document.getElementById("result1");
if (!navigator.geolocation){
  output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
  };
//for above, give option of entering zip to search?  

var coords = {lat: "", lng: ""};

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition)};

function showPosition(position) {
  coords.lat = position.coords.latitude;
  coords.lng = position.coords.longitude;
  console.log(coords.lat);
  return coords.lat;
}

console.log(coords.lat);
*/


var movArray = 0;
var movTimesArray = [];


var d = new Date();
var y = d.getFullYear();
var m =  d.getMonth() + 1;
var dd = d.getDate();
var h = d.getHours();
var mi = d.getMinutes();
var dateString = y + "-" + m + "-" + dd + "T" + h + ":" + mi;

  function halfHour () {

  var movies = $.ajax({
    url: "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=d8sjemgp8m5mfpyam3cw5ea5",
    dataType: 'jsonp',
    success: function(jsonp) {
      console.dir(movies.responseJSON.movies);
      movArray = movies.responseJSON.movies;
      console.log(movArray[2].ratings.critics_score);
      for(var rtMovArray = [], i=0; i<movArray.length; i++) {

        rtMovArray.push(movArray[i].title, movArray[i].ratings.critics_score);
        //movArray[i].links.alternate is links to reviews
        document.getElementById("result1").innerHTML = rtMovArray;
      }

    //error: function(e) {
      //console.log(e.message);
    
    }

  });

  var movieTimes = $.ajax({
    url: "http://data.tmsapi.com/v1/movies/showings?startDate=2014-10-20&zip=10128&api_key=sjesnpx2uhtyac5frfhzfedb",
        //http://data.tmsapi.com/v1/movies/showings?startDate=2014-10-19&lat=41&lng=-74&api_key=sjesnpx2uhtyac5frfhzfedb
    dataType: 'json',
    success: function(json) {
      console.dir("success");
      console.dir(movieTimes.responseJSON[1].showtimes);
      movTimesArray = movieTimes.responseJSON;
      console.dir(movTimesArray[1].showtimes)
      for(var tmsMovArray = [], i=0; i<movTimesArray.length; i++) {
        tmsMovArray.push(movTimesArray[i].title, movTimesArray[i].showtimes);
      //displays dateTime: "2014-10-20T16:45" 
      }
    },

    error: function(e) {
      console.log(e.message);
    }

 });

}