'use strict';

app.service("session", function($q){
    var distributeurId = 0;
    var trajetId = 0;

    this.setDistributeurId = function(id){
      distributeurId = id;
    };

    this.distributeurId = function(){
      return distributeurId;
    };

    this.setTrajetId = function(id){
      trajetId = id;
    };

    this.trajetId = function(){
      return trajetId;
    };
  });

/*
app.service("accessControl", function(session, $q) {
  return $q(function (resolve, reject) {
      isUserConnected: function() {
        if (true) {
          resolve();
        } else {
          reject();
        }
      }
  });
}
*/
