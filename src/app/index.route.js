(function() {
  'use strict';

  angular
    .module('formioAppTodo')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig(
    $stateProvider,
    $urlRouterProvider,
    FormioResourceProvider,
    FormioAuthProvider,
    FormioProvider,
    AppConfig
  ) {

    // Set the base url for formio.
    FormioProvider.setApiUrl(AppConfig.apiUrl);
    FormioProvider.setAppUrl(AppConfig.appUrl);
    FormioAuthProvider.register('login', 'user');
    FormioAuthProvider.register('register', 'user');
    FormioAuthProvider.setForceAuth(true);
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: ['$scope', '$state', '$rootScope', function($scope, $state, $rootScope) {
          $scope.todos = [];
          $scope.todosUrl = $rootScope.todoForm + '/submission';
          $scope.getStatus = function(todo) {
            switch (todo.data.status) {
              case 'notstarted':
                return 'danger';
              case 'started':
                return 'info';
              case 'done':
                return 'success';
            }
            return '';
          };
        }]
      });

    // Register the todo routes.
    FormioResourceProvider.register('todo', AppConfig.forms.todoForm, {
      defaultValue: {data: {status: 'notstarted'}},
      templates: {
        view: 'views/todo/view.html'
      },
      controllers: {
        view: ['$scope', function($scope) {
          $scope.position = {lat: '40.74', lng: '-74.18'};
          $scope.currentResource.loadSubmissionPromise.then(function() {
            if (!$scope.currentResource.resource) { return; }
            if ($scope.currentResource.resource.data.address) {
              $scope.position.lat = $scope.currentResource.resource.data.address.geometry.location.lat;
              $scope.position.lng = $scope.currentResource.resource.data.address.geometry.location.lng;
            }
          });
        }]
      }
    });
    $urlRouterProvider.otherwise('/');
  }

})();
