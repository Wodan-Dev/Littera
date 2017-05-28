/**
 * Created by jonathan on 19/03/17.
 */
'use strict';
(function (angular, litteraApp) {

  angular.module(litteraApp.modules.feed.name)
    .config(
    function ($locationProvider, $routeProvider) {
      $routeProvider
        .when(litteraApp.modules.feed.routes.feed_page, {
          controller:  litteraApp.modules.feed.controllers.feed.name,
          controllerAs:  litteraApp.modules.feed.controllers.feed.nameas,
          templateUrl: litteraApp.modules.feed.templates.feed.url,
          title: 'Feed',
          /*css: 'static/css/trends.css',*/
          access: {
            requiresLogin: true
          }
        })
        .when(litteraApp.modules.feed.routes.trending, {
          controller:  litteraApp.modules.feed.controllers.trending.name,
          controllerAs:  litteraApp.modules.feed.controllers.trending.nameas,
          templateUrl: litteraApp.modules.feed.templates.trending.url,
          title: 'Em Alta',
          access: {
            requiresLogin: false
          }
        })
        .when(litteraApp.modules.feed.routes.readings, {
          controller:  litteraApp.modules.feed.controllers.readings.name,
          controllerAs:  litteraApp.modules.feed.controllers.readings.nameas,
          templateUrl: litteraApp.modules.feed.templates.readings.url,
          title: 'Leituras',
          access: {
            requiresLogin: false
          }
        });
    });

}(angular, litteraApp));
