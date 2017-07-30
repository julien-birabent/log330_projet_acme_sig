// Load the Visualization API and the columnchart package.
google.load('visualization', '1', {packages: ['columnchart']});

var geocoder;
var adresses = [];
var adresses2 = [];
var index = 0;
var map;

function ajouterAdresses()
{
  var adresse = document.getElementById("adresse").value;
  var temps_estime = document.getElementById("temps_estime").value;
  var article = document.getElementById("article").value;

  if (adresse == "" || adresse.length == 0 || temps_estime == "" || temps_estime.length == 0
  || article == "" || article.length == 0)
  {
    alert("Le formulaire est incomplet!");
    return false; //stop the function since the value is empty.
  }

  // CHECK IF ADDRESS IS VALID
  geocoder.geocode( { 'address' : adresse }, function( results, status ) {
    if( status == google.maps.GeocoderStatus.OK ) {
      var adresse_formate = results[0]["formatted_address"];
      var x = results[0].geometry.location.lat();
      var y = results[0].geometry.location.lng();
      var point = x + " " + y;

      adresses2.push({
        location: adresse_formate,
        temps_estime: temps_estime,
        article: article,
        point: point,
        id: index,
        stopover: true
      });

      adresses.push({
        location: adresse_formate
      });

      index++;
      refreshListAdresses();
    } else {
      alert( 'Geocode was not successful for the following reason: ' + status );
      return false;
    }
  } );
}

function refreshListAdresses(){
  var liste = document.getElementById("list_adresses").children[0];
  var livraison = adresses2[adresses2.length-1];
  var del = " <span style='cursor: pointer' onclick='effacer(" + livraison.id + ")'><b>X</b></span>";
  liste.innerHTML += "<li>" + livraison.location + " / " + livraison.temps_estime + " / " + livraison.article + " / (" + livraison.point + ") " + del + "</li>";
}

function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: {lat: 41.85, lng: -87.65}
  });
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('bottom-panel'));

  geocoder = new google.maps.Geocoder();

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
      console.log(route);
      var summaryPanel = document.getElementById('directions-panel');
      summaryPanel.innerHTML = '';
      var dureeTotale = 0;
      // For each route, display summary information.
      for (var i = 0; i < route.legs.length; i++) {
        var routeSegment = i + 1;
        summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
          '</b><br>';
        summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
        summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
        summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
        dureeTotale += route.legs[i].duration.value;
      }

      ecrireStats(dureeTotale);

      // Generate the elevation chart
      generateElevationChart();
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

function generateElevationChart(){
  path = [];

  for(var i = 0; i < adresses2.length; i++){
    var positions = adresses2[i].point.split(" ");
    var objet = {lat: parseFloat(positions[0]), lng: parseFloat(positions[1])};
    path.push(objet);
  }

  var elevator = new google.maps.ElevationService;
  elevator.getElevationAlongPath({
    'path': path,
    'samples': 256
  }, plotElevation);
}

// Takes an array of ElevationResult objects, draws the path on the map
// and plots the elevation profile on a Visualization API ColumnChart.
function plotElevation(elevations, status) {
  var chartDiv = document.getElementById('elevation_chart');
  if (status !== 'OK') {
    // Show the error code inside the chartDiv.
    chartDiv.innerHTML = 'Cannot show elevation: request failed because ' + status;
    return;
  }
  // Create a new chart in the elevation_chart DIV.
  var chart = new google.visualization.ColumnChart(chartDiv);

  // Extract the data from which to populate the chart.
  // Because the samples are equidistant, the 'Sample'
  // column here does double duty as distance along the
  // X axis.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Sample');
  data.addColumn('number', 'Elevation');
  for (var i = 0; i < elevations.length; i++) {
    data.addRow(['', elevations[i].elevation]);
  }

  // Draw the chart using the data within its DIV.
  chart.draw(data, {
    height: 150,
    legend: 'none',
    titleY: 'Elevation (m)'
  });
}

function googleMapsScript() {
  initMap();
  adresses = new Array();
  adresses2 = new Array();

  index = 0;
}

function writeLivraisons(livraisons) {
  adresses = new Array();
  adresses2 = new Array();
  index = 0;

  for (var i = 0; i < livraisons.length; i++) {
    adresses2.push({
      location: livraisons[i][0],
      temps_estime: livraisons[i][1],
      article: livraisons[i][2],
      point: livraisons[i][3],
      pointRAW: livraisons[i][4],
      id: index,
      stopover: true
    });

    adresses.push({
      location: livraisons[i][0]
    });

    index++;
    refreshListAdresses();
  }

  document.getElementById('submit').click();
}

function effacer(id) {
  console.log(id);
  console.log(adresses2);
  adresses2 = adresses2.slice(0, id).concat(adresses2.slice(id + 1));
  adresses = adresses.slice(0, id).concat(adresses.slice(id + 1));
  console.log(adresses2);

  var liste = document.getElementById("list_adresses").children[0];
  liste.innerHTML = "";

  for (var i = 0; i < adresses2.length; i++) {
    var livraison = adresses2[i];
    if (livraison == undefined) continue;
    var del = " <span style='cursor: pointer' onclick='effacer(" + livraison.id + ")'><b>X</b></span>";
    liste.innerHTML += "<li>" + livraison.location + " / " + livraison.temps_estime + " / " + livraison.article + " / (" + livraison.point + ") " + del + "</li>";
  }
}

function ecrireStats(dureeTotale) {
  var tempsArrets = 0;
  for (var i = 0; i < adresses2.length; i++) {
    tempsArrets += parseInt(adresses2[i].temps_estime);
  }

  dureeTotale += tempsArrets * 60;
  var dureeTotaleTxt = "";

  var facteur = dureeTotale / 60;
  if (dureeTotale > 3600) {
    var heures = Math.floor(dureeTotale / 3600);
    dureeTotale -= heures * 3600;
    dureeTotaleTxt += heures + "h ";
  }

  var minutes = Math.floor(dureeTotale / 60);
  dureeTotaleTxt += minutes + " min";

  document.getElementById("dureeTotale").innerHTML = dureeTotaleTxt;
  document.getElementById("nbArrets").innerHTML = adresses2.length;
  document.getElementById("tempsArrets").innerHTML = tempsArrets + " min";
}
