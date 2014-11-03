var tDay = new Date();
var yr = tDay.getFullYear();
var mon =  tDay.getMonth() + 1;
var day = tDay.getDate();

var dThirty = new Date();
dThirty.setMinutes(-210);
var isoDateThirty = dThirty.toISOString();
var thirtyComp = isoDateThirty.slice(0,16);
console.log(thirtyComp);

var dSixty = new Date();
dSixty.setMinutes(-180);
var isoDateSixty = dSixty.toISOString();
var sixtyComp = isoDateSixty.slice(0,16);
console.log(sixtyComp);

var dtwoHr = new Date();
dtwoHr.setMinutes(-120);
var isoDateTwoHr = dtwoHr.toISOString();
var twoHrComp = isoDateTwoHr.slice(0,16);
console.log(twoHrComp);

var dPreviews = new Date();
dPreviews.setMinutes(-225);
var isoDatePrevs = dPreviews.toISOString();
var prevComp = isoDatePrevs.slice(0,16);
console.log(prevComp);

//gracenote
var keyDateString = yr + "-" + mon + "-" + day;
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

console.log(gnMovs);

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

console.log(moviesArray);

//date format modifier for display

var complDate = 0;
function dateConvert (timeBase) {
  var twentyFour = timeBase.slice(11,13);
  var mins = timeBase.slice(14, 16);
  var dd = "AM";
  var twelveHr = 0;
  function normHr() {
    if (twentyFour > 12) {
      twelveHr = twentyFour - 12;
      dd = "PM";
      }
    if (twentyFour == 12) {
      twelveHr = 12;
      dd = "PM";
    }
   if (twentyFour == 0) {
          twelveHr = 12;
      }
  }
  normHr();
  complDate = twelveHr + ":" + mins + " " + dd;
}

//beginning of buttons

function halfHour() {
//var reset = document.getElementById("result_two");
//reset.innerHTML = " ";
  function moreMovies() {
    //combines two results
    for(var comArr = [], i = 0; i < gnMovs.length; i++) {
      for(j = 0; j < moviesArray.length; j++) {
        if (gnMovs[i][0] == moviesArray[j].title) {
          comArr.push([moviesArray[j].title, moviesArray[j].ratings.critics_score, gnMovs[i][1], moviesArray[j].links.alternate]);
          var rateArray = [];
          function movSort() {
            for (l = 0; l < comArr.length; l++) {
              if(comArr[l][1] > 50) { 
                rateArray.push([comArr[l][0], comArr[l][1], comArr[l][2], comArr[l][3]]);
              }
            }
          }
          movSort();
          
          $.each(rateArray, function(index, value) {
            for (n = 0; n < rateArray[index][2].length; n++) {
              if (rateArray[index][2][n].dateTime < thirtyComp && rateArray[index][2][n].dateTime > prevComp) {
                var fixDate = rateArray[index][2][n].dateTime;
                dateConvert(fixDate);
                var target = document.getElementById("result_one");
                var iDiv = document.createElement("div");
                //iDiv.innerHTML = " ";
                iDiv.id = n;
                iDiv.innerHTML = "<a href='" + rateArray[index][3] + "'>" + rateArray[index][0] + "</a>" + "," + " " + "rating:" + " " + rateArray[index][1] + "," + " " + "theatre:" + " " + rateArray[index][2][n].theatre.name + "," + " " + "showtime:" + " " + complDate;
                target.appendChild(iDiv);
              }
            }
          });
        }
      }
    }
  }       
  moreMovies();
}

function hour() {
  function moreMovies() {
    //combining
    for(var comArr = [], i = 0; i < gnMovs.length; i++) {
      for(j = 0; j < moviesArray.length; j++) {
        if (gnMovs[i][0] == moviesArray[j].title) {
          comArr.push([moviesArray[j].title, moviesArray[j].ratings.critics_score, gnMovs[i][1], moviesArray[j].links.alternate]);
          var rateArray = [];
          function movSort() {
            for (l = 0; l < comArr.length; l++) {
              if(comArr[l][1] > 40) { 
                rateArray.push([comArr[l][0], comArr[l][1], comArr[l][2], comArr[l][3]]);
              }
            }
          }
          movSort();
          
          $.each(rateArray, function(index, value) {
            for (n = 0; n < rateArray[index][2].length; n++) {
              if (rateArray[index][2][n].dateTime < sixtyComp && rateArray[index][2][n].dateTime > prevComp) {
                var fixDate = rateArray[index][2][n].dateTime;
                dateConvert(fixDate);
                var target = document.getElementById("result_two");
                  var iDiv = document.createElement("div");
                  //iDiv.innerHTML = " ";
                  iDiv.id = n;
                  iDiv.innerHTML = "<a href='" + rateArray[index][3] + "'>" + rateArray[index][0] + "</a>" + "," + " " + "rating:" + " " + rateArray[index][1] + "," + " " + "theatre:" + " " + rateArray[index][2][n].theatre.name + "," + " " + "showtime:" + " " + complDate;
                  target.appendChild(iDiv);
              }
            }
          });
        }
      }
    }
  }       
  moreMovies();
}


function twoHour() {
  function moreMovies() {
    //combining
    for(var comArr = [], i = 0; i < gnMovs.length; i++) {
      for(j = 0; j < moviesArray.length; j++) {
        if (gnMovs[i][0] == moviesArray[j].title) {
          comArr.push([moviesArray[j].title, moviesArray[j].ratings.critics_score, gnMovs[i][1], moviesArray[j].links.alternate]);
          var rateArray = [];
          function movSort() {
            for (l = 0; l < comArr.length; l++) {
              if(comArr[l][1] > 80) { 
                rateArray.push([comArr[l][0], comArr[l][1], comArr[l][2], comArr[l][3]]);
              }
            }
          }
          movSort();

          console.log(rateArray);
          
          var compArr = [];
          $.each(rateArray, function(index, value) {
            for (n = 0; n < rateArray[index][2].length; n++) {
              if (rateArray[index][2][n].dateTime < twoHrComp && rateArray[index][2][n].dateTime > prevComp) {
                var fixDate = rateArray[index][2][n].dateTime;
                dateConvert(fixDate);
                var target = document.getElementById("result_one");
                  var iDiv = document.createElement("div");
                  iDiv.innerHTML = " ";
                  iDiv.id = n;
                  iDiv.innerHTML = "<a href='" + rateArray[index][3] + "'>" + rateArray[index][0] + "</a>" + "," + " " + "rating:" + " " + rateArray[index][1] + "," + " " + "theatre:" + " " + rateArray[index][2][n].theatre.name + "," + " " + "showtime:" + " " + complDate;
                  target.appendChild(iDiv);
              }
            }
          });
        }
      }
    }
  }       
  moreMovies();
}
