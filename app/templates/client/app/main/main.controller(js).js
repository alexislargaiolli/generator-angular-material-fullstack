'use strict';

angular.module('<%= scriptAppName %>')
  .controller('MainCtrl', function ($scope, $http<% if(filters.socketio) { %>, socket<% } %>) {
    
  });
