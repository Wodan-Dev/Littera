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
      }
    },
    routes: {
      home: litteraApp.URLS.HOME(),
      users: litteraApp.URLS.USERS()
    },
    factories: {
      users: 'usersFactory'
    },
    services: {

    },
    templates: {
      users: {
        url: 'views/users-create.view.html'
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
