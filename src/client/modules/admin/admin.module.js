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
      },
      terms: {
        name: 'TermsController',
        nameas: 'TermsCtrl'
      },
    },
    routes: {
      terms: litteraApp.URLS.TERMS()
    },
    factories: {
    },
    templates: {
      terms:{
        url: 'views/terms.view.html'
      }
    },
    imports: {
    }
  };

  angular.module(litteraApp.modules.main.name, [
    'ngRoute'
  ]);

}(angular, litteraApp));
