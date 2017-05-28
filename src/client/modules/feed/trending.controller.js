/**
 * Created by jonathan on 28/05/17.
 */
'use strict';
(function (angular, litteraApp) {
  function TrendingCtrl(
    $rootScope,
    $scope,
    $location,
    trendsService) {
    var vm = this;
    vm.topUsers = [];

    vm.init = function() {
      trendsService.getTrendings()
        .then(function (trends) {
          vm.topUsers = trends.data.users;
        })
        .catch(function (err) {
        });

    };
  }

  TrendingCtrl.$inject = [
    '$rootScope',
    '$scope',
    '$location',
    litteraApp.modules.feed.services.trends,
  ];

  angular.module(litteraApp.modules.feed.name)
    .controller(litteraApp.modules.feed.controllers.trending.name, TrendingCtrl);
}(angular, litteraApp));
