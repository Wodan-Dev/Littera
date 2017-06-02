/**
 * Created by jonathan on 17/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  function configApp(
    $httpProvider,
    $routeProvider,
    $locationProvider) {

    Chart.defaults.global.colours = [
      '#97BBCD', // blue
      '#DCDCDC', // light grey
      '#F7464A', // red
      '#46BFBD', // green
      '#FDB45C', // yellow
      '#949FB1', // grey
      '#4D5360'  // dark grey
    ];

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

  function runApp(
    $rootScope,
    authorization,
    $location,
    $interval,
    BASEURLS,
    $window,
    $anchorScroll,
    has_error) {
    $rootScope.__Title = 'Littera';
    $rootScope.__showModal = false;
    $rootScope.__showUserMenu = false;
    $rootScope.__showLinks = false;
    $rootScope.__showNotify = false;
    $rootScope.__showLoad = false;
    $rootScope.BASEURLS = BASEURLS;
    if(!$rootScope.__pathHistory)
      $rootScope.__pathHistory = [];

    $rootScope.$on('$routeChangeStart', function (event, next) {

      window.scrollTo(0, 0);
      $anchorScroll();
      has_error.clearError();
      $rootScope.__showModal = false;
      $rootScope.__showLinks = false;
      $rootScope.__showUserMenu = false;
      $rootScope.__showNotify = false;
      $rootScope.__showLoad = true;
      $rootScope.$broadcast('evt__showModal', false);
      $rootScope.$broadcast('evt__showLoad', true);
    });

    $rootScope.$on('$routeChangeSuccess', function (event, next) {
      window.scrollTo(0, 0);
      $anchorScroll();
      has_error.clearError();
      $rootScope.__Title = next.title || 'Littera';
      document.title = $rootScope.__Title;

      authorization.authorize(next)
       .then(function (url) {
         $rootScope.__pathHistory.push($location.$$path);
         $rootScope.$broadcast('evt_navBarUser_event', '');
       })
       .catch(function (url) {
         $location.path(url);
       });
    });

    $rootScope.$on('$viewContentLoaded', function(){
      var i = $interval(function () {
        $rootScope.$broadcast('evt__showModal', false);
        $rootScope.$broadcast('evt__showLoad', false);
        $interval.cancel(i);
      }, 1300);

    });

    $rootScope.$on('evt__showModal', function(ev, value) {
      $rootScope.__showModal = value;
    });

    $rootScope.$on('evt__showLoad', function(ev, value) {
      $rootScope.__showLoad = value;
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
    'BASEURLS',
    '$window',
    '$anchorScroll',
    litteraApp.core.services.has_error
  ];

  angular.module(litteraApp.modules.app.name, [
    litteraApp.modules.handlers.name,
    litteraApp.modules.main.name,
    litteraApp.modules.admin.name,
    litteraApp.modules.auth.name,
    litteraApp.core.name,
    'ngFileUpload',
    'angularCSS',
    'ngMaterial',
    'chart.js'
  ]).constant('BASEURLS', {
    BASE: 'http://litteraadm.pub',
    BASE_API: 'http://litteraadm.pub/api',
    URLS: litteraApp.URLS
  }).constant('LOCALNAME', {
    USER_TOKEN: 'User-Token'
  })
    .config(configApp)
    .run(runApp);
}(angular, litteraApp));
