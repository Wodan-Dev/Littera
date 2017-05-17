/**
 * Created by jonathan on 19/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  function FeedCtrl(
    $rootScope,
    $scope,
    $location,
    request,
    authentication,
    feedService,
    message) {
    var vm = this;
    vm.actualPage = 1;
    vm.feedItems = [];
    let loading = false;

    $location.search('next', null);

    function getData() {
      return authentication.credential()
        .then(function (data) {
          return feedService.getAll(data.data.data.username, vm.actualPage);
        })
        .catch(function () {

        });
    }

    vm.init = function() {
      loading = true;
      getData()
        .then(updateList)
        .catch(function (err) {
        });
    };

    vm.btnLoadMore = function () {
      vm.actualPage++;
      getData()
        .then(updateList)
        .catch(function (err) {
          loading = false;
        });
    };

    function updateList(data) {
      $scope.$apply(function () {
        let t = vm.feedItems.length;
        if (data.data) {
          for (let i = 0, len = data.data.length; i < len; i++) {
            vm.feedItems.push(data.data[i]);
          }

          if (t === vm.feedItems.length && !loading)
            message.notification('information', 'No momento não temos mais posts para apresentar :(');


          loading = false;
        }
      });
    }
  }

  FeedCtrl.$inject = [
    '$rootScope',
    '$scope',
    '$location',
    litteraApp.modules.feed.imports.request,
    litteraApp.modules.feed.imports.authentication,
    litteraApp.modules.feed.services.feed,
    litteraApp.modules.feed.imports.message
  ];

  angular.module(litteraApp.modules.feed.name)
    .controller(litteraApp.modules.feed.controllers.feed.name, FeedCtrl);
}(angular, litteraApp));
