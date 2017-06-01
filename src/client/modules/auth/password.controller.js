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
      console.log('a');
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
    };

    vm.btnForgotPass = function () {
      authFactory.logOut();
      has_error.clearError();
      $rootScope.$broadcast('evt__showLoad', true);

      if (!vm.user.email)
        has_error.addError('email', 'Informe seu e-mail');

      if (!vm.user.username)
        has_error.addError('username', 'Informe seu usuário');

      if (!has_error.getAllErrors().length) {
        authFactory.forgotPass(vm.user)
          .then(function () {
            $scope.$apply(function () {
              message.notification('information', 'Se tudo estiver correto você receberá um e-mail, verifique seu spam :)');

              $rootScope.$broadcast('evt__showLoad', false);
              $location.path(litteraApp.modules.auth.routes.login);
            });
          })
          .catch(function () {
            $scope.$apply(function () {
              message.notification('information', 'Se tudo estiver correto você receberá um e-mail, verifique seu spam :)');

              $rootScope.$broadcast('evt__showLoad', false);
              $location.path(litteraApp.modules.auth.routes.login);
            });
          });
      }
      else
        $rootScope.$broadcast('evt__showLoad', false);
    };

    function convertField(field) {
      switch (field) {
      case 'password':
        return 'newPass';
      case 'passwordbis':
        return 'newPassBis';
      default:
        return field;
      }
    }

    vm.btnRecoverPass = function () {
      authFactory.logOut();
      has_error.clearError();
      $rootScope.$broadcast('evt__showLoad', true);

      if (!vm.user.email)
        has_error.addError('email', 'Informe seu e-mail');

      if (!vm.user.username)
        has_error.addError('username', 'Informe seu usuário');

      if (!vm.user.newPass)
        has_error.addError('newPass', 'Informe a senha');

      if (!vm.user.newPassBis)
        has_error.addError('newPassBis', 'Confirme a senha');

      if (!has_error.getAllErrors().length) {
        authFactory.recoverPass({
          email: vm.user.email || '',
          username: vm.user.username || '',
          checksum: $routeParams.checksum || '',
          password: vm.user.newPass || '',
          passwordbis: vm.user.newPassBis || ''
        })
          .then(function () {
            $scope.$apply(function () {
              message.notification('information', 'Se tudo estiver correto você receberá um e-mail, verifique seu spam :)');

              $rootScope.$broadcast('evt__showLoad', false);
              $location.path(litteraApp.modules.auth.routes.login);
            });
          })
          .catch(function (data) {
            let lst = data.data.data.err;
            $scope.$apply(function () {
              if (lst instanceof Array) {
                for (var i = 0, len = lst.length; i < len; i++) {
                  has_error.addError(convertField(lst[i].field), lst[i].message);
                }
              }
              else {
                has_error.addError(convertField(data.data.data.value),
                 data.data.data.err);
              }
              $rootScope.$broadcast('evt__showLoad', false);

            });
          });
      }
      else
        $rootScope.$broadcast('evt__showLoad', false);
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
