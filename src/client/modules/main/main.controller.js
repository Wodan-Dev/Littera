/**
 * Created by jonathan on 19/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  function MainCtrl($rootScope, $window) {
    var vm = this;
    vm.showModal = $rootScope.__showModal;
    var appWindow = angular.element($window);

    appWindow.bind('resize', function () {
      vm.showModal = false;
      $rootScope.__showModal = false;
      $rootScope.__showLinks = false;
      $rootScope.__showUserMenu = false;
      $rootScope.__showNotify = false;
    });

    vm.btnHideModal = function () {
      if (!$rootScope.__showLoad) {
        vm.showModal = false;
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
