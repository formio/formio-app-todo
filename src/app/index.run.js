(function() {
  'use strict';

  angular
    .module('formioAppTodo')
    .run([
      '$rootScope',
      'AppConfig',
      'FormioAuth',
      function(
        $rootScope,
        AppConfig,
        FormioAuth
      ) {
        // Initialize the authentication for form.io.
        FormioAuth.init();

        // Add the forms to the root scope.
        angular.forEach(AppConfig.forms, function(url, form) {
          $rootScope[form] = url;
        });
      }
    ]);
})();
