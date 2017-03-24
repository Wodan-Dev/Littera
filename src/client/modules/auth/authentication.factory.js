/**
 * Created by jonathan on 20/03/17.
 */
'use strict';
(function(angular, litteraApp) {
  function authenticationFactory(LOCALNAME, request, localSave) {
    function authenticate(usr, pass) {
      let user = {
        username: usr,
        password: pass
      };
      return request._post(litteraApp.modules.auth.routes.authenticate, user);
    }

    function setToken(value) {
      localSave.setValueLS(LOCALNAME.USER_TOKEN, value);
    }

    function credential() {
      return request._get(litteraApp.modules.auth.routes.me);
    }

    function logOut() {
      localSave.removeValueLS(LOCALNAME.USER_TOKEN);
    }

    function isAuthenticated() {
      var tok = localSave.getValueLS(LOCALNAME.USER_TOKEN);
      return tok !== null;
    }

    return {
      authenticate: authenticate,
      setToken: setToken,
      credential: credential,
      logOut: logOut,
      isAuthenticated: isAuthenticated
    };
  }

  authenticationFactory.$inject = ['LOCALNAME', litteraApp.modules.auth.imports.request,
    litteraApp.modules.auth.imports.localSave];

  angular.module(litteraApp.modules.auth.name)
    .factory(litteraApp.modules.auth.factories.authentication, authenticationFactory);
}(angular, litteraApp));
