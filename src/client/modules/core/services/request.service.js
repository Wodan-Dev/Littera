/**
 * Created by jonathan on 19/03/17.
 */
'use strict';

(function(angular, litteraApp) {

  function requestFactory(BASEURLS, LOCALNAME, localsave, $http, Upload) {

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

    function _upload(url, file) {
      return new Promise(function(resolve, reject) {
        let uri = BASEURLS.BASE_API + url;

        Upload.upload({
          url: 'http://localhost:3000/upload', //webAPI exposed to upload the file
          data: {
            file: file
          } //pass file as data, should be user ng-model
        })
          .then(function (data) {

          }, function (err) { //catch error
            //console.log('Error status: ' + resp.status);
            //$window.alert('Error status: ' + resp.status);
          }, function (evt) {
            //console.log(evt);
            //var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            //vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
          });





        /*let uri = BASEURLS.BASE_API + url;
        request('DELETE', uri, data || {})
          .then(function (data) {
            resolve(data);
          })
          .catch(function (data) {
            reject(data);
          });*/
      });
    }

    return {
      _get: _get,
      _post: _post,
      _put: _put,
      _delete: _delete,
      _upload: _upload
    };
  }

  requestFactory.$inject = [
    'BASEURLS',
    'LOCALNAME',
    litteraApp.core.factories.localSave,
    '$http',
    'Upload'
  ];

  angular.module(litteraApp.core.name)
    .service(litteraApp.core.services.request, requestFactory);
}(angular, litteraApp));
