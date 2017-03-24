/**
 * Created by jonathan on 17/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  function configApp($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode({
      enabled: false,
      requireBase: false
    });
  }

  function runApp($rootScope, authorization, $location) {
    $rootScope.__showModal = false;
    $rootScope.__showUserMenu = false;
    $rootScope.__showLinks = false;
    $rootScope.__showNotify = false;

    $rootScope.$on('$routeChangeStart', function (event, next) {
      $rootScope.__showModal = false;
      $rootScope.__showLinks = false;
      $rootScope.__showUserMenu = false;
      $rootScope.__showNotify = false;
    });

    $rootScope.$on('$routeChangeSuccess', function (event, next) {
      authorization.authorize(next)
       .then(function (url) {

       })
       .catch(function (url) {
         $location.path(url);
       });
    });

    $rootScope.$on('$viewContentLoaded', function(){

    });

  }

  configApp.$inject = ['$routeProvider', '$locationProvider'
  ];
  runApp.$inject = ['$rootScope',
    litteraApp.modules.auth.factories.authorization, '$location'];

  angular.module(litteraApp.modules.app.name, [
    litteraApp.components.header.name,
    litteraApp.components.navBarLinks.name,
    litteraApp.components.navBarUser.name,
    litteraApp.components.navBarNotify.name,
    litteraApp.modules.main.name,
    litteraApp.modules.feed.name,
    litteraApp.modules.auth.name,
    litteraApp.core.name,
    'angularCSS'
  ]).constant('BASEURLS', {
    BASE: 'http://littera.pub',
    BASE_API: 'http://littera.pub/api',
    URLS: litteraApp.URLS
  }).constant('LOCALNAME', {
    USER_TOKEN: 'User-Token'
  })
    .config(configApp)
    .run(runApp);
}(angular, litteraApp));
