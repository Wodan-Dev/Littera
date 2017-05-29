/**
 * Created by jonathan on 28/05/17.
 */
'use strict';
(function (angular, litteraApp) {
  function PasswordCtrl(
    $rootScope,
    $scope,
    $routeParams,
    $location,
    authFactory,
    has_error,
    message) {
    let vm = this;
    vm.user = {
      email: '',
      username: '',
      password: '',
      newPass: '',
      newPassBis: ''
    };

    vm.init = function () {
      has_error.clearError();
      authFactory.credential()
        .then(function (data) {
          vm.user.username = data.data.data.username;
        })
        .catch(function () {

        });
    };

    vm.hasError = function (field) {
      return has_error.hasError(field);
    };

    vm.getErrorMessage = function (field) {
      return has_error.getErrorMessage(field);
    };

    vm.btnChangePass = function () {

      has_error.clearError();
      let token = '';
      let msg = 'Você será desconectado e terá que entrar novamente, deseja continuar?';

      message.confirm(msg)
        .then(function (ok) {
          $rootScope.$broadcast('evt__showLoad', true);
          return authFactory.changePass(vm.user);
        })
        .then(function (data) {
          authFactory.logOut();
          $scope.$apply(function () {
            $location.path(litteraApp.modules.auth.routes.login);
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



/*
      authFactory.authenticate(vm.user.username, vm.user.pass)
        .then(function (data) {
          token = data.data.data.toString();
          return authFactory.setToken(data.data.data.toString());
        })
        .then(function () {

          $scope.$apply(function () {
            let uri = $routeParams.next || '/feed';

            if (!$routeParams.history) {
              if (uri[0] !== '/')
                uri = '/' + $routeParams.next;



              $location.path(uri);
            }
            else
              window.history.back();

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

        });*/
    };
  }

  PasswordCtrl.$inject = [
    '$rootScope',
    '$scope',
    '$routeParams',
    '$location',
    litteraApp.modules.auth.factories.authentication,
    litteraApp.modules.auth.imports.has_error,
    litteraApp.modules.auth.imports.message
  ];

  angular.module(litteraApp.modules.auth.name)
    .controller(litteraApp.modules.auth.controllers.password.name, PasswordCtrl);
}(angular, litteraApp));
