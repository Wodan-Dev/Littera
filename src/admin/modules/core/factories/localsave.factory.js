/**
 * Created by jonathan on 19/03/17.
 */
'use strict';

(function(angular, litteraApp) {

  function localSaveFactory($window) {
    return {
      getValueLS: function (key) {
        return $window.localStorage.getItem(key);
      },

      setValueLS: function (key, value) {
        $window.localStorage.setItem(key, value);
      },

      getJSONValueLS: function (key) {
        try {
          return JSON.parse($window.localStorage.getItem(key));
        }
        catch (e) {
          return {};
        }
      },

      setJSONValueLS: function (key, value) {
        $window.localStorage.setItem(key, JSON.stringify(value));
      },

      removeValueLS: function (key) {
        $window.localStorage.removeItem(key);
      }
    };
  }

  localSaveFactory.$inject = ['$window'];

  angular.module(litteraApp.core.name)
    .service(litteraApp.core.factories.localSave, localSaveFactory);
}(angular, litteraApp));
