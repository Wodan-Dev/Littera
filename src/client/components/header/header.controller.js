/**
 * Created by jonathan on 17/03/17.
 */
'use strict';

(function (angular, litteraApp) {

  function headerController($rootScope, $window) {
    var vm = this;
    vm.showSearch = false;
    vm.actualPage = 'page';
    vm.User = {
      _id: '',
      name: '',
      username: '',
      cover_image: '',
      username_link: ''
    };

    $rootScope.$on('evt_header_event', function(ev, user) {
      vm.User.cover_image = '';
      if (user._id === '-') {
        vm.User._id = '-';
        vm.User.name = 'Participe';
        vm.User.cover_image = './static/images/no-image.png';
      }
      else {
        vm.User._id = user._id || '-';
        vm.User.name = user.name;
        vm.User.username = user.username;
        vm.User.username_link = user.username_link;
        vm.User.cover_image = user.cover_image ?
                                user.cover_image + '?' + new Date().getTime() :
                                './static/images/no-image.png';
      }
    });

    vm.init = function () {

    };

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
        '18.75rem' :  vm.User._id === '-' ? '13.6rem' : '9.375rem';
    };

    //'13.6rem';

    vm.txtSearchSize = function () {
      return ($window.innerWidth >= 600) ?
        '18.75rem' : vm.User._id === '-' ? '13.6rem' : '9.375rem';
    };

    vm.btnShowUserMenu = function () {
      $rootScope.__showModal = true;
      $rootScope.$broadcast('evt__showModal', true);
      $rootScope.__showUserMenu = !$rootScope.__showUserMenu;
    };

    vm.btnShowLinks = function () {
      if (!vm.showSearch){
        $rootScope.__showModal = true;
        $rootScope.$broadcast('evt__showModal', true);
        $rootScope.__showLinks = !$rootScope.__showLinks;
      }

    };

    vm.btnUserNotify = function () {
      vm.showSearch = false;
      $rootScope.$broadcast('evt__showModal', true);
      $rootScope.__showModal = true;
      $rootScope.__showLinks = false;
      $rootScope.__showNotify = !$rootScope.__showNotify;
    };



  }

  headerController.$inject = [
    '$rootScope',
    '$window'
  ];

  angular.module(litteraApp.components.header.name)
    .controller(litteraApp.components.header.controller.name, headerController);




}(angular, litteraApp));
