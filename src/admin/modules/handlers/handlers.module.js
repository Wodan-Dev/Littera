/**
 * Created by jonathan on 24/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  litteraApp.modules.handlers = {
    name: 'litteraApp.handlers',
    controllers: {
      notAuthorized: {
        name: 'NotAuthorizedController',
        nameas: 'NotAuthorizedCtrl'
      },
      notFound: {
        name: 'NotFoundController',
        nameas: 'NotFoundCtrl'
      },
      serverError: {
        name: 'ServerErrorController',
        nameas: 'ServerErrorCtrl'
      }
    },
    routes: {
      notAuthorized: litteraApp.URLS.NOTAUTHORIZED(),
      notFound: litteraApp.URLS.NOTFOUND(),
      serverError: litteraApp.URLS.SERVERERROR(),
      login: litteraApp.URLS.LOGIN()
    },
    factories: {
      notFound: 'notFoundInterceptorFactory',
      notAuthorized: 'notAuthorizedInterceptorFactory',
      serverError: 'serverErrorInterceptorFactory'
    },
    services: {
    },
    templates: {
      notAuthorized:{
        url: '401.html'
      },
      notFound:{
        url: '404.html'
      },
      serverError:{
        url: '5xx.html'
      }
    },
    imports: {
    }
  };

  angular.module(litteraApp.modules.handlers.name, [
    'ngRoute'
  ]);

}(angular, litteraApp));
