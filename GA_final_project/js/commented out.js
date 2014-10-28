 var uniqueNames = [];
        for (h=0; h<compArr.length; h++) {  
          if ($.inArray(compArr[h][0], uniqueNames) === -1)
            console.log(compArr[h][0]);
            uniqueNames.push([compArr[h][0], compArr[h][1], compArr[h][2], compArr[h][3], compArr[h][4]]);
        }
      console.log(uniqueNames);
      
//this one kind of seems to work, counts different times as unique
      function find_duplicates(someArr) {
      var len=someArr.length,
          out=[],
          counts={};

      for (var i=0;i<len;i++) {
        var item = someArr[i][0];
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

      //below gets rid of both duplicates - not quite right 
      function elim_duplicates(someArr) {
      var len=someArr.length,
          out=[],
          counts={};

      for (var i=0; i<len ;i++) {
          var item = someArr[i][0];
        var count = counts[item];
        counts[item] = counts[item] >= 1 ? counts[item] + 1 : 1;
      }

      for (item in counts) {
        if(counts[item] > 1) continue;
             out.push(item);
      }
      console.log(out);
      }
      elim_duplicates(compArr);

      //var iDiv = document.createElement("div");
      //iDiv.id = "first_title";
      //iDiv.className = "movies";
      //var myDiv = document.getElementByID("result_one");
      //myDiv.appendChild(iDiv);
      //document.getElementByID("first_title").innerHTML = out;


      // // Now create and append to iDiv
      // var innerDiv = document.createElement('div');
      // innerDiv.className = 'block-2';

      // // The variable iDiv is still good... Just append to it.
      // iDiv.appendChild(innerDiv);



                        compArr.sort(function(a, b) {
                  if (a["1"] > b["1"]) {
                    return a - b;
                  }
                  //  if (a.1 < b.1) {
                  //    return b - a;
                  // }
                  // // // a must be equal to b
                  // return 0;
                });


/*                document.getElementById("first_title").innerHTML = rateArray[z][0];
                document.getElementById("first_rating").innerHTML = rateArray[z][1];
                document.getElementById("first_theatre").innerHTML = rateArray[index][2][n].theatre.name;
                var fixDate = (rateArray[index][2][n].dateTime);
                dateConvert(fixDate);
                document.getElementById("first_showtime").innerHTML = complDate;
                */