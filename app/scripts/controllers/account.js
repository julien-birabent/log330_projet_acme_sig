'use strict';

/**
 * @ngdoc function
 * @name log330ProjetAcmeSigApp.controller:accountCtrl
 * @description
 * # ccountCtrl
 * Controller of the log330ProjetAcmeSigApp
 */
angular.module('log330ProjetAcmeSigApp')
  .controller('accountCtrl', function ($scope, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var request = {
      method: 'get',
      url: 'scripts/getAccounts.php'
    }

    $http(request)
      .then(function successCallback(response) {
        //$scope.name = response.data.records;
        //console.log(response.data);
      }, function errorCallback(response) {
        console.log("Failure");
      });
  });
