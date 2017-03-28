/**
 * Created by jonathan on 20/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  function LoginCtrl($rootScope, $window, authFactory) {
    var vm = this;
    vm.user = {
      username: '',
      pass: ''
    };

    vm.btnAuthenticate = function () {
      authFactory.authenticate(vm.user.username, vm.user.pass)
        .then(function (data) {
          authFactory.setToken(data.data.data);
          console.log(data.data);
        })
        .catch(function (data) {
          console.log(data);
        });

    };


  }

  LoginCtrl.$inject = ['$rootScope', '$window',
    litteraApp.modules.auth.factories.authentication];

  angular.module(litteraApp.modules.auth.name)
    .controller(litteraApp.modules.auth.controllers.login.name, LoginCtrl);
}(angular, litteraApp));
