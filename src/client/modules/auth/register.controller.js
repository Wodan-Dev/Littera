/**
 * Created by jonathan on 01/04/17.
 */
'use strict';
(function (angular, litteraApp) {
  function RegisterCtrl(
    $rootScope,
    $scope,
    $routeParams,
    $location,
    authFactory,
    has_error,
    message) {
    let vm = this;
    vm.user = {
      name: '',
      username: '',
      email: '',
      password: '',
      passwordbis: '',
      acepted_terms: false
    };

    vm.init = function () {
      authFactory.logOut();
    };

    vm.hasError = function (field) {
      return has_error.hasError(field);
    };

    vm.getErrorMessage = function (field) {
      return has_error.getErrorMessage(field);
    };

    vm.btnCreate = function () {
      if (vm.user.acepted_terms) {
        has_error.clearError();
        $rootScope.$broadcast('evt__showLoad', true);
        let token = '';

        vm.user.acepted_terms = '1';

        authFactory.register(vm.user)
          .then(function () {
            return authFactory.authenticate(vm.user.username, vm.user.password);
          })
          .then(function (data) {
            token = data.data.data;
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
      }
      else
        message.notification('warning', 'Você deve aceitar os termos.');

    };
  }

  RegisterCtrl.$inject = [
    '$rootScope',
    '$scope',
    '$routeParams',
    '$location',
    litteraApp.modules.auth.factories.authentication,
    litteraApp.modules.auth.imports.has_error,
    litteraApp.modules.auth.imports.message
  ];

  angular.module(litteraApp.modules.auth.name)
    .controller(litteraApp.modules.auth.controllers.register.name, RegisterCtrl);
}(angular, litteraApp));
