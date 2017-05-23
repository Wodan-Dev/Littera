/**
 * Created by jonathan on 20/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  function LoginCtrl($rootScope, $scope, $routeParams, $location, authFactory, has_error) {
    let vm = this;
    vm.user = {
      username: '',
      pass: ''
    };

    vm.init = function () {
      has_error.clearError();
      authFactory.logOut();
    };

    vm.hasError = function (field) {
      return has_error.hasError(field);
    };

    vm.getErrorMessage = function (field) {
      return has_error.getErrorMessage(field);
    };

    vm.btnCreate = function () {
      $location.path(litteraApp.modules.auth.routes.register);
    };

    vm.btnAuthenticate = function () {

      has_error.clearError();
      $rootScope.$broadcast('evt__showLoad', true);
      let token = '';

      authFactory.authenticate(vm.user.username, vm.user.pass)
        .then(function (data) {
          token = data.data.data.toString();
          return authFactory.setToken(data.data.data.toString());
        })
        .then(function () {

          $scope.$apply(function () {
            let uri = $routeParams.next || '/feed';

            if (uri[0] !== '/')
              uri = '/' + $routeParams.next;

            $location.path(uri);
            $rootScope.$broadcast('evt_navBarUser_event', token);
          });
        })
        .catch(function (data) {

          let lst = data.data.data.err;
          $scope.$apply(function () {
            if (lst instanceof Array) {
              for (var i = 0, len = lst.length; i < len; i++) {
                has_error.addError(lst[i].field, lst[i].message);
              }
            }
            else {
              has_error.addError(data.data.data.value, data.data.data.err);
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
    litteraApp.modules.auth.imports.has_error
  ];

  angular.module(litteraApp.modules.auth.name)
    .controller(litteraApp.modules.auth.controllers.login.name, LoginCtrl);
}(angular, litteraApp));
