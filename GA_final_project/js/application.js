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

*/




//need http://data.tmsapi.com/v1/movies/showings?startDate=2014-10-22&lat=41&lng=-74&api_key=sjesnpx2uhtyac5frfhzfedb


//date stuff
//var movArray = [];
var movTimesArray = [];

var d = new Date();
var y = d.getFullYear();
var m =  d.getMonth() + 1;
var dd = d.getDate();
var h = d.getHours();
var mi = d.getMinutes();

var dateString = y + "-" + m + "-" + dd + "T" + h + ":" + mi;

var keyDateString = y + "-" + m + "-" + dd;
var urlDate = "http://data.tmsapi.com/v1/movies/showings?startDate=" + keyDateString + "&zip=10003" + "&api_key=sjesnpx2uhtyac5frfhzfedb";
console.log(urlDate);

function halfHour () {
 
//ajax for gracenote
  var movieTimes = $.ajax({
    url: urlDate,
    dataType: 'json',
    success: function(json) {
      movTimesArray = movieTimes.responseJSON;

var myMovTimes = [];
      for(q=0; q<movTimesArray.length; q++) {
        myMovTimes.push(movTimesArray[q].showtimes);
      }
     var myMovName = [];
        for(z=0; z<movTimesArray.length; z++) {
                  myMovName.push(movTimesArray[z].title);
        } 

              //for(var myMovTimes = [], i=0; i<movTimesArray.length; i++) {
//, movTimesArray[i].showtimes]);
        //displays dateTime: "2014-10-20T16:45" 
            console.log(myMovTimes);
            console.log(myMovName);

      }
            //console.log(globMovTimes);

 
  });


//rt stuff
    var requests = [
      {url: "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=d8sjemgp8m5mfpyam3cw5ea5&page_limit=50&page=1"},
      {url: "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=d8sjemgp8m5mfpyam3cw5ea5&page_limit=50&page=2"},
      {url: "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=d8sjemgp8m5mfpyam3cw5ea5&page_limit=50&page=3"},
      {url: "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=d8sjemgp8m5mfpyam3cw5ea5&page_limit=50&page=4"},
      //{url: "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=d8sjemgp8m5mfpyam3cw5ea5&page_limit=50&page=5"}
    ];


    
    //var successHandler = function (jsonp) {
      //var movArray = [];
      //movArray = movies.responseJSON.movies;
      //for(var innerMov = [], j=0; j<movArray.length; j++) {  
        //innerMov.push([movArray[j].title, movArray[j].ratings.critics_score, movArray[j].ratings.audience_score]);
      //}
        //rtTitlArr.push(innerMov);
        //console.log(rtTitlArr);
    //}

for (k = 0; k< requests.length; k++) {
  var movies = $.ajax({
    url: requests[k].url,
    data: requests[k].json,
    dataType: 'jsonp',
    success: function( json ) {
      //console.log(json); 
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
  //console.log("movies ", moviesArray);
//}

//var rtTitlArr = [];

var innerMov = [];
function moreMovies(getRating) {
for(j=0; j<moviesArray.length; j++) {  
  innerMov.push([moviesArray[j].title, moviesArray[j].ratings.critics_score, moviesArray[j].ratings.audience_score]);
            console.log(innerMov);
      }
            //console.log(innerMov);
    }
    moreMovies();
      //rtTitlArr.push(innerMov);
        //console.log(rtTitlArr);
}

}


/*
to combine results of 2 apis

      for(var comTitlArr = [], i=0; i<globMovTimes.length; i++) {
        for(j=0; j<rtTitlArr.length; j++) {
          if (globMovTimes[i][0] == rtTitlArr[j][0]) {
           comTitlArr.push([rtTitlArr[j][0], rtTitlArr[j][1], globMovTimes[i][1]]);
         }
       }
      };

      console.log(rtTitlArr[0][0]);
      //return rtTitlArr;
      console.log(comTitlArr);
     
        //movArray[i].links.alternate is links to reviews
*/
/*
    },

    error: function(e) {
      console.log(e.message);
    },


 });

  //console.log(globMovTimes);

}
*/


//document.getElementById("result1").innerHTML = globMovArr;

/*function geoFindMe() {
  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log(latitude);
    outsideGeo(latitude);
  };

  function error() {
    console.log('error');
  };
  navigator.geolocation.getCurrentPosition(success, error);
}

geoFindMe();


function outsideGeo(point) {
  console.log(point);
}*/
