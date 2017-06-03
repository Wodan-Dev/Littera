/**
 * Created by jonathan on 19/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  litteraApp.modules.admin = {
    name: 'litteraApp.admin',
    controllers: {
      dashboard: {
        name: 'DashboardController',
        nameas: 'DashboardCtrl'
      }
    },
    routes: {
      dashboard_page: litteraApp.URLS.HOME(),
      dashboard: litteraApp.URLS.ADMIN_DASHBOARD()
    },
    factories: {
      admin: 'adminFactory'
    },
    templates: {
      dashboard:{
        url: 'views/dashboard-view.html'
      }
    },
    imports: {
      localSave: litteraApp.core.factories.localSave,
      request: litteraApp.core.services.request,
      message: litteraApp.core.services.messages
    }
  };

  angular.module(litteraApp.modules.admin.name, [
    litteraApp.core.name,
    'ngRoute'
  ]);

}(angular, litteraApp));
