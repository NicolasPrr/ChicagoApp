//https://goldironhack.github.io/gold/1/2017-Purdue-UNAL-IronHack-NicolasPrr/browser.html page
//ZILLOW-ID X1-ZWz1fr209tizgr_7sxq3

var map;
var myarray = new Array;
var thistest ="test ome";
var mainMarker;
var markerSelect;
var selectOn = 0;
var directionsService; //= new google.maps.DirectionsService;
var directionsDisplay ;//= new google.maps.DirectionsRenderer;
function myMap() {

  var location = {lat: 41.8708, lng:-87.6505 }  
 //document.getElementById("checkRentBox").checked = true;
 var mapProp= {
  center:new google.maps.LatLng(41.8708,-87.6505),
  zoom:13,
};

map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
var image = "styles/icons/healEducation/university.png"  
mainMarker = new google.maps.Marker({
  position: location,
  animation: google.maps.Animation.BOUNCE,
  title: 'University of Illinois',
  map: map,
  icon: image

});
directionsService = new google.maps.DirectionsService;
directionsDisplay = new google.maps.DirectionsRenderer;
 /*marker.addListener('click', function() {
          alert("aiuda");
        });
        */   
//  google.maps.event.addListener(marker, 'click', function(){alert("sa");});

//  var checkbox = document.getElementById("rentCheckBox").addEventListener("click",deleteMarkers);
loadRentsMarks();
  //alert("myarray.length :"   +  myarray.length);
// setTimeout( function ( ) { alert("size1 : " +  myarray.length);  }, 1000 );



//  alert("markersArray.length = :" markersArray.length );



}

function tests(){ alert("javascript alert");}

function deleteMarkers(markersArray) {
  //alert(myarray.length)
  for (var i = 0; i < markersArray.length; i++) {
    markersArray[i].setMap(null);
  }
  markersArray = [];
}
function showMarkers(markersArray) {
  for (var i = 0; i < markersArray.length; i++) {
    markersArray[i].setMap(map);
  }
}

function loadRentsMarks(){
  var xhttp = new XMLHttpRequest();
  var url ="https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.xml?accessType=DOWNLOAD"
  
  //alert(thistest + " " + myarray.length);
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     var xmlDoc = xhttp.responseXML;

     var i;
     var x = xmlDoc.getElementsByTagName("row");
    // var ya = x.getElementsByTagName("latitude");

    var existLatitud ;
    // document.getElementById("demo").innerHTML = ya[1].childNodes[0].nodeValue ;
    var idCount = 1;
    var mark;
    var image = "styles/icons/Hotel/bed.png"  
  //here i add the markes with some features
  for (i = 0 ; i < x.length  ; i++) {
    numberT = x[i].getElementsByTagName("latitude").length;
    if(numberT != 0){
      latituds = x[i].getElementsByTagName("latitude")[0].childNodes[0].nodeValue;
      longituds = x[i].getElementsByTagName("longitude")[0].childNodes[0].nodeValue;
      dr = x[i].getElementsByTagName("address")[0].childNodes[0].nodeValue;
      phone = x[i].getElementsByTagName("phone_number")[0].childNodes[0].nodeValue;
      property_name = x[i].getElementsByTagName("property_name")[0].childNodes[0].nodeValue;
      company = x[i].getElementsByTagName("management_company")[0].childNodes[0].nodeValue;
      property_types = x[i].getElementsByTagName("property_type")[0].childNodes[0].nodeValue;
      var mark = new google.maps.Marker({       
        position : {lat: Number(latituds), lng : Number(longituds)},
        id_rent: idCount,
        property_type : property_types,
        property_name : property_name,
        company: company,
        title: "Addess: " + dr +".\nPhone: " + phone +"\nProperty name: " +property_name +"\nCompany: " +company + "\nProperty type: " + property_types ,
        type: "Rent house",
        phone :  phone,
        address: dr,
        map: map, 
        icon: image,
      });
        //;
        myarray.push(mark);
        mark.addListener('click', function() {
         // alert(" get position " +mainMarker.getPosition());
         document.getElementById("textAddress").innerHTML = "Address: " + this.get("address") ; 
         document.getElementById("textPhone").innerHTML = "Phone: " + this.get("phone") ; 
         document.getElementById("textProperty").innerHTML = "property name: " + this.get("property_name") ; 
         document.getElementById("textCompañy").innerHTML = "Compañy: " + this.get("company") ; 
         document.getElementById("textType").innerHTML = "property type: " + this.get("property_type") ; 
         // alert(markerSelect.getPosition());
         distance(this.getPosition(), mainMarker.getPosition());
         distanceD(this.getPosition(), mainMarker.getPosition());
         displayRouteDriving(this.getPosition(),mainMarker.getPosition());
        // markerSelect.setIcon(image);
         //markerSelect = this;
         black = "styles/icons/Hotel/black/bed_b.png";
        // this.setIcon(black) ;
        x
        if(selectOn == 0){
          markerSelect = this;
          markerSelect.setIcon(black);
          selectOn = 1;
        }else{
          markerSelect.setIcon(image);
          markerSelect = this;
          markerSelect.setIcon(black);
        }

      });

        //  alert(myarray[i].get("title"));
        

        //alert(myarray[i].get("title"));
        
      } 
        //alert(markersArray[i].get("title" ) + markersArray.length);
       //alert(numberT +" i = " + i);
       //longituds = x[i].getElementsByTagName("longitude")[0].childNodes[0].nodeValue;
       
     }
     //alert("size : " +  myarray.length);

    //document.getElementById("demo").innerHTML = i;
  } 
}; xhttp.open("GET",url, true);
xhttp.send();

}
function checkRent(array ,  check){
  if(check.checked  == true ){
    showMarkers(array);
  }else{
    deleteMarkers(array);
  }

}

