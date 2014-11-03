//geolocator
if ("geolocation" in navigator) {
  console.log("geolocation is available");
  } else {
  console.log("geolocation IS NOT available");
}

var output = document.getElementById("result_two");

if (!navigator.geolocation){
  output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
}

function geoFindMe() {
  function success(position) {
    var myLoc  = "lat=" + Math.round((position.coords.latitude + 0.00001) * 100) / 100  + "&lng=" + Math.round((position.coords.longitude + 0.00001) * 100) / 100;
    outsideGeo(myLoc);
  };
  function error() {
    console.log('error');
  };
  navigator.geolocation.getCurrentPosition(success, error);
}
geoFindMe();

//to get date for gracenote keystring
var tDay = new Date();
var yr = tDay.getFullYear();
var mon =  tDay.getMonth() + 1;
var day = tDay.getDate();

var keyDateString = yr + "-" + mon + "-" + day;
var dateInc = "http://data.tmsapi.com/v1/movies/showings?startDate=" + keyDateString + "&";

//gracenote
function outsideGeo(myLoc) {
  var urlDate = dateInc + myLoc + "&radius=2&api_key=sjesnpx2uhtyac5frfhzfedb";
  if (Boolean(myLoc) === true) {
     $(document).ready(function(){
     }); 
    var movieTimes = $.ajax({
      url: urlDate,
      dataType: 'json',
      success: function(json) {
        successGn(json); 
      },

      error: function(error) {
          console.log(error);
      }
    });
  }
}
outsideGeo();

var gnMovs = [];
function successGn(data) {
  var movTimesArray = data;
    for(q = 0; q < movTimesArray.length; q++) {
    gnMovs.push([movTimesArray[q].title, movTimesArray[q].showtimes]);
    }
  }

//to get date for comparisons
var zoneSet = new Date();
zoneSet.setUTCHours(zoneSet.getUTCHours() - 5);

function changeTime(minutes) {
  var addMins = zoneSet.valueOf() + minutes*60000; 
  var unNum = new Date(addMins);
  var isoDate = unNum.toISOString();
  var isoComp = isoDate.slice(0,16);
  return isoComp;
}

var thirtyComp = changeTime(30);
console.log(thirtyComp);
var sixtyComp = changeTime(60);
var twoHrComp = changeTime(120);
var prevComp = changeTime(-15);

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

var rtMovs = [];
function successFun(data) {
  rtMovs.push.apply(rtMovs, data["movies"]);
}

//date format modifier for display
var complDate = 0;
function dateConvert (timeBase) {
  var twentyFour = timeBase.slice(11,13);
  console.log(twentyFour);
  var mins = timeBase.slice(14, 16);
  var dd = "AM";
  var twelveHr;
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
    complDate = twelveHr + ":" + mins + " " + dd;
  }
  normHr();
}

function halfHour() { 

  //clearing results in case button already clicked
  var target = document.getElementById("result_one");
  target.innerHTML = " "; 

  //combining
  var combArr = [];
    for(j = 0; j < rtMovs.length; j++) {
      for(i = 0; i < gnMovs.length; i++) {
        if (gnMovs[i][0] == rtMovs[j].title) {
          combArr.push([rtMovs[j].title, rtMovs[j].ratings.critics_score, gnMovs[i][1], rtMovs[j].links.alternate]);
        }  
      }
    }

  //eliminating low-rating movies
  var rateArray = [];
    for (l = 0; l < combArr.length; l++) {
      if(combArr[l][1] > 75) { 
          rateArray.push([combArr[l][0], combArr[l][1], combArr[l][2], combArr[l][3]]);
        }      
      }

  //eliminating duplicate results        
  var dupElim = _.uniq(rateArray, JSON.stringify);

  //writing to page
  $.each(dupElim, function(index, value) {
    for (n = 0; n < dupElim[index][2].length; n++) {
      if (dupElim[index][2][n].dateTime < thirtyComp && dupElim[index][2][n].dateTime > prevComp) {
        var fixDate = dupElim[index][2][n].dateTime;
        dateConvert(fixDate);
        var target = document.getElementById("result_one");
        var iDiv = document.createElement("div");
        iDiv.className = "liveMovies";
        iDiv.innerHTML = "<a href='" + dupElim[index][3] + "'>" + dupElim[index][0] + "</a>" + "," + " " + "rating:" + " " + dupElim[index][1] + "," + " " + "theatre:" + " " + dupElim[index][2][n].theatre.name + "," + " " + "showtime:" + " " + complDate;
        target.appendChild(iDiv);
      }
    }
  });
}

