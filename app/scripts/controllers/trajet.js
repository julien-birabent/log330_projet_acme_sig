'use strict';

/**
 * @ngdoc function
 * @name log330ProjetAcmeSigApp.controller:trajetCtrl
 * @description
 * # trajetCtrl
 * Controller of the log330ProjetAcmeSigApp
 */
angular.module('log330ProjetAcmeSigApp')
  .controller('trajetCtrl', function ($scope, $http, $location, session, $routeParams) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    session.isAuthentified();

    $scope.adresse = "Montréal, MTL";

    var data = {
      "trajetId": $routeParams.trajetId
    };

    $http.post("scripts/getOneTrajet.php", data)
      .then(function(response) {
        $scope.camionId = response.data[0][2];
        $scope.datePrevue = response.data[0][0];
        $scope.dateDerniereEdition = response.data[0][1];

        console.log(response.data[0][4]);
        if (response.data[0][4].length > 0) {
          writeLivraisons(response.data[0][4]);
          document.getElementById('submit').click();
        }
      });

    $scope.saveTrajet = function() {
      if (adresses2.length < 2) {
        alert("Il faut au moins deux coordonnées!");
        return;
      }

      var data = {
        "trajetId": $routeParams.trajetId,
        "livraisons": adresses2
      };

      console.log(data);

      $http.post("scripts/saveTrajet.php", data)
        .then(function(response) {
          if (response.data != "false") {
            alert("Le trajet a été sauvegardé");
            console.log(response.data);
          } else {
            $scope.error = "Une erreur s'est produite lors de la sauvegarde du trajet!";
            $scope.fieldsError = true;
          }
        });
    };

    googleMapsScript();
  });
