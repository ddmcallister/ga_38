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

var d = new Date();
var y = d.getFullYear();
var m =  d.getMonth() + 1;
var dd = d.getDate();
var h = d.getHours();
var mi = d.getMinutes();


var dateString = y + "-" + m + "-" + dd + "T" + h + ":" + (mi);
var dateStringPreviews = y + "-" + m + "-" + dd + "T" + h + ":" + (mi - 15);

var keyDateString = y + "-" + m + "-" + dd;
var urlDate = "http://data.tmsapi.com/v1/movies/showings?startDate=" + keyDateString + "&zip=10003&radius=1" + "&api_key=sjesnpx2uhtyac5frfhzfedb";

function halfHour () {
  //gracenote stuff
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
    //var inThirty = [];
      function moreMovies() {
          //combining
          for(var comArr = [], i=0; i<gnMovs.length; i++) {
            for(j=0; j<moviesArray.length; j++) {
              if (gnMovs[i][0] == moviesArray[j].title) {
                comArr.push([moviesArray[j].title, moviesArray[j].ratings.critics_score, gnMovs[i][1]]);
              //console.log(comArr);
              var rateArray = [];
              function movSort () {
                for (l = 0; l < comArr.length; l++) {
                  if(comArr[l][1] > 75) { 
                    rateArray.push([comArr[l][0], comArr[l][1], comArr[l][2]]);
                    }
                }
              }
                movSort();
                console.log(rateArray);
                $.each(rateArray, function(index, value) {
                  if (new Date(rateArray[index][2][0].dateTime) < new Date()) {
                    console.log("hi!")
                    document.getElementById("result1").innerHTML = rateArray[index] + rateArray[index][2] + rateArray[index][2][0] +  rateArray[index][2].dateTime;
                  }
                });

            }
            }
          } 
      }       
      moreMovies();

}
}
        //document.getElementById("result1").innerHTML = ;





