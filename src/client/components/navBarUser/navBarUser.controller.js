/**
 * Created by jonathan on 17/03/17.
 */
'use strict';

(function (angular, litteraApp) {
  angular.module(litteraApp.components.navBar.name)
  .controller(litteraApp.components.navBar.controllers.navBar.name, navBarController);

  navBarController.$inject = [];

  function navBarController() {
    var vm = this;

    vm.User = {
      name: 'Jonathan',
      username: '@JonathanH',
      picture: '../../images/image (11).jpg'
    };

  };

}(angular, litteraApp));
