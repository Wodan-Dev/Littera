/**
 * Created by jonathan on 19/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  function MainCtrl($rootScope, $window) {
    var vm = this;
    vm.showModal = false;
    vm.showLoad = false;

    var appWindow = angular.element($window);

    appWindow.bind('resize', function () {
      vm.showModal = false;
      $rootScope.$broadcast('evt__showModal', false);
      $rootScope.__showModal = false;
      $rootScope.__showLinks = false;
      $rootScope.__showUserMenu = false;
      $rootScope.__showNotify = false;
    });

    $rootScope.$on('evt__showModal', function(ev, value) {
      vm.showModal = value;
    });

    $rootScope.$on('evt__showLoad', function(ev, value) {
      vm.showLoad = value;
    });

    vm.init = function () {
      vm.showModal = false;
      vm.showLoad = false;
    };

    vm.btnHideModal = function () {
      if (!vm.showLoad) {
        vm.showModal = false;
        $rootScope.$broadcast('evt__showModal', false);
        $rootScope.__showModal = false;
        $rootScope.__showLinks = false;
        $rootScope.__showUserMenu = false;
        $rootScope.__showNotify = false;
      }

    };
  }

  MainCtrl.$inject = ['$rootScope', '$window'];

  angular.module(litteraApp.modules.main.name)
    .controller(litteraApp.modules.main.controllers.main.name, MainCtrl);
}(angular, litteraApp));
