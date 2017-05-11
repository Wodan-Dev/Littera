/**
 * Created by jonathan on 07/05/17.
 */
'use strict';
(function(angular, litteraApp) {

  function BusinessFactory(BASEURLS, LOCALNAME, localSave, $resource) {
    function getHeader() {
      return {
        'Content-Type': 'application/json',
        'x-access-token': localSave.getValueLS(LOCALNAME.USER_TOKEN)
      };
    }

    function getBooksSalesPerformance(username) {
      return $resource(BASEURLS.BASE_API +
        litteraApp.modules.business.routes.booksPerformance(username), {},
        {
          get: {
            headers: getHeader()
          }
        }
      ).get({}).$promise;
    }

    function getBooksSalesProfit(username) {
      return $resource(BASEURLS.BASE_API +
        litteraApp.modules.business.routes.booksProfit(username), {},
        {
          get: {
            headers: getHeader()
          }
        }
      ).get({}).$promise;
    }

    return {
      getBooksSalesPerformance: getBooksSalesPerformance,
      getBooksSalesProfit: getBooksSalesProfit
    };
  }

  BusinessFactory.$inject = [
    'BASEURLS',
    'LOCALNAME',
    litteraApp.modules.business.imports.localSave,
    '$resource'
  ];

  angular.module(litteraApp.modules.business.name)
    .factory(litteraApp.modules.business.factories.business,
    BusinessFactory);
}(angular, litteraApp));
