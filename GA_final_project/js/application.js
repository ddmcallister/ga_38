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

var preSig = sigA + sigB + Date.UTL();

var sha = $.sjcl.hash.sha256(preSig); {
  console.log(preSig);
}*/


function halfHour () {

  var movies = $.ajax({
    url: "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json?apikey=d8sjemgp8m5mfpyam3cw5ea5",
    dataType: 'jsonp',
    success: function(jsonp) {
      console.dir("success");
      /*$(jsonp).appendTo(".result1");*/
    },
    error: function(e) {
      console.log(e.message);
    }

  });

  console.log(movies);
}

