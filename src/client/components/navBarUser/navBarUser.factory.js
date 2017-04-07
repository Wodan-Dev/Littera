/**
 * Created by jonathan on 03/04/17.
 */
'use strict';
(function(angular, litteraApp) {

  function navBarUserFactory(BASEURLS, LOCALNAME, localSave, $resource) {
    function getHeader() {
      return {
        'Content-Type': 'application/json',
        'x-access-token': localSave.getValueLS(LOCALNAME.USER_TOKEN)
      };
    }

    function getUser() {

      return $resource(BASEURLS.BASE_API +
        litteraApp.components.navBarUser.routes.me, {},
        {
          get: {
            headers: getHeader()
          }
        }
      ).get({}).$promise;
    }

    return {
      getUser: getUser
    };
  }

  navBarUserFactory.$inject = [
    'BASEURLS',
    'LOCALNAME',
    litteraApp.modules.store.imports.localSave,
    '$resource'
  ];

  angular.module(litteraApp.components.navBarUser.name)
    .factory(litteraApp.components.navBarUser.factories.navBarUserFactory,
    navBarUserFactory);
}(angular, litteraApp));
