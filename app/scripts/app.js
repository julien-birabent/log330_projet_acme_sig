'use strict';

/**
 * @ngdoc overview
 * @name log330ProjetAcmeSigApp
 * @description
 * # log330ProjetAcmeSigApp
 *
 * Main module of the application.
 */
var app = angular
  .module('log330ProjetAcmeSigApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
  }])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html'
      })
      .when('/registration', {
        templateUrl: 'views/registration.html'
      })
      .when('/account', {
        templateUrl: 'views/account.html'
      })
      .when('/trajet/:trajetId', {
        templateUrl: 'views/trajet.html'
      })
      .otherwise({
        templateUrl: '404.html'
      });
  });
