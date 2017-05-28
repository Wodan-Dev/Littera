/**
 * Created by jonathan on 24/03/17.
 */
'use strict';
(function(angular, litteraApp) {

  function authorizationFactory(authentication) {
    function authorize(next) {
      return new Promise(function (resolve, reject) {
        let requiresLogin = false;
        console.log('authorize');
        console.log(next);

        if (next.access !== undefined &&
          next.access.hasOwnProperty('requiresLogin')) {
          requiresLogin = next.access.requiresLogin;
        }

        if (requiresLogin) {
          if (!authentication.isAuthenticated()) {
            authentication.logOut();
            console.log('next');
            console.log(next);
            reject(litteraApp.modules.auth.routes.login);
          }
          else {
            authentication.credential(function (err, data, success, status) {
              if (status === 200) {
                resolve('');
              }
              else if (status === 401) {
                authentication.logOut();
                console.log('next');
                console.log(next);
                reject(litteraApp.modules.auth.routes.login);
              }
              else {
                reject(litteraApp.modules.auth.routes.serverError(status));
              }

            });
          }
        }
        else{
          console.log('resolve(');
          resolve('');
        }

      });

    }

    return {
      authorize: authorize
    };
  }

  authorizationFactory.$inject = [
    litteraApp.modules.auth.factories.authentication];

  angular.module(litteraApp.modules.auth.name)
    .factory(litteraApp.modules.auth.factories.authorization, authorizationFactory);
}(angular, litteraApp));
