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
      userDetail: {
        name: 'UserDetailController',
        nameas: 'UserDetailCtrl'
      }
    },
    routes: {
      home: litteraApp.URLS.HOME(),
      users: litteraApp.URLS.USERS(),
      users_all: litteraApp.URLS.USERS_ALL(),
      userDetail_page: litteraApp.URLS.USER_DETAIL_PAGE(),
      userDetail: litteraApp.URLS.USER_DETAIL(),
      blockUser:  litteraApp.URLS.USER_BLOCKUSER(),
      unlockUser:  litteraApp.URLS.USER_UNLOCKUSER(),
    },
    factories: {
      users: 'usersFactory'
    },
    services: {

    },
    templates: {
      users: {
        url: 'views/users-list.view.html'
      },
      userDetail: {
        url: 'views/user-detail.view.html'
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
