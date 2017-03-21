/**
 * Created by jonathan on 19/03/17.
 */
'use strict';

(function(angular, litteraApp) {

  function requestFactory(BASEURLS, LOCALNAME, localsave, $http) {

    function getHeader() {
      return {
        'Content-Type': 'application/json',
        'x-access-token': localsave.getValueLS(LOCALNAME.USER_TOKEN)
      };
    }

    function request(method, url, data) {
      return $http({
        method: method,
        url: url,
        data: data,
        headers: getHeader()
      });
    }

    function _get(url) {
      return new Promise(function(resolve, reject) {
        let uri = BASEURLS.BASE_API + url;
        request('GET', uri, {})
          .then(function (data) {
            resolve(data);
          })
          .catch(function (data) {
            reject(data);
          });
      });
    }

    function _post(url, data) {
      return new Promise(function(resolve, reject) {
        let uri = BASEURLS.BASE_API + url;
        request('POST', uri, data || {})
          .then(function (data) {
            resolve(data);
          })
          .catch(function (data) {
            reject(data);
          });
      });
    }

    function _put(url, data) {
      return new Promise(function(resolve, reject) {
        let uri = BASEURLS.BASE_API + url;
        request('PUT', uri, data || {})
          .then(function (data) {
            resolve(data);
          })
          .catch(function (data) {
            reject(data);
          });
      });
    }

    function _delete(url, data) {
      return new Promise(function(resolve, reject) {
        let uri = BASEURLS.BASE_API + url;
        request('DELETE', uri, data || {})
          .then(function (data) {
            resolve(data);
          })
          .catch(function (data) {
            reject(data);
          });
      });
    }

    return {
      _get: _get,
      _post: _post,
      _put: _put,
      _delete: _delete
    };
  }

  requestFactory.$inject = ['BASEURLS', 'LOCALNAME',
    litteraApp.core.factories.localSave, '$http'];

  angular.module(litteraApp.core.name)
    .service(litteraApp.core.services.request, requestFactory);
}(angular, litteraApp));
