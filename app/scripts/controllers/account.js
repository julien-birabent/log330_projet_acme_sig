'use strict';

/**
 * @ngdoc function
 * @name log330ProjetAcmeSigApp.controller:accountCtrl
 * @description
 * # ccountCtrl
 * Controller of the log330ProjetAcmeSigApp
 */
angular.module('log330ProjetAcmeSigApp')
  .controller('accountCtrl', function ($scope, $http, $location, session) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.trajets = [];

    $http.post("scripts/getTrajets.php")
      .then(function(response) {
        $scope.trajets = response.data;
      });

    $scope.datePrevue = "";
    $scope.error = "";
    $scope.fieldsError = false;
    $scope.url = $location.absUrl();

    $scope.addTrajet = function() {
      if ($scope.datePrevue === "") {
        $scope.error = "Il doit y avoir une date de prévue!";
        $scope.fieldsError = true;
        return;
      }

      var data = {
        "camionId": $scope.camionId,
        "datePrevue": $scope.datePrevue,
      };

      $http.post("scripts/addTrajet.php", data)
        .then(function(response) {
          if (response.data != "false") {
            session.setTrajetId(response.data[0][0]);
            $location.url('/trajet');
          } else {
            $scope.error = "Une erreur s'est produite lors de la création du trajet!";
            $scope.fieldsError = true;
          }
        });
    };
  });
