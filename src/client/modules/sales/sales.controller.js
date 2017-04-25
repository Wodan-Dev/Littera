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
    message,
    authentication) {
    var vm = this;
    vm.saleItems = [];

    vm.init = function () {
      vm.saleItems = [];
      loadData();
    };

    function loadData() {
      let idUser = '';
      authentication.credential()
        .then(function (data) {
          idUser = data.data.data._id;
          return salesFactory.getCurrentSale(idUser);
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
          console.log(err);
          if(err.data.data.err)
            message.notification('information', err.data.data.err);
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
    litteraApp.modules.sales.imports.message,
    litteraApp.modules.sales.imports.authentication
  ];

  angular.module(litteraApp.modules.sales.name)
    .controller(litteraApp.modules.sales.controllers.sales.name, SalesCtrl);
}(angular, litteraApp));

