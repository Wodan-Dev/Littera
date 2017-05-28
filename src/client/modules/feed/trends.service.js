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
        litteraApp.modules.feed.routes.trends +
        '?topuser=4&topsale=3', {},
        {
          get: {
            headers: getHeader()
          }
        }
      ).get({}).$promise;
    }

    function getReadings() {
      return $resource(BASEURLS.BASE_API +
        litteraApp.modules.feed.routes.trends +
        '?topuser=1&topsale=20', {},
        {
          get: {
            headers: getHeader()
          }
        }
      ).get({}).$promise;
    }

    function getTrendings() {
      return $resource(BASEURLS.BASE_API +
        litteraApp.modules.feed.routes.trends +
        '?topuser=20&topsale=1', {},
        {
          get: {
            headers: getHeader()
          }
        }
      ).get({}).$promise;
    }

    return {
      getTrends: getTrends,
      getReadings: getReadings,
      getTrendings: getTrendings
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
