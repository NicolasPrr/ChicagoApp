//https://goldironhack.github.io/gold/1/2017-Purdue-UNAL-IronHack-NicolasPrr/browser.html page
//ZILLOW-ID X1-ZWz1fr209tizgr_7sxq3

var map;
var myarray = new Array;
var thistest ="test ome";
var mainMarker;
var markerSelect;
var selectOn = 0;
var directionsService; //= new google.maps.DirectionsService;
var directionsDisplay = [];//= new google.maps.DirectionsRenderer;
var infowindow;
var ch;
var m;
function myMap() {
  var elem = document.getElementById("rentButton");
  elem.style.backgroundColor = "#F3F3F3";
  elem.innerHTML  = "<dd>Hide rents</dd>"

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
for(i = 0 ; i < 4; i++){
  directionsDisplay[i] = new google.maps.DirectionsRenderer;  
}

 /*marker.addListener('click', function() {
          alert("aiuda");
        });
        */   
//  google.maps.event.addListener(marker, 'click', function(){alert("sa");});

//  var checkbox = document.getElementById("rentCheckBox").addEventListener("click",deleteMarkers);
//alert(ch.length);


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
    ch = document.getElementsByClassName("checkDisplay");
    for( m = 0; m < ch.length; m ++){
      ch[m].addEventListener('click', function(){ 
        setDisplay(this )}, false);
    }

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
          setCheckedTrue();
          if(infowindow) infowindow.close();
         // alert(" get position " +mainMarker.getPosition());
         var ad  =  "Address: " + this.get("address") ; 
         var pho =  "Phone: " + this.get("phone") ; 
         var proN = "property name: " + this.get("property_name") ; 
         var comp = "Compañy: " + this.get("company") ; 
         var typ =  "property type: " + this.get("property_type") ; 
         var contentS = "<div><p>" + ad + "<br>" + pho + "<br>" + proN + "<br>" + comp +"<br>"+ typ + "</p></div>";
         //alert(content);          // alert(markerSelect.getPosition());
         infowindow = new google.maps.InfoWindow({
          content: contentS
        });
         distance(this.getPosition(), mainMarker.getPosition());
         distanceD(this.getPosition(), mainMarker.getPosition());
         distanceB(this.getPosition(), mainMarker.getPosition());
         distanceT(this.getPosition(), mainMarker.getPosition());
         displayRouteCicle(this.getPosition(),mainMarker.getPosition());
         displayRouteDriving(this.getPosition(),mainMarker.getPosition());
         displayRouteWalking  (this.getPosition(),mainMarker.getPosition());
         displayRouteTransit(this.getPosition(),mainMarker.getPosition());
        // markerSelect.setIcon(image);
        // markerSelect.setIcon(image);
         //markerSelect = this;
         black = "styles/icons/Hotel/black/bed_b.png";
        // this.setIcon(black) ;
        //alert(infowindow);

        if(selectOn == 0){
          markerSelect = this;
          infowindow.open(map, this);
          markerSelect.setIcon(black);
          selectOn = 1;
        }else{

          markerSelect.setIcon(image);
          markerSelect = this;
          markerSelect.setIcon(black);
          infowindow.open(map, this);

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
        var stringDriving = "Distance: " + dist + "<br>Time: " + dur;  
        document.getElementById("textWalking").innerHTML = stringDriving;


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
        var  cls = document.getElementsByClassName("textS");
        for ( j = 0 ; j < cls.length ; j++){
          cls[j].style.visibility = 'visible';  
        }
        console.log(response.rows[0].elements.distance);
        var dur = response.rows[0].elements[0].duration.text;
        var dist = response.rows[0].elements[0].distance.text;
        var stringDriving = "Distance: " + dist + "<br>Time: " + dur;  
        document.getElementById("textDriving").innerHTML = stringDriving;
      }
    });
  }



  function distanceT(originS, destinationS){

  //Find the distance
    var origin1 = originS; //{lat: 55.93, lng: -3.118} ;
    var destinationA = destinationS;
    var distanceService = new google.maps.DistanceMatrixService();
    distanceService.getDistanceMatrix({
      origins: [origin1],
      destinations: [destinationA],
      travelMode: google.maps.TravelMode.TRANSIT, 
      unitSystem: google.maps.UnitSystem.METRIC,
      durationInTraffic: true,
      avoidHighways: false,
      avoidTolls: false
    },
    function (response, status) {
      if (status !== google.maps.DistanceMatrixStatus.OK) {
        console.log('Error:', status);
      } else {            
        var  cls = document.getElementsByClassName("textS");
        for ( j = 0 ; j < cls.length ; j++){
          cls[j].style.visibility = 'visible';  
        }
        console.log(response.rows[0].elements.distance);
        var dur = response.rows[0].elements[0].duration.text;
        var dist = response.rows[0].elements[0].distance.text;
        var stringDriving = "Distance: " + dist + "<br>Time: " + dur;  
        document.getElementById("textTransit").innerHTML = stringDriving;
      }
    });
  }




  function distanceB(originS, destinationS){

  //Find the distance
    var origin1 = originS; //{lat: 55.93, lng: -3.118} ;
    var destinationA = destinationS;
    var distanceService = new google.maps.DistanceMatrixService();
    distanceService.getDistanceMatrix({
      origins: [origin1],
      destinations: [destinationA],
      travelMode: google.maps.TravelMode.BICYCLING, 
      unitSystem: google.maps.UnitSystem.METRIC,
      durationInTraffic: true,
      avoidHighways: false,
      avoidTolls: false
    },
    function (response, status) {
      if (status !== google.maps.DistanceMatrixStatus.OK) {
        console.log('Error:', status);
      } else {            
        var  cls = document.getElementsByClassName("textS");
        for ( j = 0 ; j < cls.length ; j++){
          cls[j].style.visibility = 'visible';  
        }
        console.log(response.rows[0].elements.distance);
        var dur = response.rows[0].elements[0].duration.text;
        var dist = response.rows[0].elements[0].distance.text;
        var stringDriving = "Distance: " + dist + "<br>Time: " + dur;  
        document.getElementById("textBicycling").innerHTML = stringDriving;
      }
    });



  }
  function displayRouteWalking(originS, destinationS){
  //Find the distance
  directionsDisplay[2].setMap(map);
  directionsDisplay[2].setOptions( { suppressMarkers: true } ); 
  directionsDisplay[2].setOptions( { polylineOptions: { strokeColor: '#EC625F' , 
   strokeWeight: 6,
   strokeOpacity: 0.7} } );
  // quita los marcadores que autmaticamente ponen
  directionsService.route({
    origin: originS,
    destination: destinationS,
    travelMode: google.maps.TravelMode.WALKING,

  },
  function (response, status) {
    if (status !== google.maps.DirectionsStatus.OK) {
      console.log('Error:', status);
    } else {
      directionsDisplay[2].setDirections(response);

    }



  }
  );

}
function displayRouteTransit(originS, destinationS){
  //Find the distance
  directionsDisplay[3].setMap(map);
  directionsDisplay[3].setOptions( { suppressMarkers: true } ); 
  directionsDisplay[3].setOptions( { polylineOptions: { strokeColor: '#2F1B41' , 
   strokeWeight: 6,
   strokeOpacity: 0.7} } );
  // quita los marcadores que autmaticamente ponen
  directionsService.route({
    origin: originS,
    destination: destinationS,
    travelMode: google.maps.TravelMode.TRANSIT,

  },
  function (response, status) {
    if (status !== google.maps.DirectionsStatus.OK) {
      console.log('Error:', status);
    } else {
      directionsDisplay[3].setDirections(response);

    }



  }
  );

}

