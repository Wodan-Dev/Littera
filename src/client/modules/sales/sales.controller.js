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

/*
    vm.opts = {
      env: 'sandbox',
      client: {
        sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
        production: '--'
      },
      payment: function() {
        var env    = this.props.env;
        var client = this.props.client;
        return paypal.rest.payment.create(env, client, {
          transactions: [
            {
              amount: { total: '1.00', currency: 'USD' }
            }
          ]
        });
      },
      commit: true, // Optional: show a 'Pay Now' button in the checkout flow
      onAuthorize: function(data, actions) {
        // Optional: display a confirmation page here
        return actions.payment.execute().then(function() {
          // Show a success page to the buyer
          message.notification('information', 'comprado com sucesso!');
        });
      }
    };*/

    vm.init = function () {
      vm.saleItems = [];
      loadData();
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
      if (vm.saleItems.items.length > 0) {

        let items = [];
        vm.saleItems.items.map(function (item) {
          items.push({
            _id:item._id,
            _id_book: item._id_book,
            value: item.value
          });
        });

        let sale = {
          status: 0,
          items: items
        };
/*
        salesFactory.updateSale(vm.saleItems._id, { sale: sale })
          .then(function (data) {
            console.log(data);
          })
          .catch(function (er) {
            console.log(er);
          });*/


        salesFactory.finalize(vm.saleItems._id, { items: items } )
          .then(function () {
            $scope.$apply(function () {
              message.notification('success', 'Compra concluída com sucesso!');
              $location.url('/user/'+loggedUser.username + '?tab=1');
            });
          })
          .catch(function () {

          });
      }
      else
        message.notification('warning', 'Nenhum produto adicionado no carrinho!');

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

