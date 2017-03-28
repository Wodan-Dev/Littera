/**
 * Created by jonathan on 24/03/17.
 */
'use strict';
(function (angular, litteraApp) {

  function notFoundFactory($location) {
    return {
      responseError: function(rejection) {
        return new Promise(function (resolve, reject) {
          if($location.url() !== litteraApp.modules.handlers.routes.login &&
            rejection.status === 404) {
            $location.path(litteraApp.modules.handlers.routes.notFound);
          }

          return reject(rejection);
        });
      }
    };
  }

  function notAuthorizedFactory($location) {
    return {
      responseError: function(rejection) {
        return new Promise(function (resolve, reject) {
          if($location.url() !== litteraApp.modules.handlers.routes.login &&
            rejection.status === 401){
            $location.path(litteraApp.modules.handlers.routes.notAuthorized);
          }

          return reject(rejection);
        });
      }
    };
  }

  function serverErrorFactory($location) {
    return {
      responseError: function(rejection) {
        return new Promise(function (resolve, reject) {
          if(rejection.status >= 500 && rejection.status <= 530){
            $location.path(litteraApp.modules.handlers.routes.serverError(rejection.status));
          }
          return reject(rejection);
        });
      }
    };
  }

  notFoundFactory.$inject = ['$location'];
  notAuthorizedFactory.$inject = ['$location'];
  serverErrorFactory.$inject = ['$location'];

  angular.module(litteraApp.modules.handlers.name)
    .factory(litteraApp.modules.handlers.factories.notFound, notFoundFactory)
    .factory(litteraApp.modules.handlers.factories.notAuthorized, notAuthorizedFactory)
    .factory(litteraApp.modules.handlers.factories.serverError, serverErrorFactory);

}(angular, litteraApp));
