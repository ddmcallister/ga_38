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
  var urlDate = dateInc + myLoc + "&radius=3&api_key=sjesnpx2uhtyac5frfhzfedb";
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
  console.log(gnMovs);

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
var thirtyPrevComp = changeTime(15);
var sixtyComp = changeTime(60);
var sixtyPrevComp = changeTime(45);
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
console.log(rtMovs);
//date format modifier for display
var complDate = 0;
function dateConvert (timeBase) {
  var twentyFour = timeBase.slice(11,13);
  var mins = timeBase.slice(14, 16);
  var dd = "AM";
  var twelveHr;
  function normHr() {
    if (twentyFour > 12) {
      twelveHr = twentyFour - 12;
      dd = "PM";
      }
    if (twentyFour < 12) {
      twelveHr = twentyFour;
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

//combining, 'else if' covers movies shortened to 1st word (e.g. "Birdman")
var combArr = [];
function bothArr(){
  for(j = 0; j < rtMovs.length; j++) {
    for(i = 0; i < gnMovs.length; i++) {
      var regExA = gnMovs[i][0].match(/^.+\s?/);
      var regExB = gnMovs[i][0].match(/^\w+\b/);
      if (regExA == rtMovs[j].title) {
        combArr.push([rtMovs[j].title, rtMovs[j].ratings.critics_score, gnMovs[i][1], rtMovs[j].links.alternate]);
      } else if (regExB == rtMovs[j].title) {
        combArr.push([rtMovs[j].title, rtMovs[j].ratings.critics_score, gnMovs[i][1], rtMovs[j].links.alternate]);
      }
    }
  }
}

//setting rating parameters
var rateArray = [];
function setRate(number) {
  for (l = 0; l < combArr.length; l++) {
    if(combArr[l][1] > number) { 
      rateArray.push([combArr[l][0], combArr[l][1], combArr[l][2], combArr[l][3]]);
    }      
  }
}

//establishing time, getting results on page

function onPage(timeOne, timeTwo) {

  var dupElim = _.uniq(rateArray, JSON.stringify);

  var writeArr = [];
  var timesArray = [];

  $.each(dupElim, function(index, value) {
    var target = document.getElementById("result_one");
    var initDiv = document.createElement("div");
    initDiv.className = "liveMovies";
    var divTwo = document.createElement("div");
    divTwo.innerHTML = "";
    for (n = 0; n < dupElim[index][2].length; n++) {
      if (dupElim[index][2][n].dateTime < timeOne && dupElim[index][2][n].dateTime > timeTwo) {
        writeArr.push(dupElim[index][0]);
        var dupElimTwo = _.uniq(writeArr, JSON.stringify);
        var fixDate = dupElim[index][2][n].dateTime;
        dateConvert(fixDate);
        timesArray.push(complDate);
        for (x=0; x<dupElimTwo.length; x++) {
          initDiv.innerHTML = "<a href='" + dupElim[index][3] + "'>" + dupElimTwo[x] + "</a>" + " " + dupElim[index][1];
          target.appendChild(initDiv);
        }
        initDiv.appendChild(divTwo);     
        for (h=0; h<timesArray.length; h++) {
          var h = document.createElement("div");
          h.innerHTML = dupElim[index][2][n].theatre.name + "," + " " + complDate;
          divTwo.appendChild(h);
        }
      }
    }
  });
}

function halfHour() { 
  var target = document.getElementById("result_one");
  if (target.innerHTML != "") {
    target.innerHTML = "";
  }
  bothArr();
  setRate(75);
  onPage(thirtyComp, prevComp);
}

function hour() {  
  var target = document.getElementById("result_one");
  if (target.innerHTML != "") {
    target.innerHTML = "";
  }
  bothArr();
  setRate(75);
  onPage(sixtyComp, thirtyPrevComp);
}

function twoHour() {  
  var target = document.getElementById("result_one");
  if (target.innerHTML != "") {
    target.innerHTML = "";
  }
  bothArr();
  setRate(75);
  onPage(twoHrComp, sixtyPrevComp);        
}

function yrOnPage(timeOne, timeTwo) {

  var dupElim = _.uniq(rateArray, JSON.stringify);

  var writeArr = [];
  var timesArray = [];

  $.each(dupElim, function(index, value) {
    var target = document.getElementById("yr_result_one");
    var yrInitDiv = document.createElement("div");
    yrInitDiv.className = "liveMovies";
    var yrDivTwo = document.createElement("div");
    yrDivTwo.innerHTML = "";
    for (n = 0; n < dupElim[index][2].length; n++) {
      if (dupElim[index][2][n].dateTime < timeOne && dupElim[index][2][n].dateTime > timeTwo) {
        writeArr.push(dupElim[index][0]);
        var dupElimTwo = _.uniq(writeArr, JSON.stringify);
        var fixDate = dupElim[index][2][n].dateTime;
        dateConvert(fixDate);
        timesArray.push(complDate);
        for (x=0; x<dupElimTwo.length; x++) {
          yrInitDiv.innerHTML = "<a href='" + dupElim[index][3] + "'>" + dupElimTwo[x] + "</a>" + " " + dupElim[index][1];
          target.appendChild(yrInitDiv);
        }
        yrInitDiv.appendChild(yrDivTwo);     
        for (h=0; h<timesArray.length; h++) {
          var h = document.createElement("div");
          h.innerHTML = dupElim[index][2][n].theatre.name + "," + " " + complDate;
          yrDivTwo.appendChild(h);
        }
      }
    }
  });
}

function userPick () {
  rateArray =[]; 
  var userNum = prompt("Choose a minimum rating (1-74)");
  setRate(userNum);
}

function yrPickHalfHour() {
  var target = document.getElementById("yr_result_one");
  if (target.innerHTML != "") {
    target.innerHTML = "";
  }
  bothArr();
  userPick();
  yrOnPage(thirtyComp, prevComp);
}

function yrPickHour() {
  var target = document.getElementById("yr_result_one");
  if (target.innerHTML != "") {
    target.innerHTML = "";
  }
  bothArr();
  userPick();
  yrOnPage(sixtyComp, thirtyPrevComp);
}

function yrPickTwoHour() {
  var target = document.getElementById("yr_result_one");
  if (target.innerHTML != "") {
    target.innerHTML = "";
  }
  bothArr();
  userPick();
  yrOnPage(twoHrComp, sixtyPrevComp);
}






