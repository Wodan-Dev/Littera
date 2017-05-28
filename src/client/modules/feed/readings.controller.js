/**
 * Created by jonathan on 14/05/17.
 */
'use strict';
(function (angular, litteraApp) {
  function ReadingsCtrl(
    $rootScope,
    $scope,
    $location,
    $mdDialog,
    $mdMedia,
    $filter,
    trendsService,
    authentication,
    message,
    salesFactory) {
    var vm = this;
    vm.topBooks = [];
    vm.loggedUser = {};

    function loadData() {
      trendsService.getReadings()
        .then(function (trends) {
          vm.topBooks = trends.data.books;
        })
        .catch(function (err) {
        });
    }

    vm.init = function() {
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
          $location.path('/books/'+ cbook._id);
        }, function() {
        });
    };

    vm.goToBook = function (id) {
      $location.path('/books/' + id);
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
          if (err.status === 401)
            message.notification('information', 'Você precisa estar logado :)');
          else if(err.data.data.err)
            message.notification('information', err.data.data.err);
        });

    };

  }

  ReadingsCtrl.$inject = [
    '$rootScope',
    '$scope',
    '$location',
    '$mdDialog',
    '$mdMedia',
    '$filter',
    litteraApp.modules.feed.services.trends,
    litteraApp.modules.feed.imports.authentication,
    litteraApp.modules.feed.imports.message,
    litteraApp.modules.feed.imports.salesFactory
  ];

  angular.module(litteraApp.modules.feed.name)
    .controller(litteraApp.modules.feed.controllers.readings.name, ReadingsCtrl);
}(angular, litteraApp));
