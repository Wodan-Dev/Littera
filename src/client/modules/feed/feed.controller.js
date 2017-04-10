/**
 * Created by jonathan on 19/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  function FeedCtrl($rootScope, $scope, $location, request, authentication, feedService, message) {
    var vm = this;
    vm.actualPage = 1;
    vm.feedItems = [];

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
      getData()
        .then(updateList)
        .catch(function (err) {
          /*console.log('data init err');
          console.log(err);*/
        });
    };

    vm.btnLoadMore = function () {
      vm.actualPage++;
      getData()
        .then(updateList)
        .catch(function (err) {
          console.log('data init err');
          console.log(err);
        });
    };

    function updateList(data) {
      let t = vm.feedItems.length;

      if (data.data) {
        for (let i = 0, len = data.data.docs.length; i < len; i++) {
          vm.feedItems.push(data.data.docs[i]);
        }

        if (t === vm.feedItems.length)
          message.notification('information', 'No momento não temos mais posts para apresentar :(');


        /*vm.feedItems = data.data.docs;*/
      }

    }
/*
    request._get('/users/req.body36/feed')
      .then(function (data) {
        $scope.$apply(function () {

          console.log('data');
          console.log(data);
          vm.feedItems = data.data.data.docs;
          console.log(vm.feedItems);
        });
      })
      .catch(function (err) {
        console.log(err);
      });*/

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
