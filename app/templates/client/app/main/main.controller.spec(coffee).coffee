'use strict'

describe 'Controller: MainCtrl', ->

  # load the controller's module
  beforeEach module '<%= scriptAppName %>' <% if(filters.socketio) {%>
  beforeEach module 'socketMock' <% } %>

  MainCtrl = undefined
  scope = undefined
  $httpBackend = undefined

  # Initialize the controller and a mock scope
  beforeEach inject (_$httpBackend_, $controller, $rootScope) ->    
    scope = $rootScope.$new()
    MainCtrl = $controller 'MainCtrl',
      $scope: scope