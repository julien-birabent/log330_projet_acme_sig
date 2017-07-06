'use strict';

/**
 * @ngdoc function
 * @name log330ProjetAcmeSigApp.controller:registrationCtrl
 * @description
 * # registrationCtrl
 * Controller of the log330ProjetAcmeSigApp
 */
app.controller('registrationCtrl', function ($scope, $http, $location) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  $scope.email = "";
  $scope.password = "";
  $scope.error = "";
  $scope.fieldsError = false;

  $scope.addDistributeur = function() {
    if ($scope.email === "" || $scope.password === "") {
      $scope.error = "Les deux champs doivent être remplis!";
      $scope.fieldsError = true;
      return;
    }

    var data = {
      "email": $scope.email,
      "password": $scope.password,
    };

    $http.post("scripts/addDistributeur.php", data)
      .then(function(response) {
        if (response.data == "true") {
          alert("Votre compte vient d'être créé.");
          $location.path('login');
        } else {
          $scope.error = "Une erreur s'est produite lors de la création du compte!";
          $scope.fieldsError = true;
        }
      });
  };
});
