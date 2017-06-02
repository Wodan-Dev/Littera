/**
 * Created by jonathan on 27/05/17.
 */
'use strict';
(function (angular, litteraApp) {
  angular.module(litteraApp.modules.admin.name)
    .config(
    function ($routeProvider) {
      $routeProvider
        .when(litteraApp.modules.admin.routes.dashboard, {
          controller: litteraApp.modules.admin.controllers.dashboard.name,
          controllerAs: litteraApp.modules.admin.controllers.dashboard.nameas,
          templateUrl: litteraApp.modules.admin.templates.dashboard.url,
          title: 'Dashboard',
          access: {
            requiresLogin: true
          }
        });
    });
}(angular, litteraApp));
