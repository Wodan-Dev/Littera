/**
 * Created by jonathan on 28/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  litteraApp.modules.store = {
    name: 'litteraApp.store',
    controllers: {
      store: {
        name: 'StoreController',
        nameas: 'StoreCtrl'
      }
    },
    routes: {
      home: litteraApp.URLS.HOME(),
      store: litteraApp.URLS.STORE()
    },
    factories: {
      store: 'storeFactory'
    },
    services: {

    },
    templates: {
      store: {
        url: 'views/book-store.view.html'
      }
    },
    imports: {
      localSave: litteraApp.core.factories.localSave,
      request: litteraApp.core.services.request,
      message: litteraApp.core.services.messages,
      authentication: litteraApp.modules.auth.factories.authentication,
      salesFactory: litteraApp.modules.sales.factories.sales
    }
  };

  angular.module(litteraApp.modules.store.name, [
    litteraApp.core.name,
    'ngRoute',
    'ngResource',
  ]);

}(angular, litteraApp));
