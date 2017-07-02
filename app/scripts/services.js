'use strict';

angular.module('log330ProjetAcmeSigApp')
  .service("distributeur", function(){
    var id;

    this.setId = function(_id){
      id = _id;
    };

    this.id = function(){
      return id;
    };
  });
