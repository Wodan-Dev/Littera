/**
 * Created by jonathan on 28/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  litteraApp.modules.users = {
    name: 'litteraApp.users',
    controllers: {
      users: {
        name: 'UsersController',
        nameas: 'UsersCtrl'
      },
      writtenBooks: {
        name: 'WrittenBooksController',
        nameas: 'WrittenBooksCtrl'
      }
    },
    routes: {
      home: litteraApp.URLS.HOME(),
      users: litteraApp.URLS.USERS(),
      writtenbooks: litteraApp.URLS.WRITTENBOOKS(),
      writtenbooks_page: litteraApp.URLS.WRITTENBOOKS_PAGE()
    },
    factories: {
      users: 'usersFactory',
      writtenBooks: 'writtenBooksFactory'
    },
    services: {

    },
    templates: {
      users: {
        url: 'views/users-create.view.html'
      },
      writtenBooks: {
        url: 'views/written-books.view.html'
      }
    },
    imports: {
      localSave: litteraApp.core.factories.localSave,
      request: litteraApp.core.services.request,
      message: litteraApp.core.services.messages,
      authentication: litteraApp.modules.auth.factories.authentication,
      has_error: litteraApp.core.services.has_error
    }
  };

  angular.module(litteraApp.modules.users.name, [
    litteraApp.core.name,
    'ngRoute',
    'ngResource',
  ]);

}(angular, litteraApp));


