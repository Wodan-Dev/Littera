/**
 * Created by jonathan on 28/03/17.
 */
'use strict';
(function (angular, litteraApp) {

  angular.module(litteraApp.modules.users.name)
    .config(
    function ($locationProvider, $routeProvider) {
      $routeProvider
        .when(litteraApp.modules.users.routes.users(':username'), {
          controller:  litteraApp.modules.users.controllers.users.name,
          controllerAs:  litteraApp.modules.users.controllers.users.nameas,
          templateUrl: litteraApp.modules.users.templates.users.url,
          access: {
            requiresLogin: false
          }
        });
    });

}(angular, litteraApp));
