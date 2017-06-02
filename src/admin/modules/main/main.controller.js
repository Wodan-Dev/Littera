/**
 * Created by jonathan on 19/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  function MainCtrl(
    $rootScope,
    $window,
    $location,
    authentication) {
    var vm = this;
    vm.showModal = false;
    vm.showLoad = false;
    vm.isAuth = false;

    var appWindow = angular.element($window);

    appWindow.bind('resize', function () {
      vm.showModal = false;
      $rootScope.$broadcast('evt__showModal', false);
    });

    $rootScope.$on('evt__showModal', function(ev, value) {
      vm.showModal = value;
    });

    $rootScope.$on('evt__showLoad', function(ev, value) {
      vm.showLoad = value;
    });

    $rootScope.$on('evt_auth_event', function (ev, value) {
      vm.isAuth = value;
    });

    vm.init = function () {
      vm.showModal = false;
      vm.showLoad = false;
      vm.isAuth = authentication.isAuthenticated();
    };

    vm.btnLogOff = function () {
      authentication.logOut();
      $location.path(litteraApp.modules.main.routes.login);
      $rootScope.$broadcast('evt_auth_event', false);
      vm.isAuth = false;
    };
  }

  MainCtrl.$inject = [
    '$rootScope',
    '$window',
    '$location',
    litteraApp.modules.main.imports.authentication
  ];

  angular.module(litteraApp.modules.main.name)
    .controller(litteraApp.modules.main.controllers.main.name, MainCtrl);
}(angular, litteraApp));