//repeating for other time selections
function hour() {  

  var target = document.getElementById("result_one");
  target.innerHTML = " ";
  
  var combArr = [];
    for(j = 0; j < rtMovs.length; j++) {
      for(i = 0; i < gnMovs.length; i++) {
        if (gnMovs[i][0] == rtMovs[j].title) {
          combArr.push([rtMovs[j].title, rtMovs[j].ratings.critics_score, gnMovs[i][1], rtMovs[j].links.alternate]);
        }  
      }
    }

  var rateArray = [];
    for (l = 0; l < combArr.length; l++) {
      if(combArr[l][1] > 75) { 
          rateArray.push([combArr[l][0], combArr[l][1], combArr[l][2], combArr[l][3]]);
        }      
      }

  var dupElim = _.uniq(rateArray, JSON.stringify);

  $.each(dupElim, function(index, value) {
    for (n = 0; n < dupElim[index][2].length; n++) {
      if (dupElim[index][2][n].dateTime < sixtyComp && dupElim[index][2][n].dateTime > prevComp) {
        var fixDate = dupElim[index][2][n].dateTime;
        dateConvert(fixDate);
        var target = document.getElementById("result_one");
        var iDiv = document.createElement("div");
        iDiv.className = "liveMovies";
        iDiv.innerHTML = "<a href='" + dupElim[index][3] + "'>" + dupElim[index][0] + "</a>" + "," + " " + "rating:" + " " + dupElim[index][1] + "," + " " + "theatre:" + " " + dupElim[index][2][n].theatre.name + "," + " " + "showtime:" + " " + complDate;
        target.appendChild(iDiv);
      }
    }
  });
}


function twoHour() {  

  var target = document.getElementById("result_one");
  target.innerHTML = " ";

  var combArr = [];
    for(j = 0; j < rtMovs.length; j++) {
      for(i = 0; i < gnMovs.length; i++) {
        if (gnMovs[i][0] == rtMovs[j].title) {
          combArr.push([rtMovs[j].title, rtMovs[j].ratings.critics_score, gnMovs[i][1], rtMovs[j].links.alternate]);
        }  
      }
    }

  var rateArray = [];
    for (l = 0; l < combArr.length; l++) {
      if(combArr[l][1] > 75) { 
          rateArray.push([combArr[l][0], combArr[l][1], combArr[l][2], combArr[l][3]]);
        }      
      }

  var dupElim = _.uniq(rateArray, JSON.stringify);

  $.each(dupElim, function(index, value) {
    for (n = 0; n < dupElim[index][2].length; n++) {
      if (dupElim[index][2][n].dateTime < twoHrComp && dupElim[index][2][n].dateTime > prevComp) {
        var fixDate = dupElim[index][2][n].dateTime;
        dateConvert(fixDate);
        var iDiv = document.createElement("div");
        iDiv.className = "liveMovies";
        iDiv.innerHTML = "<a href='" + dupElim[index][3] + "'>" + dupElim[index][0] + "</a>" + "," + " " + "rating:" + " " + dupElim[index][1] + "," + " " + "theatre:" + " " + dupElim[index][2][n].theatre.name + "," + " " + "showtime:" + " " + complDate;
        target.appendChild(iDiv);
      }
    }
  });
}






