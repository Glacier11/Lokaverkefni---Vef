
$(document).ready(function () {	

function showConcerts(search, filter) {
  if (typeof(search)==='undefined') search = "";
  if (typeof(filter)==='undefined') filter = false;
  // ajax the info into the concerts id
	var concerts = document.getElementById("concerts");
  concerts.innerHTML = ""


 // get data
 $.getJSON("http://apis.is/concerts", function(data) {
  data = data.results


  // filter and query results
  if (search!=="")
  {
    var newData = []
    if (filter)
    {
      for (var i = data.length - 1; i >= 0; i--) {
        if (data[i].userGroupName===search) {
          newData.push(data[i])
        }
      }
    }
    else {
      console.log(search)
      for (var i = data.length - 1; i >= 0; i--) {
        if (data[i].name.includes(search)) {
          newData.push(data[i])
        }
      }
    }
    data = newData
  }

  if (data.length!==0)
  {
    // put all the concerts in data.result into id=concerts
    for (var i = data.length-1; i >= 0; i--) {
      // remove T from date
      var index = 10;
      var date = data[i].dateOfShow
      date = date.substr(0, index) + ' ' + date.substr(index + 1);

      // mycontent template
      var myCont = '<div id="concert">'+
                    '<img src="'+data[i].imageSource+'" alt="Mountain View" id="img">'+
                    '<div id="info">'+
                      'Nafn: '+data[i].name+'<br>'+
                      'dagsetning: '+date+'<br>'+
                      'staðsetning: '+data[i].eventHallName+'<br>'+
                      'tag: '+data[i].userGroupName+'<br>'+
                    '</div>'+
                   '</div>'
       concerts.innerHTML += myCont;
    }

    // Show info on hover
    $("#concerts *").hover(
      function () {
          $(this).find("#info").show();
          $(this).find("#img").css('opacity', '0.6');
      },
      function () {
          $(this).find("#info").hide(); 
          $(this).find("#img").css('opacity', '1');
      }); // end of hover
  }
  else{
    concerts.innerHTML = "There are no concerts matching that filter"
  }
});
}

//showConcerts("Gamla bíó", true)
showConcerts()


$( "#search" ).on("keyup", function() {
  showConcerts($(this).val());
});

});