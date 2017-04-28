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
      bookCreate: {
        name: 'BookCreateController',
        nameas: 'BookCreateCtrl'
      }
    },
    routes: {
      home: litteraApp.URLS.HOME(),
      books: litteraApp.URLS.BOOKS(),
      storeDetail: litteraApp.URLS.STOREDETAIL(),
      bookCreate: litteraApp.URLS.BOOK_CREATE()
    },
    factories: {
      books: 'booksFactory'
    },
    services: {

    },
    templates: {
      books: {
        url: 'views/book-detail.view.html'
      },
      bookCreate: {
        url: 'views/book-create.view.html'
      }
    },
    imports: {
      localSave: litteraApp.core.factories.localSave,
      request: litteraApp.core.services.request,
      message: litteraApp.core.services.messages,
      authentication: litteraApp.modules.auth.factories.authentication,
      has_error: litteraApp.core.services.has_error,
      salesFactory: litteraApp.modules.sales.factories.sales
    }
  };

  angular.module(litteraApp.modules.books.name, [
    litteraApp.core.name,
    'ngRoute',
    'ngResource',
  ]);

}(angular, litteraApp));
