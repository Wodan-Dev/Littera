/**
 * Created by jonathan on 07/05/17.
 */
'use strict';
(function (angular, litteraApp) {
  litteraApp.modules.business = {
    name: 'litteraApp.business',
    controllers: {
      bookPerformance: {
        name: 'BookPerformanceController',
        nameas: 'BookPerformanceCtrl'
      }
    },
    routes: {
      home: litteraApp.URLS.HOME(),
      booksPerformancePage: litteraApp.URLS.BUSINESS_BOOKS_PERFORMANCE_PAGE(),
      booksPerformance: litteraApp.URLS.BUSINESS_BOOKS_PERFORMANCE(),
      booksProfit: litteraApp.URLS.BUSINESS_BOOKS_PROFIT()
    },
    factories: {
      business: 'businessFactory'
    },
    services: {

    },
    templates: {
      bookPerformance: {
        url: 'views/book-performance.view.html'
      }
    },
    imports: {
      localSave: litteraApp.core.factories.localSave,
      request: litteraApp.core.services.request,
      message: litteraApp.core.services.messages,
      authentication: litteraApp.modules.auth.factories.authentication
    }
  };

  angular.module(litteraApp.modules.business.name, [
    litteraApp.core.name,
    'ngRoute',
    'ngResource',
  ]);

}(angular, litteraApp));
