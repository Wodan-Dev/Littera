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
      },
      register: {
        name: 'RegisterController',
        nameas: 'RegisterCtrl'
      },
      password: {
        name: 'PasswordController',
        nameas: 'PasswordCtrl'
      }
    },
    routes: {
      login: litteraApp.URLS.LOGIN(),
      register: litteraApp.URLS.REGISTER(),
      loginNext: litteraApp.URLS.LOGINNEXT(),
      authenticate: litteraApp.URLS.MORDOR.AUTHENTICATION(),
      me: litteraApp.URLS.MORDOR.ME(),
      change_pass: litteraApp.URLS.CHANGE_PASS(),
      change: litteraApp.URLS.MORDOR.CHANGE(),
      forgot: litteraApp.URLS.MORDOR.FORGOT(),
      notAuthorized: litteraApp.URLS.NOTAUTHORIZED(),
      serverError: litteraApp.URLS.SERVERERROR(),
      user: litteraApp.URLS.USER(),
      forgot_pass: litteraApp.URLS.FORGOT_PASS(),
      recover: litteraApp.URLS.MORDOR.RECOVER(),
      recover_pass: litteraApp.URLS.RECOVER_PASS(),
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
      },
      register: {
        url: 'views/register.view.html'
      },
      password: {
        url: 'views/users-password.view.html'
      },
      forgot: {
        url: 'views/forgot-password.view.html'
      },
      recover: {
        url: 'views/user-recover.view.html'
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
