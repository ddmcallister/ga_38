var tDay = new Date();
var yr = tDay.getFullYear();
var mon =  tDay.getMonth() + 1;
var day = tDay.getDate();

var dThirty = new Date();
dThirty.setMinutes(-210);
var isoDateThirty = dThirty.toISOString();
var thirtyComp = isoDateThirty.slice(0,16);

var dSixty = new Date();
dSixty.setMinutes(+840);
var isoDateSixty = dSixty.toISOString();
var sixtyComp = isoDateSixty.slice(0,16);

var dtwoHr = new Date();
dtwoHr.setMinutes(+840);
//-120
var isoDateTwoHr = dtwoHr.toISOString();
var twoHrComp = isoDateTwoHr.slice(0,16);
console.log(twoHrComp);

var dPreviews = new Date();
dPreviews.setMinutes(+720);
//-255
var isoDatePrevs = dPreviews.toISOString();
var prevComp = isoDatePrevs.slice(0,16);
console.log(prevComp);

//gracenote
var keyDateString = yr + "-" + mon + "-" + day;
//var urlDate = "http://data.tmsapi.com/v1/movies/showings?startDate=" + keyDateString + "&zip=10003&radius=1&api_key=sjesnpx2uhtyac5frfhzfedb";
var urlDate = "http://data.tmsapi.com/v1/movies/showings?startDate=2014-10-28&zip=10003&radius=1&api_key=sjesnpx2uhtyac5frfhzfedb";
/* $(document).ready(function(){
   });*/

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
    if (twentyFour >= 12) {
      twelveHr = twentyFour - 12;
      dd = "PM";
      } else if (twentyFour == 0) {
          twelveHr = 12;
          var dd = "AM";
      }
  }
  normHr();
  complDate = twelveHr + ":" + mins + " " + dd;
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
              if(comArr[l][1] > 75) { 
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
                  iDiv.id = n;
                  iDiv.innerHTML = "title:" + " " + rateArray[index][0] + "," + " " + "rating:" + " " + rateArray[index][1] + "," + " " + "theatre:" + " " + rateArray[index][2][n].theatre.name + "," + " " + "showtime:" + complDate;
                  target.appendChild(iDiv);

/*                document.getElementById("first_rating").innerHTML = compArr[0][1];
                document.getElementById("first_theatre").innerHTML = compArr[0][3];
                var fixDate = (compArr[0][2]);
                dateConvert(fixDate);
                document.getElementById("first_showtime").innerHTML = complDate;*/

                //compArr.push([rateArray[index][0], rateArray[index][1], rateArray[index][2][n].dateTime, rateArray[index][2][n].theatre.name, rateArray[index][3]]);
              }
              //console.log(compArr);
              // var strEmUp = compArr.toString();
              // console.log(strEmUp);
            }
          });
        }
      }
    }
  }       
  moreMovies();
}

/*function toDoc() {
  var target = document.getElementById('result_one');
    var startPos = document.getElementsByClassName("thumbnail");
    var z;
    var arrThumbnail = []; // You forgot a closing semicolon
    for (var z = startPos.length; z--; arrThumbnail.unshift(startPos[z])); {
      var i = foo.src;
            // Nice use of regular expressions
      var ba = i.replace(/^.*[\\\/]/, '');
      var r = ba.replace(".jpg", '');
      if(r == 23){
            r = 0;
            var img = document.getElementById('mainImg');
            img.src = 'img/0.jpg';
          }
      else {
          r++;
          newVar = "img/" + r + ".jpg";
          var img = document.getElementById('mainImg');
          img.src = newVar;}
          }
  }*/



/*function helpFunction(someArray) {
  for(g=0; g < 6; g++) {
    var displayTime = document.getElementByID("second_title");
    displayTime.innerhtml = someArray[g][0];
  }
}
helpFunction(compArr);*/

// var newText = document.createTextNode("here is a test line");

