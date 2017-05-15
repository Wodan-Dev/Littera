/**
 * Created by jonathan on 14/05/17.
 */
'use strict';
(function (angular, litteraApp) {
  function TrendsCtrl(
    $rootScope,
    $scope,
    $location,
    trendsService) {
    var vm = this;
    vm.topUsers = [];
    vm.topBooks = [];

    vm.init = function() {
      trendsService.getTrends()
        .then(function (trends) {
          vm.topUsers = trends.data.users;
          vm.topBooks = trends.data.books;
        })
        .catch(function (err) {
        });

    };
  }

  TrendsCtrl.$inject = [
    '$rootScope',
    '$scope',
    '$location',
    litteraApp.modules.feed.services.trends,
  ];

  angular.module(litteraApp.modules.feed.name)
    .controller(litteraApp.modules.feed.controllers.trends.name, TrendsCtrl);
}(angular, litteraApp));

