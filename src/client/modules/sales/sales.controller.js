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
    $filter,
    salesFactory,
    message,
    authentication) {
    var vm = this;
    vm.saleItems = [];
    let loggedUser = {};

    vm.init = function () {
      vm.saleItems = [];
      loadData();
    };

    vm.percentage = 0;

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

    vm.btnRemove = function (id) {
      salesFactory.removeFromBasket(vm.saleItems._id, id)
        .then(function () {
          $scope.$apply(function () {
            let selectedBook = $filter('filter')(vm.saleItems.items, { _id : id})[0];
            vm.saleItems.items.splice(vm.saleItems.items.indexOf(selectedBook) , 1);
          });

          message.notification('information', 'Removido com sucesso!');
        })
        .catch(function () {

        });
    };

    function loadData() {
      authentication.credential()
        .then(function (data) {
          loggedUser = data.data.data;
          return salesFactory.getCurrentSale(loggedUser._id);
        })
        .then(function (data) {
          return new Promise(function (resolve, reject) {
            if (!data.data.length) {
              reject({
                data: {
                  data: {
                    err: 'Nenhum produto adicionado no carrinho!'
                  }
                }
              });
            }
            else
              resolve(data.data[0]);
          });
        })
        .then(function (data) {
          vm.saleItems = data;

        })
        .catch(function (err) {
          if(err.data.data.err)
            message.notification('information', err.data.data.err);
        });
    }

    vm.btnCheckOut = function () {

      $rootScope.__showLoad = true;
      salesFactory.finalize(vm.saleItems._id)
        .then(function () {
          $scope.$apply(function () {
            message.notification('success', 'Compra concluida com sucesso!');
            $location.path('/user/'+loggedUser.username);
          });
        })
        .catch(function () {

        });
    };

  }

  SalesCtrl.$inject = [
    '$scope',
    '$rootScope',
    '$window',
    '$mdDialog',
    '$mdMedia',
    '$location',
    '$filter',
    litteraApp.modules.sales.factories.sales,
    litteraApp.modules.sales.imports.message,
    litteraApp.modules.sales.imports.authentication
  ];

  angular.module(litteraApp.modules.sales.name)
    .controller(litteraApp.modules.sales.controllers.sales.name, SalesCtrl);
}(angular, litteraApp));

