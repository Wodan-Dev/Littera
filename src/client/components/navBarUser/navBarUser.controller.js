/**
 * Created by jonathan on 17/03/17.
 */
'use strict';

(function (angular, litteraApp) {

  function navBarUserController() {
    var vm = this;

    vm.User = {
      name: 'Jonathan',
      username: '@JonathanH',
      picture: './static/images/image (11).jpg'
    };

  }

  navBarUserController.$inject = [];

  angular.module(litteraApp.components.navBarUser.name)
    .controller(litteraApp.components.navBarUser.controller.name, navBarUserController);

}(angular, litteraApp));
