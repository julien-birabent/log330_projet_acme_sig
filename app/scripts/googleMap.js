var adresses = [];

function displayAdresses()
{
  var nouvelleAdresse = document.getElementById("adresse").value;
  if (nouvelleAdresse == "" || nouvelleAdresse.length == 0)
  {
    return false; //stop the function since the value is empty.
  }
  adresses.push({
    location: nouvelleAdresse,
    stopover: true
  });
  refreshListAdresses();
}

function refreshListAdresses(){
  document.getElementById("list_adresses").children[0].innerHTML += "<li>"+adresses[adresses.length-1].location+"</li>";

  var subadresses = adresses.slice(1, adresses.length-1);
  document.getElementById("list_subadresses").children[0].innerHTML += "<li>"+subadresses[subadresses.length-1].location+"</li>";
}

function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: {lat: 41.85, lng: -87.65}
  });
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('bottom-panel'));

  document.getElementById('submit').addEventListener('click', function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
    origin: adresses[0].location,
    destination: adresses[adresses.length-1].location,
    waypoints: adresses.slice(1, adresses.length-1),
    optimizeWaypoints: false,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
      var route = response.routes[0];
      var summaryPanel = document.getElementById('directions-panel');
      summaryPanel.innerHTML = '';
      // For each route, display summary information.
      for (var i = 0; i < route.legs.length; i++) {
        var routeSegment = i + 1;
        summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
          '</b><br>';
        summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
        summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
        summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
      }
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

function googleMapsScript() {
  var script = document.createElement('script');
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDT33YYFTOy_H85YMWd_3IBl3oPE8W5UKY&callback=initMap';
  script.type = 'text/javascript';
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(script);
}
