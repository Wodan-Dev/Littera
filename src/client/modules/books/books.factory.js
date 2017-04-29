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

    function updateImg(url, file) {
      return request._upload(url, file);
    }

    function create(user) {
      return request._post('/books', user);
    }

    function saveRanking(ranking) {
      return request._post('/books/rankings', ranking);
    }

    function saveComment(comment) {
      return request._post('/books/comments', comment);
    }

    return {
      getBooks: getBooks,
      getStoreBookById: getStoreBookById,
      updateImg: updateImg,
      create: create,
      saveRanking: saveRanking,
      saveComment: saveComment
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
