/**
 * Created by jonathan on 28/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  function StoreCtrl($scope, $rootScope, $window, $mdDialog, storeFactory, message) {
    var vm = this;
    vm.books = [];
    vm.actualPage = 1;
    var msnry = new Masonry( '.grid', {
      // options
      itemSelector: '.grid-item',
      columnWidth: '.grid-item',
      stagger: 30
    });



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

    function BookDetailController($scope, $mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }

    vm.btnShowDetail = function(ev) {
      $mdDialog.show({
        controller: BookDetailController,
        templateUrl: 'views/book-detail.tpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true // Only for -xs, -sm breakpoints.
      })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
      /*$rootScope.__showModal = true;
      document.getElementById('book-'+ id).style.display = 'block';*/
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
      storeFactory.getBooks(vm.actualPage)
        .then(function (data) {
          let t = vm.books.length;

          for (let i = 0, len = data.data.length; i < len; i++) {
            vm.books.push(data.data[i]);
          }



          msnry.layout();


          if (t === vm.books.length)
            message.notification('information', 'No momento não temos mais livros pra apresentar :(');
        })
        .catch(function (er) {

        });
    }

  }

  StoreCtrl.$inject = [
    '$scope',
    '$rootScope',
    '$window',
    '$mdDialog',
    litteraApp.modules.store.factories.store,
    litteraApp.modules.store.imports.message
  ];

  angular.module(litteraApp.modules.store.name)
    .controller(litteraApp.modules.store.controllers.store.name, StoreCtrl);
}(angular, litteraApp));

