(function() {
  'use strict';

  angular
    .module('formioAppTodo')
    .run([
      '$rootScope',
      'AppConfig',
      'FormioAuth',
      '$state',
      function(
        $rootScope,
        AppConfig,
        FormioAuth,
        $state
      ) {
        // Initialize the authentication for form.io.
        FormioAuth.init();

        // Add the forms to the root scope.
        angular.forEach(AppConfig.forms, function(url, form) {
          $rootScope[form] = url;
        });

        // Determine if a state is active.
        $rootScope.isActive = function(state) {
          return $state.current.name.indexOf(state) !== -1;
        };
      }
    ]);
})();
