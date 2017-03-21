/**
 * Created by jonathan on 19/03/17.
 */
'use strict';
(function (angular, litteraApp) {

  angular.module(litteraApp.modules.feed.name)
    .config(
    function ($locationProvider, $routeProvider) {
      $routeProvider
        .when(litteraApp.modules.feed.routes.feed, {
          controller:  litteraApp.modules.feed.controllers.feed.name,
          controllerAs:  litteraApp.modules.feed.controllers.feed.nameas,
          templateUrl: litteraApp.modules.feed.templates.feed.url,
          css: 'static/css/trends.css',
          access: {
            requiresLogin: true
          }
        });
    });

}(angular, litteraApp));
