/**
 * Created by jonathan on 17/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  function configApp($mdThemingProvider, $httpProvider, $routeProvider, $locationProvider) {
    $mdThemingProvider.definePalette('amazingPaletteName', {
      /*'50': 'ffebee',
      '100': 'ffcdd2',
      '200': 'ef9a9a',
      '300': 'e57373',
      '400': 'ef5350',
      '500': '00AB6B',
      '600': 'e53935',
      '700': 'd32f2f',
      '800': 'c62828',
      '900': 'b71c1c',
      'A100': 'ff8a80',
      'A200': 'ff5252',
      'A400': 'ff1744',
      'A700': 'd50000',*/
      '50':  '00ebdb',
      '100': '00d5c7',
      '200': '00baac',
      '300': '00aea0',
      '400': '00a193',
      '500': '009688',/*default*/
      '600': '008b7d',
      '700': '007a6c',
      '800': '00695b',
      '900': '005f53',
      'A100':'00bfb1',
      'A200':'00b3a5',
      'A400':'00d0c0',
      'A700':'004038',
      /*'50':  '00f49f',
      '100': '00ea95',
      '200': '00d789',
      '300': '00cd7e',
      '400': '00b971',
      '500': '009688',
      '600': '009b5b',
      '700': '009156',
      '800': '008654',
      '900': '006935',
      'A100':'00b977',
      'A200':'00b472',
      'A400':'00d382',
      'A700':'00552a',*/
      'contrastDefaultColor': 'dark',    // whether, by default, text (contrast)
      // on this palette should be dark or light

      'contrastDarkColors': [
        '50', '100', //hues which contrast should be 'dark' by default
        '200', '300', '400', 'A100'],
      'contrastLightColors': undefined    // could also specify this if default was 'dark'
    });

    $mdThemingProvider.theme('default')
      .primaryPalette('amazingPaletteName');
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
    '$mdThemingProvider',
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
    'angularCSS',
    'ngMaterial'
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
