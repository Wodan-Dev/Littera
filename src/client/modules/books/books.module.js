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
      }
    },
    routes: {
      home: litteraApp.URLS.HOME(),
      books: litteraApp.URLS.BOOKS(),
      storeDetail: litteraApp.URLS.STOREDETAIL()
    },
    factories: {
      books: 'booksFactory'
    },
    services: {

    },
    templates: {
      books: {
        url: 'views/book-detail.view.html'
      }
    },
    imports: {
      localSave: litteraApp.core.factories.localSave,
      request: litteraApp.core.services.request,
      message: litteraApp.core.services.messages
    }
  };

  angular.module(litteraApp.modules.books.name, [
    litteraApp.core.name,
    'ngRoute',
    'ngResource',
  ]);

}(angular, litteraApp));
