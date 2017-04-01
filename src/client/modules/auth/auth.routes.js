/**
 * Created by jonathan on 20/03/17.
 */
'use strict';
(function (angular, litteraApp) {

  angular.module(litteraApp.modules.auth.name)
    .config(
    function ($locationProvider, $routeProvider) {
      $routeProvider
        .when(litteraApp.modules.auth.routes.login, {
          controller:  litteraApp.modules.auth.controllers.login.name,
          controllerAs:  litteraApp.modules.auth.controllers.login.nameas,
          templateUrl: litteraApp.modules.auth.templates.login.url,
          //css: 'static/css/trends.css',
          //css: [ //'static/css/trends.css',
          //  /*'static/css/notice.css'*/],
          access: {
            requiresLogin: false
          }
        })
        .when(litteraApp.modules.auth.routes.register, {
          controller:  litteraApp.modules.auth.controllers.register.name,
          controllerAs:  litteraApp.modules.auth.controllers.register.nameas,
          templateUrl: litteraApp.modules.auth.templates.register.url,
          //css: 'static/css/trends.css',
          //css: [ //'static/css/trends.css',
          //  /*'static/css/notice.css'*/],
          access: {
            requiresLogin: false
          }
        });
    });

}(angular, litteraApp));
