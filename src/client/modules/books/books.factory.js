/**
 * Created by jonathan on 28/03/17.
 */
'use strict';
(function(angular, litteraApp) {

  function booksFactory(BASEURLS, LOCALNAME, localSave, $resource) {
    function getHeader() {
      return {
        'Content-Type': 'application/json',
        'x-access-token': localSave.getValueLS(LOCALNAME.USER_TOKEN)
      };
    }

    function getBooks(page) {
      return $resource(BASEURLS.BASE_API +
        litteraApp.modules.books.routes.books('?page=' + page), {},
        {
          get: {
            headers: getHeader()
          }
        }
      ).get({}).$promise;
    }

    function getStoreBookById(id) {
      return $resource(BASEURLS.BASE_API +
        litteraApp.modules.books.routes.storeDetail(id), {},
        {
          get: {
            headers: getHeader()
          }
        }
      ).get({}).$promise;
    }

    return {
      getBooks: getBooks,
      getStoreBookById: getStoreBookById
    };
  }

  booksFactory.$inject = [
    'BASEURLS',
    'LOCALNAME',
    litteraApp.modules.books.imports.localSave,
    '$resource'
  ];

  angular.module(litteraApp.modules.books.name)
    .factory(litteraApp.modules.books.factories.books,
    booksFactory);
}(angular, litteraApp));
