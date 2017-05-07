/**
 * Created by jonathan on 06/05/17.
 */
'use strict';
(function (angular, litteraApp) {
  function BoughtCtrl(
    $scope,
    $rootScope,
    $location,
    $filter,
    message,
    salesData) {
    var vm = this;
    vm.actualPage = 1;
    vm.saleItems = [];

    vm.init = function () {

      vm.saleItems = salesData.sales.docs;
    };

    vm.btnLoadMore = function () {
      vm.actualPage++;
      loadData();

    };

    function loadData() {
      salesData.salesFactory.getSale(salesData.user._id, vm.actualPage)
        .then(function (data) {
          let t = vm.saleItems.length;
          for (let i = 0, len = data.data.docs.length; i < len; i++) {
            vm.saleItems.push(data.data.docs[i]);
          }

          if (t === vm.saleItems.length)
            message.notification('information', 'Não há mais compras para exibir.');
        })
        .catch(function (er) {

        });
    }

  }

  BoughtCtrl.$inject = [
    '$scope',
    '$rootScope',
    '$location',
    '$filter',
    litteraApp.modules.sales.imports.message,
    'salesData'
  ];

  angular.module(litteraApp.modules.sales.name)
    .controller(litteraApp.modules.sales.controllers.bought.name, BoughtCtrl);
}(angular, litteraApp));

