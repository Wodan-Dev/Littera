/**
 * Created by jonathan on 19/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  function FeedCtrl($rootScope, $window) {
    var vm = this;
  }

  FeedCtrl.$inject = ['$rootScope', '$window'];

  angular.module(litteraApp.modules.feed.name)
    .controller(litteraApp.modules.feed.controllers.feed.name, FeedCtrl);
}(angular, litteraApp));
