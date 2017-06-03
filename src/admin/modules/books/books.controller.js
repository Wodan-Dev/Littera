/**
 * Created by jonathan on 28/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  function BooksCtrl(
    $scope,
    $rootScope,
    $routeParams,
    $filter,
    $location,
    booksFactory,
    message,
    authentication) {
    var vm = this;
    vm.books = [];
    vm.actualPage = 1;

    function updateBooksList(data) {
      let t = vm.books.length;

      data.data.docs.map(function (item) {
        vm.books.push(item);
      });

      if (t === vm.books.length)
        message.notification('information', 'No momento não temos mais livros');

      $rootScope.$broadcast('evt__showLoad', false);
      if (!$scope.$$phase)
        $scope.$apply();
    }

    function loadData() {
      booksFactory.getBooks(vm.actualPage)
        .then(updateBooksList)
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

    vm.btnBlockBook = function (r) {
      booksFactory.blockBook(r._id)
        .then(function () {
          $scope.$apply(function () {
            r.visible = 3;
            message.notification('information', 'Bloqueado com sucesso.');
          });

        })
        .catch(function () {
          message.notification('information', 'Tente novamente.');
        });
    };

    vm.btnUnlockBook = function (r) {
      booksFactory.unlockBook(r._id)
        .then(function () {
          $scope.$apply(function () {
            r.visible = 0;
            message.notification('information', 'Desbloqueado com sucesso.');
          });

        })
        .catch(function () {
          message.notification('information', 'Tente novamente.');
        });
    };

  }

  BooksCtrl.$inject = [
    '$scope',
    '$rootScope',
    '$routeParams',
    '$filter',
    '$location',
    litteraApp.modules.books.factories.books,
    litteraApp.modules.books.imports.message,
    litteraApp.modules.books.imports.authentication
  ];

  angular.module(litteraApp.modules.books.name)
    .controller(litteraApp.modules.books.controllers.books.name, BooksCtrl);
}(angular, litteraApp));
