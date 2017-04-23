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
      }
    },
    routes: {
      sales_page: litteraApp.URLS.SALES_PAGE(),
      sales: litteraApp.URLS.SALES()
    },
    factories: {
      sales: 'salesFactory'
    },
    services: {

    },
    templates: {
      sales: {
        url: 'views/sales-detail.view.html'
      }
    },
    imports: {
      localSave: litteraApp.core.factories.localSave,
      request: litteraApp.core.services.request,
      message: litteraApp.core.services.messages
    }
  };

  angular.module(litteraApp.modules.sales.name, [
    litteraApp.core.name,
    'ngRoute',
    'ngResource',
  ]);

}(angular, litteraApp));
