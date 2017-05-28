/**
 * Created by jonathan on 27/05/17.
 */
'use strict';
(function (angular, litteraApp) {
  angular.module(litteraApp.modules.main.name)
    .config(
    function ($routeProvider) {
      $routeProvider
        .when(litteraApp.modules.main.routes.terms, {
          controller: litteraApp.modules.main.controllers.terms.name,
          controllerAs: litteraApp.modules.main.controllers.terms.nameas,
          templateUrl: litteraApp.modules.main.templates.terms.url,
          title: 'Termos',
          access: {
            requiresLogin: false
          }
        });
    });
}(angular, litteraApp));

