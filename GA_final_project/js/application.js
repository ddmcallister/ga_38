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
var tDay = new Date();
var y = tDay.getFullYear();
var m =  tDay.getMonth() + 1;
var d = tDay.getDate();

var complDate = 0;
function dateConvert (timeBase) {
  var justYear = timeBase.slice(0, 4);
  var justDay = timeBase.slice(5, 10);
  var dtRecomb = justDay + "-" + justYear;

  var twentyFour = timeBase.slice(11,13);
  var mins = timeBase.slice(14, 16);
  var dd = "AM";
  var twelveHr = 0;
  function normHr() {
    if (twentyFour >= 12) {
      twelveHr = twentyFour-12;
      dd = "PM";
      } else if (twentyFour == 0) {
          twelveHr = 12;
      }
  }
  normHr();
  
  complDate = twelveHr + ":" + mins + " " + dd + "," + " " + dtRecomb;
  }

//gracenote stuff
var keyDateString = y + "-" + m + "-" + d;
var urlDate = "http://data.tmsapi.com/v1/movies/showings?startDate=" + keyDateString + "&zip=10003&radius=1" + "&api_key=sjesnpx2uhtyac5frfhzfedb";

var gnMovs = []; 
var movieTimes = $.ajax({
  url: urlDate,
  dataType: 'json',
  success: function(json) {
    var movTimesArray = movieTimes.responseJSON;
    for(q = 0; q < movTimesArray.length; q++) {
      gnMovs.push([movTimesArray[q].title, movTimesArray[q].showtimes]);
    }
  },

  error: function(error) {
      console.log(error)
  }
});

//rt stuff
var requests = [
  {url: "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=d8sjemgp8m5mfpyam3cw5ea5&page_limit=50&page=1"},
  {url: "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=d8sjemgp8m5mfpyam3cw5ea5&page_limit=50&page=2"},
  {url: "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=d8sjemgp8m5mfpyam3cw5ea5&page_limit=50&page=3"},
  {url: "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=d8sjemgp8m5mfpyam3cw5ea5&page_limit=50&page=4"},
];

for (k = 0; k < requests.length; k++) {
  var movies = $.ajax({
    url: requests[k].url,
    data: requests[k].json,
    dataType: 'jsonp',
    success: function( json ) {
      successFun(json);
    },
    error: function(error) {
      console.log(error)
    }
  });
}

var moviesArray = [];
function successFun(data) {
  moviesArray.push.apply(moviesArray, data["movies"]);
}

function halfHour () {
  function moreMovies() {
    //combining
    for(var comArr = [], i=0; i<gnMovs.length; i++) {
      for(j=0; j<moviesArray.length; j++) {
        if (gnMovs[i][0] == moviesArray[j].title) {
          comArr.push([moviesArray[j].title, moviesArray[j].ratings.critics_score, gnMovs[i][1]]);
          var rateArray = [];
          function movSort () {
            for (l = 0; l < comArr.length; l++) {
              if(comArr[l][1] > 75) { 
                rateArray.push([comArr[l][0], comArr[l][1], comArr[l][2]]);
              }
            }
          }
          movSort();
          for (z=0; z<rateArray.length; z++) {
            $.each(rateArray, function(index, value) {
              for (n = 0; n < rateArray[index][2].length; n++) {
                document.getElementById("first_title").innerHTML = rateArray[z][0];
                document.getElementById("first_rating").innerHTML = rateArray[z][1];
                document.getElementById("first_theatre").innerHTML = rateArray[index][2][n].theatre.name;
                var fixDate = (rateArray[index][2][n].dateTime);
                dateConvert(fixDate);
                document.getElementById("first_showtime").innerHTML = complDate;
                var shTime = new Date(fixDate).getTime();
                //console.log(shTime);
                var prevMarg = (new Date().getTime() - (15*60000));
                //console.log(prevMarg);
                var halfHr = (new Date().getTime() + (30*60000));
                //console.log(halfHr);
                if (shTime > prevMarg && shTime < halfHr) {
                  //console.log(shTime);
                }
              }
            });
          }
        }
      }
    } 
  }       
  moreMovies();
}






