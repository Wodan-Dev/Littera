/**
 * Created by jonathan on 28/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  function UsersCtrl($scope,
                     $rootScope,
                     $filter,
                     $location,
                     message,
                     usersFactory) {
    var vm = this;
    vm.users = [];
    vm.actualPage = 1;

    function updateUsersList(data) {
      let t = vm.users.length;

      data.data.docs.map(function (item) {
        vm.users.push(item);
      });

      if (t === vm.users.length)
        message.notification('information', 'No momento não temos mais usuários');

      $rootScope.$broadcast('evt__showLoad', false);
      if (!$scope.$$phase)
        $scope.$apply();
    }

    function loadData() {
      usersFactory.getUsers(vm.actualPage)
        .then(updateUsersList)
        .catch(function (er) {
        });
    }

    vm.btnLoadMore = function () {
      vm.actualPage++;
      loadData();
    };

    vm.init = function () {
      loadData();
    };

    vm.btnBlockUser = function (r) {
      usersFactory.blockUser(r._id)
        .then(function () {
          $scope.$apply(function () {
            r.status = false;
            message.notification('information', 'Bloqueado com sucesso.');
          });

        })
        .catch(function () {
          message.notification('information', 'Tente novamente.');
        });
    };

    vm.btnUnlockUser = function (r) {
      usersFactory.unlockUser(r._id)
        .then(function () {
          $scope.$apply(function () {
            r.status = true;
            message.notification('information', 'Desbloqueado com sucesso.');
          });

        })
        .catch(function () {
          message.notification('information', 'Tente novamente.');
        });
    };



  }

  UsersCtrl.$inject = [
    '$scope',
    '$rootScope',
    '$filter',
    '$location',
    litteraApp.modules.users.imports.message,
    litteraApp.modules.users.factories.users
  ];

  angular.module(litteraApp.modules.users.name)
    .controller(litteraApp.modules.users.controllers.users.name, UsersCtrl);
}(angular, litteraApp));
