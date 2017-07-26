var adresses = [];

function displayAdresses()
{
  var adresse = document.getElementById("adresse").value;
  var temps_estime = document.getElementById("temps_estime").value;
  var article = document.getElementById("article").value;

  if (adresse == "" || adresse.length == 0 || temps_estime == "" || temps_estime.length == 0
  || article == "" || article.length == 0)
  {
    return false; //stop the function since the value is empty.
  }

  adresses.push({
    location: adresse,
    temps_estime: temps_estime,
    article: article,
    stopover: true
  });
  refreshListAdresses();
}

function refreshListAdresses(){
  var liste = document.getElementById("list_adresses").children[0];
  var livraison = adresses[adresses.length-1];
  liste.innerHTML += "<li>" + livraison.location + " / " + livraison.temps_estime + " / " + livraison.article + "</li>";

  //var subadresses = adresses.slice(1, adresses.length-1);
  //document.getElementById("list_subadresses").children[0].innerHTML += "<li>"+subadresses[subadresses.length-1].location+"</li>";
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
  initMap();
  adresses = new Array();
}
