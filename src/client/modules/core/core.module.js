/**
 * Created by jonathan on 19/03/17.
 */
'use strict';

(function (angular, litteraApp) {
  litteraApp.core = {
    name: 'litteraApp.core',
    services: {
      request: 'requestService',
      messages: 'messagesService',
      has_error: 'has_errorService'
    },
    factories: {
      localSave: 'localSaveFactory'
    },
    imports: {

    }
  };

  angular.module(litteraApp.core.name, []);

}(angular, litteraApp));
