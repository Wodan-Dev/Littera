/**
 * Created by jonathan on 17/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  function configApp($httpProvider, $routeProvider, $locationProvider) {

    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode({
      enabled: false,
      requireBase: false
    });

    $httpProvider.interceptors.push(
      litteraApp.modules.handlers.factories.notFound);
    $httpProvider.interceptors.push(
      litteraApp.modules.handlers.factories.notAuthorized);
    $httpProvider.interceptors.push(
      litteraApp.modules.handlers.factories.serverError);

    $routeProvider.otherwise({
      redirectTo: litteraApp.URLS.NOTFOUND()
    });
  }

  function runApp($rootScope, authorization, $location, $interval, BASEURLS) {
    $rootScope.__showModal = false;
    $rootScope.__showUserMenu = false;
    $rootScope.__showLinks = false;
    $rootScope.__showNotify = false;
    $rootScope.__showLoad = false;
    $rootScope.BASEURLS = BASEURLS;

    $rootScope.$on('$routeChangeStart', function (event, next) {
      $rootScope.__showModal = false;
      $rootScope.__showLinks = false;
      $rootScope.__showUserMenu = false;
      $rootScope.__showNotify = false;
      $rootScope.__showLoad = true;
    });

    $rootScope.$on('$routeChangeSuccess', function (event, next) {
      authorization.authorize(next)
       .then(function (url) {
         $rootScope.$broadcast('evt_navBarUser_event', '');
       })
       .catch(function (url) {
         $location.path(url);
       });
    });

    $rootScope.$on('$viewContentLoaded', function(){
      var i = $interval(function () {
        $rootScope.__showLoad = false;
        $interval.cancel(i);
      }, 1300);

    });

  }

  configApp.$inject = [
    '$httpProvider',
    '$routeProvider',
    '$locationProvider'
  ];
  runApp.$inject = [
    '$rootScope',
    litteraApp.modules.auth.factories.authorization,
    '$location',
    '$interval',
    'BASEURLS'
  ];

  angular.module(litteraApp.modules.app.name, [
    litteraApp.components.header.name,
    litteraApp.components.navBarLinks.name,
    litteraApp.components.navBarUser.name,
    litteraApp.components.navBarNotify.name,
    litteraApp.modules.handlers.name,
    litteraApp.modules.main.name,
    litteraApp.modules.feed.name,
    litteraApp.modules.auth.name,
    litteraApp.modules.store.name,
    litteraApp.modules.books.name,
    litteraApp.modules.users.name,
    litteraApp.core.name,
    'ngFileUpload',
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
