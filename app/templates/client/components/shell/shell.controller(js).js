'use strict';

angular.module('<%= scriptAppName %>')
  .controller('ShellCtrl', function ($mdSidenav, $scope, $location<% if(filters.auth) {%>, Auth<% } %>) {

    <% if(filters.auth) {%>
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };<% } %>

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.toggleLeft = function() {
      $mdSidenav('left').toggle();
    };

    var originatorEv;
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

  });
