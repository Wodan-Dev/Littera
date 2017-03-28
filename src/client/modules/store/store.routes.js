/**
 * Created by jonathan on 28/03/17.
 */
'use strict';
(function (angular, litteraApp) {

  angular.module(litteraApp.modules.store.name)
    .config(
    function ($locationProvider, $routeProvider) {
      $routeProvider
        .when(litteraApp.modules.store.routes.store, {
          controller:  litteraApp.modules.store.controllers.store.name,
          controllerAs:  litteraApp.modules.store.controllers.store.nameas,
          templateUrl: litteraApp.modules.store.templates.store.url,
          css: 'static/css/book-store.css',
          access: {
            requiresLogin: true
          }
        });
    });

}(angular, litteraApp));
