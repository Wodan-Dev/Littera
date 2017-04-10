/**
 * Created by jonathan on 20/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  function FeedService(BASEURLS, LOCALNAME, localSave, $resource) {
    function getHeader() {
      return {
        'Content-Type': 'application/json',
        'x-access-token': localSave.getValueLS(LOCALNAME.USER_TOKEN)
      };
    }

    function getAll(user, page) {
      return $resource(BASEURLS.BASE_API +
        litteraApp.modules.feed.routes.feed(user) + '?page=' + page, {},
        {
          get: {
            headers: getHeader()
          }
        }
      ).get({}).$promise;

    }

    function getById() {

    }

    return {
      getAll: getAll,
      getById: getById
    };
  }

  FeedService.$inject = [
    'BASEURLS',
    'LOCALNAME',
    litteraApp.modules.feed.imports.localSave,
    '$resource'
  ];

  angular.module(litteraApp.modules.feed.name)
    .service(litteraApp.modules.feed.services.feed, FeedService);
}(angular, litteraApp));
