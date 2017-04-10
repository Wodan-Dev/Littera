/**
 * Created by jonathan on 17/03/17.
 */
'use strict';

(function (angular, litteraApp) {
  function navBarLinksController($location, $rootScope, authentication) {
    var vm = this;

    vm.User = {
      _id: '-',
      name: '',
      username: '',
      cover_image: '',
      username_link: ''
    };

    $rootScope.$on('evt_navBarLinks_event', function(ev, user) {
      if (user._id === '-') {
        vm.User._id = '-';
        vm.User.name = 'Participe';
        vm.User.cover_image = './static/images/no-image.png';
      }
      else {
        vm.User._id = user._id || '-';
        vm.User.name = user.name;
        vm.User.username_link = user.username_link;
        vm.User.username = user.username;
        vm.User.cover_image = user.cover_image || './static/images/no-image.png';
      }
    });

    vm.btnLogOff = function () {
      authentication.logOut();
      $location.path(litteraApp.components.navBarLinks.routes.home);
    };
  }

  navBarLinksController.$inject = [
    '$location',
    '$rootScope',
    litteraApp.components.navBarLinks.imports.authentication
  ];
  angular.module(litteraApp.components.navBarLinks.name)
    .controller(litteraApp.components.navBarLinks.controller.name, navBarLinksController);




}(angular, litteraApp));
