/**
 * Created by jonathan on 20/03/17.
 */
'use strict';
(function(angular, litteraApp) {
  function authenticationFactory(LOCALNAME, request, localSave, $interval) {
    function authenticate(usr, pass) {
      let user = {
        username: usr,
        password: pass
      };
      return request._post(litteraApp.modules.auth.routes.authenticate, user);
    }

    function setToken(value) {
      console.log(localSave);
      return new Promise(function (resolve, reject) {

        let i = $interval(function(){
          console.log('pp');
          localSave.setValueLS(LOCALNAME.USER_TOKEN, value);
          $interval.cancel(i);
          resolve();
        }, 2000);
      });


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

  authenticationFactory.$inject = [
    'LOCALNAME',
    litteraApp.modules.auth.imports.request,
    litteraApp.modules.auth.imports.localSave,
    '$interval'
  ];

  angular.module(litteraApp.modules.auth.name)
    .factory(litteraApp.modules.auth.factories.authentication, authenticationFactory);
}(angular, litteraApp));
