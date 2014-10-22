// below: "cannot read property title of undefined"
movArray = [];

for(i=0; i<requests.length; i++) {    
  (function successFun(y) {
    movArray = movies[i] + y;
    newArray = [];
    newArray.push([movArray[i].title, movArray[i].ratings.critics_score, movArray[i].ratings.audience_score]);
  }) (i)
  console.log(newArray);
}

//below: "cannot read property critics_score of undefined"
movArray = [];

for(i=0; i<requests.length; i++) {    
  (function successFun(y) {
    movArray = movies[i] + y;
    newArray = [];
    newArray.push([movArray.title, movArray.ratings.critics_score, movArray.ratings.audience_score]);
  }) (i)
  console.log(newArray);
}

//below returns [Array[2]] four times, when I examine the array, each index is "undefined"
movArray = [];

for(i=0; i<requests.length; i++) {    
  (function successFun(y) {
    movArray = movies[i] + y;
    newArray = [];
    newArray.push([movArray.title, movArray.ratings]);
  }) (i)
  console.log(newArray);
}

//below returns NaN with the number 4 in a circle to the left of it
movArray = [];

for(i=0; i<requests.length; i++) {    
  (function successFun(y) {
    movArray = movies[i] + y;
  }) (i)
  console.log(movArray);
}

//below returns: 
//[Object]
//[Object, Object]
//[Object, Object, Object]
//[Object, Object, Object, Object]
//but for every array, for every the object is just the last page of results (15)
movArray = [];

for(i=0; i<requests.length; i++) {    
  (function successFun(y) {
    movArray.push(movies)[i] + y;
  }) (i)
  console.log(movArray);
}

//below returns the exact same results as above
movArray = [];

for(i=0; i<requests.length; i++) {    
  (function successFun(y) {
    movArray.push(movies)[i] + y;
    return;
  }) (i)
  console.log(movArray);
}

//below is a later test, where I had started using error message in ajax method. Got error 
//message(w/number 4 to left), but also: 
//[Object]
//[Object, Object]
//[Object, Object, Object]
//[Object, Object, Object, Object]
//but for every array, for every the object is just the last page of results (15)

movArray = [];

for(i=0; i<requests.length; i++) {    
  (function successFun(y) {
    movArray.push(movies)[y];
  }) (i)
  console.log(movArray);
}

//below is a later test, where I had started using error message in ajax method. Got error 
//message (w/number 4 to left, so ran?) and nothing else

movArray = [];

for(i=0; i<requests.length; i++) {    
  function successFun(y) {
    return function() {
    movArray.push(movies)[y];
  }
  } (i);
  return movArray;
}
console.log(movArray);

//below returns:
//[Object]
//[Object]
//[Object]
//[Object]
//and the object is always the last page of results (15)
for(i=0; i<requests.length; i++) {    
  (function successFun(y) {
    movArray = [];
    movArray.push(movies)[i] + y;
    return;
  }) (i)
  console.log(movArray);
}

//below returns NaN with the number 4 in a circle to the left of it
for(i=0; i<requests.length; i++) {    
  (function successFun(y) {
    movArray = [];
    movArray = movies[i] + y;
    return;
  }) (i)
  console.log(movArray);
}
//below does nothing
function successFun(y) {
  for(i=0; i<requests.length; i++) {
    movArray = [];
    movArray.push(movies)[i] + y;
    return;
  } (i)
  console.log(movArray);
}

//below returns [Object] on 16 succesive lines, eacn one is the last page of results
function successFun(y) {
  for(i=0; i<requests.length; i++) {
    movArray = [];
    movArray.push(movies)[i] + y;  
    console.log(movArray);
  } (i)
}

//replacing (i) with (y) in the second to last line above gives the same result

//moving console.log(movArray); to the second to the last line returns
//[Object] on 4 succesive lines, eacn one is the last page of results 

//below returns exact same thing as above
function successFun(y) {
  for(i=0; i<requests.length; i++) {
    movArray = [];
    movArray.push(movies) + y;  
  } (i)
  console.log(movArray);
}

//replacing (i) with () in the above returns syntax error unexpected token (

//all of above were using this ajax method:

for (k = 0; k< requests.length; k++) {
  var movies = $.ajax({
    url: requests[k].url,
    data: requests[k].json,
    dataType: 'jsonp',
    success: successFun
  });
}
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

//trying new ajax method, console log shows error message
    var movies = $.ajax({
      url: requests.url,
      data: requests.json,
      dataType: 'jsonp',
      success: successFun
      error: console.log("test3")
    });
      
function successFun() {
  for(i=0; i<requests.length; i++) {
    movArray = [];
    movArray.push(movies);  
    console.log("test1");
  }
  console.log(movArray);
  console.log("test2");
}

//changing ajax method to below results in unexpected syntax token ( on the for loop

    var movies = $.ajax({
      for (k = 0; k< requests.length; k++) {
      url: requests[k].url,
      data: requests[k].json,
      dataType: 'jsonp',
      success: successFun,
      error: console.log("test3")
    }
    });

//going back to previous ajax method////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

//results pasted in above