function displayRouteCicle(originS, destinationS){
  //Find the distance
  directionsDisplay[1].setMap(map);
  directionsDisplay[1].setOptions( { suppressMarkers: true } ); 
  directionsDisplay[1].setOptions( { polylineOptions: { strokeColor: '#FFCD38' , 
   strokeWeight: 6,
   strokeOpacity: 0.7} } );
  // quita los marcadores que autmaticamente ponen
  directionsService.route({
    origin: originS,
    destination: destinationS,
    travelMode: google.maps.TravelMode.BICYCLING,

  },
  function (response, status) {
    if (status !== google.maps.DirectionsStatus.OK) {
      console.log('Error:', status);
    } else {
      directionsDisplay[1].setDirections(response);

    }



  }
  );

}

function displayRouteDriving(originS, destinationS){
  //Find the distance
  directionsDisplay[0].setMap(map);
  directionsDisplay[0].setOptions( { suppressMarkers: true } ); 
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
      directionsDisplay[0].setDirections(response);

    }



  }
  );

}
function buttonRentF(){
  var elem = document.getElementById("rentButton");
  //alert(elem.style.backgroundColor + myarray.length);
  if( elem.style.backgroundColor == 'rgb(243, 243, 243)' ){
    //alert("ome");
    deleteMarkers(myarray);
    elem.style.backgroundColor = "#FFCD38";
    elem.innerHTML = "<dd>Show rents</dd>"
  }else{
    elem.style.backgroundColor = "#F3F3F3" ;
    elem.innerHTML = "<dd>hide rents</dd>"
    showMarkers(myarray);
  }  

}

function setCheckedTrue(){
  for( j = 0; j < ch.length; j++){
    ch[j].checked = true;
  }
}
function setDisplay(el){
  //alert(el.checked);
  //alert(el.value);
        if(el.checked == true ){
          directionsDisplay[el.value].setMap(map);
        }else{
          directionsDisplay[el.value].setMap(null);
        }

}