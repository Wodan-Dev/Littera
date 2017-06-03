/**
 * Created by jonathan on 19/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  function DashboardCtrl(
    $rootScope,
    $window,
    dashBoardData) {
    var vm = this;
    vm.admin = {};

    vm.init = function () {
      vm.admin = dashBoardData.data;
    };


  }

  DashboardCtrl.$inject = [
    '$rootScope',
    '$window',
    'dashBoardData'
  ];

  angular.module(litteraApp.modules.admin.name)
    .controller(litteraApp.modules.admin.controllers.dashboard.name, DashboardCtrl);
}(angular, litteraApp));
