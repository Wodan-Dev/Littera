/**
 * Created by jonathan on 14/05/17.
 */
'use strict';
(function (angular, litteraApp) {
  function TrendsService(
    BASEURLS,
    LOCALNAME,
    localSave,
    $resource) {
    function getHeader() {
      return {
        'Content-Type': 'application/json',
        'x-access-token': localSave.getValueLS(LOCALNAME.USER_TOKEN)
      };
    }

    function getTrends() {
      return $resource(BASEURLS.BASE_API +
        litteraApp.modules.feed.routes.trends, {},
        {
          get: {
            headers: getHeader()
          }
        }
      ).get({}).$promise;

    }

    return {
      getTrends: getTrends
    };
  }

  TrendsService.$inject = [
    'BASEURLS',
    'LOCALNAME',
    litteraApp.modules.feed.imports.localSave,
    '$resource'
  ];

  angular.module(litteraApp.modules.feed.name)
    .service(litteraApp.modules.feed.services.trends, TrendsService);
}(angular, litteraApp));
