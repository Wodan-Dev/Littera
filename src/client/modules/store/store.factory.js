/**
 * Created by jonathan on 28/03/17.
 */
'use strict';
(function(angular, litteraApp) {

  function storeFactory(BASEURLS, LOCALNAME, localSave, $resource) {
    function getHeader() {
      return {
        'Content-Type': 'application/json',
        'x-access-token': localSave.getValueLS(LOCALNAME.USER_TOKEN)
      };
    }

    function getBooks(page, query) {
      let qry = litteraApp.modules.store.routes.store(page);
      if (query)
        qry = litteraApp.modules.store.routes.store_query(page, query);


      return $resource(BASEURLS.BASE_API +
        qry, {},
        {
          get: {
            headers: getHeader()
          }
        }
      ).get({}).$promise;
    }

    function getBookById(id) {
      return $resource(BASEURLS.BASE_API +
        litteraApp.modules.store.routes.books(id), {},
        {
          get: {
            headers: getHeader()
          }
        }
      ).get({}).$promise;
    }

    return {
      getBooks: getBooks,
      getBookById: getBookById
    };
  }

  storeFactory.$inject = [
    'BASEURLS',
    'LOCALNAME',
    litteraApp.modules.store.imports.localSave,
    '$resource'
  ];

  angular.module(litteraApp.modules.store.name)
    .factory(litteraApp.modules.store.factories.store,
    storeFactory);
}(angular, litteraApp));
