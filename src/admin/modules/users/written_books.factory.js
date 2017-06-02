/**
 * Created by jonathan on 12/04/17.
 */
'use strict';
(function(angular, litteraApp) {

  function WrittenBooksFactory(BASEURLS, LOCALNAME, localSave, $resource, request) {
    function getHeader() {
      return {
        'Content-Type': 'application/json',
        'x-access-token': localSave.getValueLS(LOCALNAME.USER_TOKEN)
      };
    }

    function getWrittenBooks(username) {
      return $resource(BASEURLS.BASE_API +
        litteraApp.modules.users.routes.writtenbooks(username), {},
        {
          get: {
            headers: getHeader()
          }
        }
      ).get({}).$promise;
    }

    function update(data) {
      return request._put(litteraApp.modules.users.routes.users(''), data);
    }

    function updateImg(url, file) {
      return request._upload(url, file);
    }


    return {
      getWrittenBooks: getWrittenBooks,
      update: update,
      updateImg: updateImg
    };
  }

  WrittenBooksFactory.$inject = [
    'BASEURLS',
    'LOCALNAME',
    litteraApp.modules.users.imports.localSave,
    '$resource',
    litteraApp.modules.users.imports.request
  ];

  angular.module(litteraApp.modules.users.name)
    .factory(litteraApp.modules.users.factories.writtenBooks,
    WrittenBooksFactory);

}(angular, litteraApp));
