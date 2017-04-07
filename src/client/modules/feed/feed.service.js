/**
 * Created by jonathan on 20/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  function FeedService(BASEURLS, LOCALNAME, localSave, $resource) {
    let Headers = {
      'Content-Type': 'application/json',
      'x-access-token': localSave.getValueLS(LOCALNAME.USER_TOKEN)
    };

    function getAll() {
      return $resource(BASEURLS.BASE_API +
        litteraApp.modules.store.routes.feed, {},
        {
          get: {
            headers: Headers
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
    litteraApp.modules.store.imports.localSave,
    '$resource'
  ];

  angular.module(litteraApp.modules.feed.name)
    .service(litteraApp.modules.feed.services.feed, FeedService);
}(angular, litteraApp));
