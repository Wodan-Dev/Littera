/**
 * Created by jonathan on 28/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  function StoreCtrl(
    $scope,
    $rootScope,
    $window,
    $mdDialog,
    $mdMedia,
    $location,
    storeFactory,
    message,
    salesFactory,
    authentication) {
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

    vm.btnAddBasket = function (id) {
      let idUser = '';
      authentication.credential()
        .then(function (data) {
          idUser = data.data.data._id;
          return salesFactory.getCurrentSale(idUser);
        })
        .then(function (data) {
          return new Promise(function (resolve, reject) {
            if (!data.data.length) {
              let sale = {
                _id_user: idUser,
                transaction_id: '-',
                status: '0',
                items: []
              };

              salesFactory.createSale(sale)
                .then(function (dt) {
                  resolve(dt.data.data);
                })
                .catch(function (err) {
                  reject(err);
                });
            }
            else
              resolve(data.data[0]);
          });
        })
        .then(function (data) {

          let saleItem = {
            _id_sale: data._id,
            _id_book: id,
            value: 0
          };

          return salesFactory.addToBasket(saleItem);
        })
        .then(function () {
          message.notification('information', 'Adicionado ao carrinho com sucesso!!');
        })
        .catch(function (err) {
          if(err.data.data.err)
            message.notification('information', err.data.data.err);
        });

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
    '$mdMedia',
    '$location',
    litteraApp.modules.store.factories.store,
    litteraApp.modules.store.imports.message,
    litteraApp.modules.store.imports.salesFactory,
    litteraApp.modules.store.imports.authentication
  ];

  angular.module(litteraApp.modules.store.name)
    .controller(litteraApp.modules.store.controllers.store.name, StoreCtrl);
}(angular, litteraApp));

