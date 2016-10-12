'use strict'

angular.module '<%= scriptAppName %>'
.controller 'MainCtrl', ($scope, $http<% if(filters.socketio) { %>, socket<% } %>) ->