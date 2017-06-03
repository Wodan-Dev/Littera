/**
 * Created by jonathan on 28/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  litteraApp.modules.books = {
    name: 'litteraApp.books',
    controllers: {
      books: {
        name: 'BooksController',
        nameas: 'BooksCtrl'
      },
      bookDetail: {
        name: 'BookDetailController',
        nameas: 'BookDetailCtrl'
      }
    },
    routes: {
      home: litteraApp.URLS.HOME(),
      books: litteraApp.URLS.BOOKS(),
      bookDetail: litteraApp.URLS.BOOKS_DETAIL(),
      blockBook:  litteraApp.URLS.USER_BLOCKBOOK(),
      unlockBook:  litteraApp.URLS.USER_UNLOCKBOOK(),
    },
    factories: {
      books: 'booksFactory'
    },
    services: {

    },
    templates: {
      books: {
        url: 'views/books-list.view.html'
      },
      bookDetail: {
        url: 'views/book-detail.view.html'
      }
    },
    imports: {
      localSave: litteraApp.core.factories.localSave,
      request: litteraApp.core.services.request,
      message: litteraApp.core.services.messages,
      authentication: litteraApp.modules.auth.factories.authentication,
    }
  };

  angular.module(litteraApp.modules.books.name, [
    litteraApp.core.name,
    'ngRoute',
    'ngResource',
  ]);

}(angular, litteraApp));
