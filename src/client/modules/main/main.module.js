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
    },
    factories: {
    },
    templates: {
    },
    imports: {
    }
  };

  angular.module(litteraApp.modules.main.name, [
    'ngRoute'
  ]);

}(angular, litteraApp));