function distance(originS, destinationS){

  //Find the distance
    var origin1 = originS; //{lat: 55.93, lng: -3.118} ;
    var destinationA = destinationS;
    var distanceService = new google.maps.DistanceMatrixService();
    distanceService.getDistanceMatrix({
      origins: [origin1],
      destinations: [destinationA],
      travelMode: google.maps.TravelMode.WALKING,
      unitSystem: google.maps.UnitSystem.METRIC,
      durationInTraffic: true,
      avoidHighways: false,
      avoidTolls: false
    },
    function (response, status) {
      if (status !== google.maps.DistanceMatrixStatus.OK) {
        console.log('Error:', status);
      } else {
        console.log(response.rows[0].elements.distance);
        var dur = response.rows[0].elements[0].duration.text;
        var dist = response.rows[0].elements[0].distance.text;
        document.getElementById("textDistance").innerHTML = "Distance: " + dist ; 
        document.getElementById("textWalkTime").innerHTML = "Walking time: " + dur ; 


            //alert("response" + response.rows[0].elements[0].duration.text );
            //alert("response" + response.rows[0].elements[0].distance.text );
           //$("#distance").text(response.rows[0].elements[0].distance.text).show();
            //$("#duration").text(response.rows[0].elements[0].duration.text).show();
          }
        });



  }
  function distanceD(originS, destinationS){

  //Find the distance
    var origin1 = originS; //{lat: 55.93, lng: -3.118} ;
    var destinationA = destinationS;
    var distanceService = new google.maps.DistanceMatrixService();
    distanceService.getDistanceMatrix({
      origins: [origin1],
      destinations: [destinationA],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      durationInTraffic: true,
      avoidHighways: false,
      avoidTolls: false
    },
    function (response, status) {
      if (status !== google.maps.DistanceMatrixStatus.OK) {
        console.log('Error:', status);
      } else {
        console.log(response.rows[0].elements.distance);
        var dur = response.rows[0].elements[0].duration.text;
        document.getElementById("textDriveTime").innerHTML = "Driving time: " + dur ; 
            //alert("response" + response.rows[0].elements[0].duration.text );
            //alert("response" + response.rows[0].elements[0].distance.text );
           //$("#distance").text(response.rows[0].elements[0].distance.text).show();
            //$("#duration").text(response.rows[0].elements[0].duration.text).show();
          }
        });



  }
  function displayRouteDriving(originS, destinationS){
  //Find the distance
  directionsDisplay.setMap(map);
  directionsDisplay.setOptions( { suppressMarkers: true } ); 
  //directionsDisplay.setOptions( { polylineOptions: { strokeColor: "gray" } } );
  // quita los marcadores que autmaticamente ponen
  directionsService.route({
    origin: originS,
    destination: destinationS,
    travelMode: google.maps.TravelMode.DRIVING,

  },
  function (response, status) {
    if (status !== google.maps.DirectionsStatus.OK) {
      console.log('Error:', status);
    } else {
      directionsDisplay.setDirections(response);

    }



  }


  );

}

