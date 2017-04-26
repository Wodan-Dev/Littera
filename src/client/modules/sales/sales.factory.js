/**
 * Created by jonathan on 28/03/17.
 */
'use strict';
(function(angular, litteraApp) {

  function salesFactory(
    BASEURLS,
    LOCALNAME,
    $resource,
    localSave,
    request) {
    function getHeader() {
      return {
        'Content-Type': 'application/json',
        'x-access-token': localSave.getValueLS(LOCALNAME.USER_TOKEN)
      };
    }

    function getSale(id) {
      return $resource(BASEURLS.BASE_API +
        litteraApp.modules.sales.routes.sales + '/' + id, {},
        {
          get: {
            headers: getHeader()
          }
        }
      ).get({}).$promise;
    }

    function getCurrentSale(id) {
      return $resource(BASEURLS.BASE_API +
        litteraApp.modules.sales.routes.sales + '/user/' + id, {},
        {
          get: {
            headers: getHeader()
          }
        }
      ).get({}).$promise;
    }

    function addToBasket(item) {
      return request._post(litteraApp.modules.sales.routes.sales + '/books', item);
    }

    function createSale(sale) {
      return request._post(litteraApp.modules.sales.routes.sales, sale);
    }

    function removeFromBasket(idSale, idBook) {
      return request._delete(litteraApp.modules.sales.routes.sales+'/' + idSale + '/books/'+idBook);
    }

    return {
      getSale: getSale,
      createSale: createSale,
      addToBasket: addToBasket,
      getCurrentSale: getCurrentSale,
      removeFromBasket: removeFromBasket
    };
  }

  salesFactory.$inject = [
    'BASEURLS',
    'LOCALNAME',
    '$resource',
    litteraApp.modules.sales.imports.localSave,
    litteraApp.modules.sales.imports.request
  ];

  angular.module(litteraApp.modules.sales.name)
    .factory(litteraApp.modules.sales.factories.sales,
    salesFactory);
}(angular, litteraApp));
