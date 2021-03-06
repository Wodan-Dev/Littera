/**
 * Created by jonathan on 19/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  litteraApp.modules.admin = {
    name: 'litteraApp.admin',
    controllers: {
      admin: {
        name: 'AdminController',
        nameas: 'AdminCtrl'
      }
    },
    routes: {
      admin: litteraApp.URLS.ADMIN()
    },
    factories: {
    },
    templates: {
      admin:{
        url: 'admin.html'
      }
    },
    imports: {
    }
  };

  angular.module(litteraApp.modules.admin.name, [
    litteraApp.core.name,
    'ngRoute'
  ]);

}(angular, litteraApp));