// myDiv.appendChild(newText);

            

                /*document.getElementById("first_title").innerHTML = compArr[0][0];
                document.getElementById("first_rating").innerHTML = compArr[0][1];
                document.getElementById("first_theatre").innerHTML = compArr[0][3];
                var fixDate = (compArr[0][2]);
                dateConvert(fixDate);
                document.getElementById("first_showtime").innerHTML = complDate;

                document.getElementById("second_title").innerHTML = compArr[2][0];
                document.getElementById("second_rating").innerHTML = compArr[2][1];
                document.getElementById("second_theatre").innerHTML = compArr[2][3];
                var fixDate = (compArr[2][2]);
                dateConvert(fixDate);
                document.getElementById("second_showtime").innerHTML = complDate;

                document.getElementById("third_title").innerHTML = compArr[4][0];
                document.getElementById("third_rating").innerHTML = compArr[4][1];
                document.getElementById("third_theatre").innerHTML = compArr[4][3];
                var fixDate = (compArr[4][2]);
                dateConvert(fixDate);
                document.getElementById("third_showtime").innerHTML = complDate;

                document.getElementById("fourth_title").innerHTML = compArr[6][0];
                document.getElementById("fourth_rating").innerHTML = compArr[6][1];
                document.getElementById("fourth_theatre").innerHTML = compArr[6][3];
                var fixDate = (compArr[6][2]);
                dateConvert(fixDate);
                document.getElementById("fourth_showtime").innerHTML = complDate;

                document.getElementById("fifth_title").innerHTML = compArr[8][0];
                document.getElementById("fifth_rating").innerHTML = compArr[8][1];
                document.getElementById("fifth_theatre").innerHTML = compArr[8][3];
                var fixDate = (compArr[8][2]);
                dateConvert(fixDate);
                document.getElementById("fifth_showtime").innerHTML = complDate;*/

//below works, repeats a million times to fill up the div
//var newText = document.createTextNode("here is a test line");
//var myDiv = document.getElementById("result_one");
//myDiv.appendChild(newText);


  /*var resultDivs = document.createElement("div");
  resultDivs.id = "first_title";
  resultDivs.className = "movies";
  resultDivs.innerHTML = compArr[0][0];
  var origDiv = document.getElementById("result_1");
  origDiv.appendChild(resultDivs); */


/*                document.getElementById("first_title").innerHTML = compArr[0][0];
                document.getElementById("first_rating").innerHTML = compArr[0][1];
                document.getElementById("first_theatre").innerHTML = compArr[0][3];
                var fixDate = (compArr[0][2]);
                dateConvert(fixDate);
                document.getElementById("first_showtime").innerHTML = complDate;

function appendRes(someArr) {
 /* resultDivs.id = "first_title";
  resultDivs.className = "movies";
  resultDivs.innerHTML = someArr[0][0];
  var origDiv = document.getElementById("result_1");
  origDiv.appendChild(resultDivs); 

                  document.getElementById("second_title").innerHTML = someArr[0][0];
                document.getElementById("second_rating").innerHTML = someArr[0][1];
                document.getElementById("second_theatre").innerHTML = someArr[0][3];
                var fixDate = (someArr[0][2]);
                dateConvert(fixDate);
                document.getElementById("second_showtime").innerHTML = complDate;

                document.getElementById("third_title").innerHTML = compArr[4][0];
                document.getElementById("third_rating").innerHTML = compArr[4][1];
                document.getElementById("third_theatre").innerHTML = compArr[4][3];
                var fixDate = (compArr[4][2]);
                dateConvert(fixDate);
                document.getElementById("third_showtime").innerHTML = complDate;

/*
    var resultDivs = document.createElement("div");
  resultDivs.id = "first_title";
  resultDivs.className = "movies";
  resultDivs.innerHTML = compArr[0][0];
  var origDiv = document.getElementById("result_1");
  origDiv.appendChild(resultDivs);*/

//appendRes(compArr);

/*function appendRes(someArr) {
 var resultDivs = document.createElement("div");
  resultDivs.id = "first_title";
  resultDivs.className = "movies";
  resultDivs.innerHTML = someArr[0][0];
  var origDiv = document.getElementById("result_1");
  origDiv.appendChild(resultDivs); 
}*/
