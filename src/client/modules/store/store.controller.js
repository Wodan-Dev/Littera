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
    $filter,
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
      horizontalOrder: true,
      percentPosition: true,
      stagger: 30
    });

    vm.loggedUser = {};

    vm.book = {
      _id: '',
      title: '',
      username: '',
      cover_image: '',
      synopsis: ''
    };

    vm.init = function () {
      vm.books = [];
      if (vm.isLogged()) {
        authentication.credential()
          .then(function (data) {
            vm.loggedUser = data.data.data;

            loadData();
          })
          .catch(function () {

          });
      }
      else {
        loadData();
      }
    };

    vm.isLogged = function () {
      return authentication.isAuthenticated();
    };

    vm.btnAddToWishList = function (id) {
      if (vm.isLogged() && !vm.inWishList(id)) {
        authentication.credential()
          .then(function (data) {
            return salesFactory.addToWishList(data.data.data.username, { _id_book: id });
          })
          .then(function () {
            $scope.$apply(function () {
              vm.loggedUser.wishlist.push({
                _id: Math.floor(Math.random(0, 1) * 99999999999999999).toString() + new Date().getTime(),
                _id_book: id,
                date_saved: moment()
              });
            });

            message.notification('information', 'Adicionado a lista de desejos com sucesso!!');
          })
          .catch(function (err) {
            if(err.data.data.err)
              message.notification('information', err.data.data.err);
          });
      }
      else if (vm.isLogged() && vm.inWishList(id)) {
        authentication.credential()
          .then(function (data) {
            return salesFactory.removeFromWishList(data.data.data.username, id);
          })
          .then(function () {
            $scope.$apply(function () {
              let selectedBook = $filter('filter')(vm.loggedUser.wishlist, { _id_book : id})[0];
              vm.loggedUser.wishlist.splice(vm.loggedUser.wishlist.indexOf(selectedBook) , 1);
            });

            message.notification('alert', 'Removido da lista de desejos com sucesso!!');
          })
          .catch(function (err) {
            if(err.data.data.err)
              message.notification('information', err.data.data.err);
          });
      }
    };

    vm.inWishList = function (id) {
      if (vm.isLogged() &&
         (vm.loggedUser.wishlist) &&
         (vm.loggedUser.wishlist.length)) {
        return $filter('filter')(vm.loggedUser.wishlist, { _id_book: id }).length;
      }

      return false;
    };

    function getActualPrice(prices) {

      let off = $filter('filter')(prices, { active:1, type: 1 });
      if (off.length)
        return off;

      return $filter('filter')(prices, { type: 0 });
    }

    vm.getMinPrice = function (prices) {

      if (prices.length) {
        return getActualPrice(prices)[0].price_min;
      }
      return 0;
    };

    vm.getSugPrice = function (prices) {

      if (prices.length) {
        return getActualPrice(prices)[0].price_sug;
      }
      return 0;
    };

    vm.btnAddBasket = function (id, sugPrice) {
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
            _id_user: idUser,
            _id_sale: data._id,
            _id_book: id,
            value: sugPrice
          };

          return salesFactory.addToBasket(saleItem);

        })
        .then(function () {
          message.notification('information', 'Adicionado ao carrinho com sucesso!!')
            .then(function () {
              $scope.$apply(function () {
                $location.path('/sales/');
              });
            });
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
    '$filter',
    litteraApp.modules.store.factories.store,
    litteraApp.modules.store.imports.message,
    litteraApp.modules.store.imports.salesFactory,
    litteraApp.modules.store.imports.authentication
  ];

  angular.module(litteraApp.modules.store.name)
    .controller(litteraApp.modules.store.controllers.store.name, StoreCtrl);
}(angular, litteraApp));

