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
      dashboard: litteraApp.URLS.HOME()
    },
    factories: {
    },
    templates: {
      dashboard:{
        url: 'views/dashboard-view.html'
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
