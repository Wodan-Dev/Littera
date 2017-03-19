/**
 * Created by jonathan on 17/03/17.
 */
'use strict';

(function (angular, litteraApp) {
  function navBarLinksController() {
    var vm = this;

    vm.User = {
      name: 'Jonathan Henrique do Vale'
    };

  }

  navBarLinksController.$inject = [];
  angular.module(litteraApp.components.navBarLinks.name)
    .controller(litteraApp.components.navBarLinks.controller.name, navBarLinksController);




}(angular, litteraApp));
