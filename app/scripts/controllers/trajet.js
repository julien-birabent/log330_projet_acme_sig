'use strict';

/**
 * @ngdoc function
 * @name log330ProjetAcmeSigApp.controller:trajetCtrl
 * @description
 * # trajetCtrl
 * Controller of the log330ProjetAcmeSigApp
 */
angular.module('log330ProjetAcmeSigApp')
  .controller('trajetCtrl', function ($scope, $http, $location, session) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    session.isAuthentified();
  });
