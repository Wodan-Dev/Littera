/**
 * Created by jonathan on 17/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  function runApp($rootScope)
  {
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
      /*authorization.authorize(next)
       .then(function (url) {

       })
       .catch(function (url) {
       $location.path(url);
       });*/
    });

    $rootScope.$on('$viewContentLoaded', function(){

    });

  }

  runApp.$inject = ['$rootScope'];

  angular.module(litteraApp.modules.app.name, [
    litteraApp.components.header.name,
    litteraApp.components.navBarLinks.name,
    litteraApp.components.navBarUser.name,
    litteraApp.components.navBarNotify.name,
    litteraApp.modules.main.name,
    litteraApp.modules.feed.name
  ]).constant('BASEURLS', {
    BASE: 'http://portal.com',
    BASE_API: 'http://portal.com/api',
    URLS: litteraApp.URLS
  })
    .run(runApp);
}(angular, litteraApp));
