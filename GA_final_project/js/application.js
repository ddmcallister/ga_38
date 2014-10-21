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

var keyDateString = y + "-" + m + "-" + dd;
var urlDate = "http://data.tmsapi.com/v1/movies/showings?startDate=" + keyDateString + "&zip=10128&api_key=sjesnpx2uhtyac5frfhzfedb";

function halfHour () {

/*  var movies = $.ajax({
    url: "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=d8sjemgp8m5mfpyam3cw5ea5&page_limit=50",
    dataType: 'jsonp',
    success: function(jsonp) {
      movArray = movies.responseJSON.movies;
      for(rtTitlArr = [], i=0; i<movArray.length; i++) {
        rtTitlArr.push([movArray[i].title, movArray[i].ratings.critics_score]);
      }

      console.log(rtTitlArr);
     
        //movArray[i].links.alternate is links to reviews
        //document.getElementById("result1").innerHTML = globMovArr;

    //error: function(e) {
      //console.log(e.message);
    
    }
  });*/



  var movieTimes = $.ajax({
    url: urlDate,
      //"http://data.tmsapi.com/v1/movies/showings?startDate=2014-10-20&zip=10128&api_key=sjesnpx2uhtyac5frfhzfedb",
        //http://data.tmsapi.com/v1/movies/showings?startDate=2014-10-19&lat=41&lng=-74&api_key=sjesnpx2uhtyac5frfhzfedb
    dataType: 'json',
    success: function(json) {
      movTimesArray = movieTimes.responseJSON;
      for(var globMovTimes = [], i=0; i<movTimesArray.length; i++) {
        globMovTimes.push([movTimesArray[i].title, movTimesArray[i].showtimes]); 
      //displays dateTime: "2014-10-20T16:45" 
      }

    console.log(globMovTimes[0][0]);

    var movies = $.ajax({
    url: "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=d8sjemgp8m5mfpyam3cw5ea5&page_limit=50",
    dataType: 'jsonp',
    success: function(jsonp) {
      movArray = movies.responseJSON.movies;
      for(rtTitlArr = [], i=0; i<movArray.length; i++) {
        rtTitlArr.push([movArray[i].title, movArray[i].ratings.critics_score]);
      }

      //var comTitlArr = [];

      /*$each(globMovTimes, function() { 
          if (globMovTimes[0][0] == rtTitlArr[0][0]) {
           comTitlArr.push([rtTitlArr[0][1], globMovArr[1]]); 
          }

        });*/

      for(comTitlArr = [], i=0; i<globMovTimes.length; i++) {
        for(j=0; j<rtTitlArr.length; j++) {
          if (globMovTimes[i][0] == rtTitlArr[j][0]) {
           comTitlArr.push([rtTitlArr[j][0], rtTitlArr[j][1], globMovTimes[i][1]]);
         }
       }
      }

      console.log(rtTitlArr[0][0]);
      console.log(comTitlArr);
     
        //movArray[i].links.alternate is links to reviews
      }



  });

    },

    error: function(e) {
      console.log(e.message);
    }


 });

  //console.log(globMovTimes);

}

//document.getElementById("result1").innerHTML = globMovArr;