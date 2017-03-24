/**
 * Created by jonathan on 20/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  litteraApp.modules.auth = {
    name: 'litteraApp.auth',
    controllers: {
      login: {
        name: 'LoginController',
        nameas: 'LoginCtrl'
      }
    },
    routes: {
      login: litteraApp.URLS.LOGIN(),
      authenticate: litteraApp.URLS.MORDOR.AUTHENTICATION(),
      me: litteraApp.URLS.MORDOR.ME(),
      notAuthorized: litteraApp.URLS.NOTAUTHORIZED(),
      serverError: litteraApp.URLS.SERVERERROR()
    },
    factories: {
      authentication: 'authenticationFactory',
      authorization: 'authorizationFactory'
    },
    services: {
    },
    templates: {
      login: {
        url: 'views/login.view.html'
      }
    },
    imports: {
      localSave: litteraApp.core.factories.localSave,
      request: litteraApp.core.services.request
    }
  };

  angular.module(litteraApp.modules.auth.name, [
    litteraApp.core.name,
    'ngRoute',
    'ngResource',
  ]);

}(angular, litteraApp));

