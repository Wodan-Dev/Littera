/**
 * Created by jonathan on 28/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  litteraApp.modules.sales = {
    name: 'litteraApp.sales',
    controllers: {
      sales: {
        name: 'SalesController',
        nameas: 'SalesCtrl'
      },
      bought: {
        name: 'BoughtController',
        nameas: 'BoughtCtrl'
      }
    },
    routes: {
      sales_page: litteraApp.URLS.SALES_PAGE(),
      sales: litteraApp.URLS.SALES(),
      wishList: litteraApp.URLS.WISHLIST(),
      bought_page: litteraApp.URLS.BOOKS_BOUGHT_PAGE()
    },
    factories: {
      sales: 'salesFactory'
    },
    services: {

    },
    templates: {
      sales: {
        url: 'views/sales-detail.view.html'
      },
      bought: {
        url: 'views/books-bought.view.html'
      }
    },
    imports: {
      localSave: litteraApp.core.factories.localSave,
      request: litteraApp.core.services.request,
      message: litteraApp.core.services.messages,
      authentication: litteraApp.modules.auth.factories.authentication
    }
  };

  angular.module(litteraApp.modules.sales.name, [
    litteraApp.core.name,
    'ngRoute',
    'ngResource',
  ]);

}(angular, litteraApp));
