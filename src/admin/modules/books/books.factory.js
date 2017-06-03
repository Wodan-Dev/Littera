/**
 * Created by jonathan on 28/03/17.
 */
'use strict';
(function(angular, litteraApp) {

  function booksFactory(
    BASEURLS,
    LOCALNAME,
    localSave,
    $resource,
    request) {
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

    function getBookById(id) {
      return $resource(BASEURLS.BASE_API +
        litteraApp.modules.books.routes.bookDetail(id), {},
        {
          get: {
            headers: getHeader()
          }
        }
      ).get({}).$promise;
    }

    function update(book) {
      return request._put('/books', book);
    }

    function blockBook(id) {
      return request._post(litteraApp.modules.books.routes.blockBook, { _id: id });
    }

    function unlockBook(id) {
      return request._post(litteraApp.modules.books.routes.unlockBook, { _id: id });
    }

    return {
      getBooks: getBooks,
      getBookById: getBookById,
      update: update,
      blockBook: blockBook,
      unlockBook: unlockBook
    };
  }

  booksFactory.$inject = [
    'BASEURLS',
    'LOCALNAME',
    litteraApp.modules.books.imports.localSave,
    '$resource',
    litteraApp.modules.books.imports.request
  ];

  angular.module(litteraApp.modules.books.name)
    .factory(litteraApp.modules.books.factories.books,
    booksFactory);
}(angular, litteraApp));
