/**
 * Created by jonathan on 20/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  function LoginCtrl(
    $rootScope,
    $scope,
    $routeParams,
    $location,
    authFactory,
    message) {
    let vm = this;
    vm.user = {
      username: '',
      pass: ''
    };

    vm.init = function () {
      authFactory.logOut();
    };

    vm.btnCreate = function () {
      $location.path(litteraApp.modules.auth.routes.register);
    };

    vm.btnAuthenticate = function () {
      $rootScope.$broadcast('evt__showLoad', true);
      let token = '';

      authFactory.authenticate(vm.user.username, vm.user.pass)
        .then(function (data) {
          token = data.data.data.toString();
          return authFactory.setToken(data.data.data.toString());
        })
        .then(function () {

          $scope.$apply(function () {
            $location.path('/');

            $rootScope.$broadcast('evt_auth_event', true);
          });
        })
        .catch(function (data) {

          let lst = data.data.data.err;
          $scope.$apply(function () {
            if (lst instanceof Array) {
              for (var i = 0, len = lst.length; i < len; i++) {
                message.notification('information', lst[i].message);
              }
            }
            else {
              message.notification('information', data.data.data.err);
            }
            $rootScope.$broadcast('evt__showLoad', false);

          });

        });
    };
  }

  LoginCtrl.$inject = [
    '$rootScope',
    '$scope',
    '$routeParams',
    '$location',
    litteraApp.modules.auth.factories.authentication,
    litteraApp.modules.auth.imports.message
  ];

  angular.module(litteraApp.modules.auth.name)
    .controller(litteraApp.modules.auth.controllers.login.name, LoginCtrl);
}(angular, litteraApp));
