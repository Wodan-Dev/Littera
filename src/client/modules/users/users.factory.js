/**
 * Created by jonathan on 28/03/17.
 */
'use strict';
(function(angular, litteraApp) {

  function UsersFactory(BASEURLS, LOCALNAME, localSave, $resource, request) {
    function getHeader() {
      return {
        'Content-Type': 'application/json',
        'x-access-token': localSave.getValueLS(LOCALNAME.USER_TOKEN)
      };
    }

    function getUser() {
      return $resource(BASEURLS.BASE_API +
        litteraApp.modules.users.routes.users(''), {},
        {
          get: {
            headers: getHeader()
          }
        }
      ).get({}).$promise;
    }

    function getUserByUserName(username) {
      return $resource(BASEURLS.BASE_API +
        litteraApp.modules.users.routes.users(username), {},
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
      getUser: getUser,
      getUserByUserName: getUserByUserName,
      update: update,
      updateImg: updateImg
    };
  }

  UsersFactory.$inject = [
    'BASEURLS',
    'LOCALNAME',
    litteraApp.modules.users.imports.localSave,
    '$resource',
    litteraApp.modules.users.imports.request
  ];

  angular.module(litteraApp.modules.users.name)
    .factory(litteraApp.modules.users.factories.users,
    UsersFactory);

}(angular, litteraApp));
