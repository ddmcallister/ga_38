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
var urlDate = "http://data.tmsapi.com/v1/movies/showings?startDate=" + keyDateString + "&zip=10128&api_key=sjesnpx2uhtyac5frfhzfedb";

function halfHour () {
 
  /*var movieTimes = $.ajax({
    url: urlDate,
    dataType: 'json',
    success: function(json) {
      movTimesArray = movieTimes.responseJSON;
      for(var globMovTimes = [], i=0; i<movTimesArray.length; i++) {
        globMovTimes.push([movTimesArray[i].title, movTimesArray[i].showtimes]); 
        //displays dateTime: "2014-10-20T16:45" 
      }
*/
    var requests = [
      {url: "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=d8sjemgp8m5mfpyam3cw5ea5&page_limit=50&page=1"},
      {url: "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=d8sjemgp8m5mfpyam3cw5ea5&page_limit=50&page=2"},
      {url: "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=d8sjemgp8m5mfpyam3cw5ea5&page_limit=50&page=3"},
      {url: "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=d8sjemgp8m5mfpyam3cw5ea5&page_limit=50&page=4"},
      //{url: "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=d8sjemgp8m5mfpyam3cw5ea5&page_limit=50&page=5"}
    ];

    //var rtTitlArr = [];
    
    /*var successHandler = function (jsonp) {
      var movArray = [];
      movArray = movies.responseJSON.movies;
      for(var innerMov = [], j=0; j<movArray.length; j++) {  
        innerMov.push([movArray[j].title, movArray[j].ratings.critics_score, movArray[j].ratings.audience_score]);
      }
        rtTitlArr.push(innerMov);
        //return;
        console.log(rtTitlArr);
    }*/

for (k = 0; k< requests.length; k++) {
  var movies = $.ajax({
    url: requests[k].url,
    data: requests[k].json,
    dataType: 'jsonp',
    //success: successFun,
    error: console.log("test3")
    });
}

for(i=0; i<requests.length; i++) {    
  (function successFun(y) {
    movArray = [];
    movArray.push(movies)[i] + y;
    return;
  }) ()
  console.log(movArray);
} 


}


//for(var innerMov = [], j=0; j<movArray.length; j++) {  
//innerMov.push([movArray[j].title, movArray[j].ratings.critics_score, movArray[j].ratings.audience_score]);

//below worked 
    /*var movies = $.ajax({
    url: "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=d8sjemgp8m5mfpyam3cw5ea5&page_limit=50&page=1",
    dataType: 'jsonp',
    success: function(jsonp) {
      movArray = movies.responseJSON.movies;
      for(rtTitlArr = [], i=0; i<movArray.length; i++) {
        rtTitlArr.push([movArray[i].title, movArray[i].ratings.critics_score]);
      }

      console.log(rtTitlArr);

*/

/*      for(var comTitlArr = [], i=0; i<globMovTimes.length; i++) {
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

/*    },

    error: function(e) {
      console.log(e.message);
    },


 });

  //console.log(globMovTimes);

}
*/

//document.getElementById("result1").innerHTML = globMovArr;
