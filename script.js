
$(document).ready(function () {	

function showConcerts(search, filter) {
  if (typeof(search)==='undefined') search = "";
  if (typeof(filter)==='undefined') filter = false;

  if (filter===false)
  {
    // Disable tag radiobuttons
    $('input[name="tags"]:checked').each(function() {
       this.checked = false;
    });
  }

  // get the value from datefrom and date to
  var datefrom = $('#datepicker').val();
  var dateto = $('#datepicker2').val();
  console.log(datefrom)


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
      // run a filter on the data
      for (var i = data.length - 1; i >= 0; i--) {
        if (data[i].eventHallName.includes(search)) {
          newData.push(data[i])
        }
        // if there is now designated place in the name
        else if (search==="()" && !data[i].eventHallName.includes(")"))
        {
          newData.push(data[i])
        }
      }
    }
    else {

      // Query the data
      for (var i = data.length - 1; i >= 0; i--) {
        if (data[i].name.includes(search)) {
          newData.push(data[i])
        }
      }
    }
    data = newData
  }

  // filter with datefrom
  if (datefrom!=='') {
    var newData = []
      for (var i = data.length - 1; i >= 0; i--) {
        if (Date.parse(datefrom) < Date.parse(data[i].dateOfShow)) {
          newData.push(data[i])
        }
      }
    data = newData
  }


  // filter with dateto
  if (dateto!=='') {
    var newData = []
      for (var i = data.length - 1; i >= 0; i--) {
        if (Date.parse(dateto) > Date.parse(data[i].dateOfShow)) {
          newData.push(data[i])
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
      var myCont = '<div id="concert" class="col-sm-4">'+
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
          $(this).find("#img").css('opacity', '0.4');
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

// make dateto and datefrom an interactive calander
$( ".dateto" ).datepicker();
$( ".datefrom" ).datepicker();

// on the change of the calanders call showconcerts
$( ".datefrom" ).change(function() {
  showConcerts();
});
$( ".dateto" ).change(function() {
  showConcerts();
});


// when the radiobuttons are changed calll showConcert
$('input[type=radio][name=tags]').change(function() {
    showConcerts(this.value, true)
});


});