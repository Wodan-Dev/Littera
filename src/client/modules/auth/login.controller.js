/**
 * Created by jonathan on 20/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  function LoginCtrl($rootScope, $window, $routeParams, $location, authFactory) {
    var vm = this;

    vm.user = {
      username: '',
      pass: ''
    };

    vm.btnAuthenticate = function () {


      authFactory.authenticate(vm.user.username, vm.user.pass)
        .then(function (data) {
          authFactory.setToken(data.data.data.toString());
          $location.path((($routeParams.next) ? '/' + $routeParams.next : '/'));
        })
        .catch(function (data) {
          $location.path('/feed');
        });
    };


  }

  LoginCtrl.$inject = [
    '$rootScope',
    '$window',
    '$routeParams',
    '$location',
    litteraApp.modules.auth.factories.authentication
  ];

  angular.module(litteraApp.modules.auth.name)
    .controller(litteraApp.modules.auth.controllers.login.name, LoginCtrl);
}(angular, litteraApp));
