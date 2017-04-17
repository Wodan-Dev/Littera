/**
 * Created by jonathan on 12/04/17.
 */
'use strict';
(function (angular, litteraApp) {
  function WrittenBooksCtrl($rootScope, $scope, $location, request, authentication, writtenBooksFactory, message) {
    var vm = this;
    vm.actualPage = 1;
    vm.lstWrittenBooks = [];
    let loading = false;

    $location.search('next', null);

    function getData() {
      return authentication.credential()
        .then(function (data) {
          return writtenBooksFactory.getWrittenBooks(data.data.data.username, vm.actualPage);
        })
        .catch(function () {

        });
    }

    vm.init = function() {
      loading = true;
      getData()
        .then(updateList)
        .catch(function () {
        });
    };

    vm.btnLoadMore = function () {
      vm.actualPage++;
      getData()
        .then(updateList)
        .catch(function () {
          loading = false;
        });
    };

    function updateList(data) {
      let t = vm.lstWrittenBooks.length;
      console.log('data');
      console.log(data);
      if (data.data) {
        for (let i = 0, len = data.data.length; i < len; i++) {
          vm.lstWrittenBooks.push(data.data[i]);
        }

        if (t === vm.lstWrittenBooks.length && !loading)
          message.notification('information', 'No momento não temos mais livros para apresentar :(');


        loading = false;
      }

    }
  }

  WrittenBooksCtrl.$inject = [
    '$rootScope',
    '$scope',
    '$location',
    litteraApp.modules.users.imports.request,
    litteraApp.modules.users.imports.authentication,
    litteraApp.modules.users.factories.writtenBooks,
    litteraApp.modules.users.imports.message
  ];

  angular.module(litteraApp.modules.users.name)
    .controller(litteraApp.modules.users.controllers.writtenBooks.name, WrittenBooksCtrl);
}(angular, litteraApp));
