/**
 * Created by jonathan on 19/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  litteraApp.modules.main = {
    name: 'litteraApp.main',
    controllers: {
      main: {
        name: 'MainController',
        nameas: 'MainCtrl'
      }
    },
    routes: {
      login: litteraApp.URLS.LOGIN()
    },
    factories: {
    },
    templates: {
    },
    imports: {
      authentication: litteraApp.modules.auth.factories.authentication
    }
  };

  angular.module(litteraApp.modules.main.name, [
    'ngRoute'
  ]);

}(angular, litteraApp));
