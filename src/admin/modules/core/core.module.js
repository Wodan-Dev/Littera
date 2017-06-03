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
    components: {
      fileInput: {
        name: 'liFileInput'
      }
    },
    filters: {
      titleCase: 'titleCase',
      saleStatus: 'saleStatus',
      parentalRating: 'parentalRating',
      gender: 'gender'
    },
    imports: {

    }
  };

  angular.module(litteraApp.core.name, []);

}(angular, litteraApp));
