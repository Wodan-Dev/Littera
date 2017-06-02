/**
 * Created by jonathan on 27/05/17.
 */
'use strict';
(function (angular, litteraApp) {
  angular.module(litteraApp.modules.admin.name)
    .config(
    function ($routeProvider) {
      $routeProvider
        .when(litteraApp.modules.admin.routes.admin, {
          controller: litteraApp.modules.admin.controllers.admin.name,
          controllerAs: litteraApp.modules.admin.controllers.admin.nameas,
          templateUrl: litteraApp.modules.admin.templates.admin.url,
          title: 'Administração',
          access: {
            requiresLogin: false
          }
        });
    });
}(angular, litteraApp));
