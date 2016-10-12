'use strict';

angular.module('<%= scriptAppName %>')
  .config(function ($stateProvider) {
    $stateProvider
      .state('legal', {
        url: '/legal',
        templateUrl: 'app/common/legal/legal.html',
        controller: 'LegalCtrl'
      });
  });