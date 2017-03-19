/**
 * Created by jonathan on 17/03/17.
 */
'use strict';

(function (angular, litteraApp) {

  function headerController($rootScope, $window) {
    var vm = this;
    vm.showSearch = false;

    vm.btnSearch = function () {
      vm.showSearch = !vm.showSearch;
      $rootScope.__showUserMenu = false;
    };

    vm.navSize = function () {
      return ($window.innerWidth >= 600) ?
        '25rem' : '15.625rem';
    };

    vm.btnUserSize = function () {
      return ($window.innerWidth >= 600) ?
        '18.75rem' : '9.375rem';
    };

    vm.txtSearchSize = function () {
      return ($window.innerWidth >= 600) ?
        '18.75rem' : '9.375rem';
    };

    vm.btnShowUserMenu = function () {
      $rootScope.__showModal = true;
      $rootScope.__showUserMenu = !$rootScope.__showUserMenu;
    };

    vm.btnShowLinks = function () {
      if (!vm.showSearch){
        $rootScope.__showModal = true;
        $rootScope.__showLinks = !$rootScope.__showLinks;
      }

    };

    vm.btnUserNotify = function () {
      vm.showSearch = false;
      $rootScope.__showModal = true;
      $rootScope.__showLinks = false;
      $rootScope.__showNotify = !$rootScope.__showNotify;
    };

    vm.actualPage = 'page';
    vm.User = {
      name: 'Jonathan Henrique do Vale',
      username: '@JonathanH',
      picture: './static/images/image (11).jpg'
    };

  }

  headerController.$inject = ['$rootScope', '$window'];

  angular.module(litteraApp.components.header.name)
    .controller(litteraApp.components.header.controller.name, headerController);




}(angular, litteraApp));
