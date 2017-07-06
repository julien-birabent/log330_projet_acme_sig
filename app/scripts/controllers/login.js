'use strict';

/**
 * @ngdoc function
 * @name log330ProjetAcmeSigApp.controller:loginCtrl
 * @description
 * # loginCtrl
 * Controller of the log330ProjetAcmeSigApp
 */
app.controller('loginCtrl', function ($scope, $http, $location, session) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.email = "";
    $scope.password = "";
    $scope.error = "";
    $scope.connectionFailed = false;

    $scope.authentification = function() {
      var data = {
        "email": $scope.email,
        "password": $scope.password
      };

      $http.post("scripts/authentification.php", data)
        .then(function(response) {
          if (response.data.length > 0) {
            session.setDistributeurId(response.data[0][0]);
            $location.path('account');
          } else {
            $scope.error = "Le courriel ou le mot de passe est invalide!";
            $scope.connectionFailed = true;
          }
        });
    };
  });
