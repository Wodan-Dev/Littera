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
      register: litteraApp.URLS.REGISTER(),
      loginNext: litteraApp.URLS.LOGINNEXT(),
      authenticate: litteraApp.URLS.MORDOR.AUTHENTICATION(),
      me: litteraApp.URLS.MORDOR.ME(),
      notAuthorized: litteraApp.URLS.NOTAUTHORIZED(),
      serverError: litteraApp.URLS.SERVERERROR(),
      user: litteraApp.URLS.USER()
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
      request: litteraApp.core.services.request,
      message: litteraApp.core.services.messages,
      has_error: litteraApp.core.services.has_error
    }
  };

  angular.module(litteraApp.modules.auth.name, [
    litteraApp.core.name,
    'ngRoute',
    'ngResource',
  ]);

}(angular, litteraApp));
