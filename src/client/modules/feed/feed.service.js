/**
 * Created by jonathan on 20/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  function FeedService($resource) {
    function getAll() {


    }

    function getById() {

    }

    return {
      getAll: getAll,
      getById: getById
    };
  }

  FeedService.$inject = ['$resource'];

  angular.module(litteraApp.modules.feed.name)
    .service(litteraApp.modules.feed.services.feed, FeedService);
}(angular, litteraApp));
