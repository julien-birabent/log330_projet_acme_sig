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

    $scope.points = "[[0,0],[1,1]]";

    $scope.saveTrajet = function() {
      var data = {
        "trajetId": $routeParams.trajetId,
        "points": $scope.points
      };

      $http.post("scripts/saveTrajet.php", data)
        .then(function(response) {
          if (response.data != "false") {
            alert("Le trajet a été sauvegardé");
          } else {
            $scope.error = "Une erreur s'est produite lors de la sauvegarde du trajet!";
            $scope.fieldsError = true;
          }
        });
    };
  });
