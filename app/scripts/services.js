'use strict';

app.service("session", function(){
    var distributeurId, trajetId;

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
