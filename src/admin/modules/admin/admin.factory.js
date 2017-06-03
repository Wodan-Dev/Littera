/**
 * Created by jonathan on 02/06/17.
 */
'use strict';
(function(angular, litteraApp) {

  function AdminFactory(
    BASEURLS,
    LOCALNAME,
    localSave,
    $resource,
    request) {
    function getHeader() {
      return {
        'Content-Type': 'application/json',
        'x-access-token': localSave.getValueLS(LOCALNAME.USER_TOKEN)
      };
    }

    function getDashBoard() {
      return $resource(BASEURLS.BASE_API +
        litteraApp.modules.admin.routes.dashboard, {},
        {
          get: {
            headers: getHeader()
          }
        }
      ).get({}).$promise;
    }


    return {
      getDashBoard: getDashBoard
    };
  }

  AdminFactory.$inject = [
    'BASEURLS',
    'LOCALNAME',
    litteraApp.modules.admin.imports.localSave,
    '$resource',
    litteraApp.modules.admin.imports.request
  ];

  angular.module(litteraApp.modules.admin.name)
    .factory(litteraApp.modules.admin.factories.admin,
    AdminFactory);

}(angular, litteraApp));
