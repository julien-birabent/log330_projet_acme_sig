'use strict';

app.service("session", function($location){
    this.isAuthentified = function(){
      if (!sessionStorage['distributeurId']) {
          $location.path( "/access_denied" );
      }
    };
  });
