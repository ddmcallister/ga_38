
var name;
function testFunction() {
name = "mikey";
return name;
}
console.log(name);

var newName = testFunction();
console.log(newName);


/*if ("geolocation" in navigator) {
  console.log("geolocation is available");
  } else {
  console.log("geolocation IS NOT available");
}

var output = document.getElementById("result1");

if (!navigator.geolocation){
  output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
  };

function geoFindMe() {
  function success(position) {
    var myLoc  = "lat=" + Math.round(position.coords.latitude) + "&lng=" + Math.round(position.coords.longitude);
    console.log(myLoc);
    outsideGeo(myLoc);
    //setLoc(myLoc);
  };

  function error() {
    console.log('error');
  };
  navigator.geolocation.getCurrentPosition(success, error);
}

geoFindMe();

function outsideGeo(point) {
  console.log(point);
}

//var urlDate;
//function setLoc(point) {
  //urlDate = "http://data.tmsapi.com/v1/movies/showings?startDate=" + keyDateString + "&zip=10003" + point + "&api_key=sjesnpx2uhtyac5frfhzfedb";
//}
//above, working with commented out function above, doesn't work - why?

//need http://data.tmsapi.com/v1/movies/showings?startDate=2014-10-22&lat=41&lng=-74&api_key=sjesnpx2uhtyac5frfhzfedb
*/