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

var dThirty = new Date();
//dThirty.setMinutes(-210); -this is correct, resetting since it's too early now
dThirty.setMinutes(-40);
var isoDateThirty = dThirty.toISOString();
console.log(isoDateThirty);
var thirtyComp = isoDateThirty.slice(0,16);
console.log(thirtyComp);

var dPreviews = new Date();
dPreviews.setMinutes(-255);
var isoDatePrevs = dPreviews.toISOString();
console.log(isoDatePrevs);

var prevComp = isoDatePrevs.slice(0,16);
console.log(prevComp);

//gracenote
var keyDateString = y + "-" + m + "-" + d;
var urlDate = "http://data.tmsapi.com/v1/movies/showings?startDate=" + keyDateString + "&zip=10003&radius=1&api_key=sjesnpx2uhtyac5frfhzfedb";

 $(document).ready(function(){
   });

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

//rottentomatoes
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

//date format modifier for display
var complDate = 0;
function dateConvert (timeBase) {
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
  complDate = twelveHr + ":" + mins + " " + dd;
  }

function halfHour () {
  function moreMovies() {
    //combining
    //console.log(moviesArray);

    for(var comArr = [], i=0; i<gnMovs.length; i++) {
      for(j=0; j<moviesArray.length; j++) {
        if (gnMovs[i][0] == moviesArray[j].title) {
          comArr.push([moviesArray[j].title, moviesArray[j].ratings.critics_score, gnMovs[i][1], moviesArray[j].links.alternate]);
          var rateArray = [];
          function movSort () {
            for (l = 0; l < comArr.length; l++) {
              if(comArr[l][1] > 75) { 
                rateArray.push([comArr[l][0], comArr[l][1], comArr[l][2], comArr[l][3]]);
              }
            }
          }
          movSort();

          var compArr = [];
          $.each(rateArray, function(index, value) {
            if ((rateArray[index][2][0].dateTime) < thirtyComp && (rateArray[index][2][0].dateTime) > prevComp) {
              console.log("hi!")
              compArr.push([rateArray[index][0], rateArray[index][1], rateArray[index][2][0].dateTime, rateArray[index][2][0].theatre.name, rateArray[index][3]]);
            }
          });

        console.log(compArr);

        var uniqueNames = [];
        for (h=0; h<compArr.length; h++) {  
          if ($.inArray(compArr[h][0], uniqueNames) === -1)
            console.log(compArr[h][0]);
            uniqueNames.push([compArr[h][0], compArr[h][1], compArr[h][2], compArr[h][3], compArr[h][4]]);
        }
      console.log(uniqueNames);

      function find_duplicates(someArr) {
      var len=someArr.length,
          out=[],
          counts={};

      for (var i=0;i<len;i++) {
        var item = someArr[i];
        var count = counts[item];
        counts[item] = counts[item] >= 1 ? counts[item] + 1 : 1;
      }

      for (var item in counts) {
        if(counts[item] > 1) continue;
          out.push(item);
      }

      console.log(out);
      }

      find_duplicates(compArr);



/*                  compArr.sort(function (a, b) {
                  if (a["1"] > b["1"]) {
                    return a - b;
                  }
                  //  if (a.1 < b.1) {
                  //    return b - a;
                  // }
                  // // // a must be equal to b
                  // return 0;
                });*/
          }
        }
      }
    }       
  moreMovies();
}

          /*for (z=0; z<rateArray.length; z++) {
            $.each(rateArray, function(index, value) {
              for (n = 0; n < rateArray[index][2].length; n++) {
                //console.log(rateArray[index][2][n].dateTime);

                var fixDate = (rateArray[index][2][n].dateTime);
                //dateConvert(fixDate);

                var shTime = new Date(fixDate).getTime();
                console.log(shTime);
                  var compArr = [];

                 //if (shTime > new Date().getTime() && shTime < halfHr) {
                   //compArr.push(rateArray[index][0], rateArray[index][1], rateArray[index][2][n].dateTime);
                //console.log(compArr);
                 //}
                console.log(compArr);
*/

/*                document.getElementById("first_title").innerHTML = rateArray[z][0];
                document.getElementById("first_rating").innerHTML = rateArray[z][1];
                document.getElementById("first_theatre").innerHTML = rateArray[index][2][n].theatre.name;
                var fixDate = (rateArray[index][2][n].dateTime);
                dateConvert(fixDate);
                document.getElementById("first_showtime").innerHTML = complDate;*/









