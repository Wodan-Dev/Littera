/**
 * Created by jonathan on 24/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  angular.module(litteraApp.modules.handlers.name)
    .config(
    function ($routeProvider) {
      $routeProvider
        .when(litteraApp.modules.handlers.routes.notAuthorized, {
          controller: litteraApp.modules.handlers.controllers.notAuthorized.name,
          controllerAs: litteraApp.modules.handlers.controllers.notAuthorized.nameas,
          templateUrl: litteraApp.modules.handlers.templates.notAuthorized.url,
          access: {
            requiresLogin: false
          }
        })
        .when(litteraApp.modules.handlers.routes.notFound, {
          controller: litteraApp.modules.handlers.controllers.notFound.name,
          controllerAs: litteraApp.modules.handlers.controllers.notFound.nameas,
          templateUrl: litteraApp.modules.handlers.templates.notFound.url,
          access: {
            requiresLogin: false
          }
        })
        .when(litteraApp.modules.handlers.routes.serverError(), {
          controller: litteraApp.modules.handlers.controllers.serverError.name,
          controllerAs: litteraApp.modules.handlers.controllers.serverError.nameas,
          templateUrl: litteraApp.modules.handlers.templates.serverError.url,
          access: {
            requiresLogin: false
          }
        });
    });
}(angular, litteraApp));
