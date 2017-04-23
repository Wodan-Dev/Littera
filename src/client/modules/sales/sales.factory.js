/**
 * Created by jonathan on 28/03/17.
 */
'use strict';
(function(angular, litteraApp) {

  function salesFactory(BASEURLS, LOCALNAME, localSave, $resource) {
    function getHeader() {
      return {
        'Content-Type': 'application/json',
        'x-access-token': localSave.getValueLS(LOCALNAME.USER_TOKEN)
      };
    }

    function getSale(page) {
      return $resource(BASEURLS.BASE_API +
        litteraApp.modules.sales.routes.sales(page), {},
        {
          get: {
            headers: getHeader()
          }
        }
      ).get({}).$promise;
    }

    return {
      getSale: getSale
    };
  }

  salesFactory.$inject = [
    'BASEURLS',
    'LOCALNAME',
    litteraApp.modules.sales.imports.localSave,
    '$resource'
  ];

  angular.module(litteraApp.modules.sales.name)
    .factory(litteraApp.modules.sales.factories.sales,
    salesFactory);
}(angular, litteraApp));
