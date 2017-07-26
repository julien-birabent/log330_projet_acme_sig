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
        $scope.ligne = response.data[0][3];

        if ($scope.ligne.length < 2) {
          $scope.saveValid = true;
        }
      });

    $scope.changeSaveBtnStatus = function() {
      if ($scope.ligne.length < 2) {
        $scope.saveValid = true;
      } else {
        $scope.saveValid = false;
      }
    }

    $scope.saveTrajet = function() {
      var data = {
        "trajetId": $routeParams.trajetId,
        "livraisons": adresses,
        "points": "0 0,1 1"
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
