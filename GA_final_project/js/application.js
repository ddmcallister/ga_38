/*function halfHour () {

	if ("geolocation" in navigator) {
      console.log("geolocation is available");
  } else {
      console.log("geolocation IS NOT available")
  }

	var output = document.getElementById("result1");

	if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  };

	function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    output.innerHTML = "<p>Latitude is " + latitude + "° <br>Longitude is " + longitude + "°</p>";
;
  console.log(latitude);
  //above shows latitude

	};

function error() {
    	output.innerHTML = "Unable to retrieve your location";
  };

  output.innerHTML = "<p>Locating</p>";

navigator.geolocation.getCurrentPosition(success);

}
*/

/*
var sigA = "r6kafxx75q3havh86syn8t4j";
var sigB = "EHgUzuP2qj";

var utcDate = Math.floor(Date.now() / 1000);

console.log(utcDate);

var preSig = sigA + sigB + utcDate;

console.log(preSig);

var sha = sha256.hash(preSig)

console.log(sha);

function converter(bytes) {
  for (var hex = [], i = 0; i < bytes.length; i++) {
    hex.push((bytes[i] >>> 4).toString(16));
    hex.push((bytes[i] & 0xF).toString(16));
  }
  return hex.join("");
}

var hex = converter(sha);
console.log(hex);
*/

var movArray = 0;
var movTimesArray = 0;


  function halfHour () {

  var movies = $.ajax({
    url: "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=d8sjemgp8m5mfpyam3cw5ea5",
    dataType: 'jsonp',
    success: function(jsonp) {
      //console.dir(movies.responseJSON.movies);
      movArray = movies.responseJSON.movies;
      console.log(movArray);
      //$each(movArray function(index, value)
          //{


          //}
        

    },



    //return movArray;
    //error: function(e) {
      //console.log(e.message);
    //}

    //console.log(newMovArray);

  });

  var movieTimes = $.ajax({
    url: "http://data.tmsapi.com/v1/movies/showings?startDate=2014-10-19&zip=10128&api_key=sjesnpx2uhtyac5frfhzfedb",
    dataType: 'json',
    success: function(json) {
      console.dir("success");
      console.dir(movies);
      //tried movies.showings & movies.showings.10128 & movies.movies & movies[] for above
      //movTimesArray = 
    },

    error: function(e) {
      console.log(e.message);
    }


  //document.getElementById("result1").innerHTML = movies;
 });
      console.log(movieTimes);

//json object returned above is movies: Array[10] 
//I want the following for each indexed movie 
//id: "somenumber" - for addicted rt: "771364788", alternate id imdb: "2205401"
/// for addicted gracenote: "tmsId": "MV005151980000", "rootId": "10233171",
//omdb uses imdb id and has metacritic score
//ratings - which is an object - from that object I want critics_score: somenumber
//title: "somestring"
}