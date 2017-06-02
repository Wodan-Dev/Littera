/**
 * Created by jonathan on 19/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  function DashboardCtrl($rootScope, $window) {
    var vm = this;
  }

  DashboardCtrl.$inject = ['$rootScope', '$window'];

  angular.module(litteraApp.modules.admin.name)
    .controller(litteraApp.modules.admin.controllers.dashboard.name, DashboardCtrl);
}(angular, litteraApp));
