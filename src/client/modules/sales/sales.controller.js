/**
 * Created by jonathan on 28/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  function SalesCtrl(
    $scope,
    $rootScope,
    $window,
    $mdDialog,
    $mdMedia,
    $location,
    salesFactory,
    message) {
    var vm = this;
    vm.books = [];
    vm.actualPage = 1;

    vm.book = {
      _id: '',
      title: '',
      username: '',
      cover_image: '',
      synopsis: ''
    };

    vm.init = function () {
      vm.books = [];
      loadData();
    };

    function BookDetailController($mdDialog, book) {
      let vm = this;

      vm.book = book;

      vm.cancel = function() {
        $mdDialog.cancel();
      };

      vm.buy = function() {
        $mdDialog.hide('buy');
      };
    }

    vm.btnShowDetail = function(ev, cbook) {
      $mdDialog.show({
        controller: BookDetailController,
        templateUrl: 'views/book-detail.tpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        controllerAs: 'bookDetCtrl',
        locals: {
          book: cbook
        },
        clickOutsideToClose:true,
        fullscreen: ($mdMedia('sm') || $mdMedia('xs'))
      })
        .then(function() {
          $location.path('/books/'+cbook._id);
        }, function() {
        });
    };

    vm.showItemDetail = function (id) {
      return vm.book._id === id;
    };

    vm.btnCloseDetail = function (id) {
      document.getElementById('book-'+id).style.display = 'none';
      vm.book._id = '-';
      vm.showDetail = false;
      $rootScope.__showModal = false;
    };

    vm.btnLoadMore = function () {
      vm.actualPage++;
      loadData();

    };

    function loadData() {
      salesFactory.getSale(vm.actualPage)
        .then(function (data) {
          let t = vm.books.length;

          for (let i = 0, len = data.data.length; i < len; i++) {
            vm.books.push(data.data[i]);
          }




          if (t === vm.books.length)
            message.notification('information', 'No momento não temos mais livros pra apresentar :(');
        })
        .catch(function (er) {

        });
    }

  }

  SalesCtrl.$inject = [
    '$scope',
    '$rootScope',
    '$window',
    '$mdDialog',
    '$mdMedia',
    '$location',
    litteraApp.modules.sales.factories.sales,
    litteraApp.modules.sales.imports.message
  ];

  angular.module(litteraApp.modules.sales.name)
    .controller(litteraApp.modules.sales.controllers.sales.name, SalesCtrl);
}(angular, litteraApp));

