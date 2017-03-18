/**
 * Created by jonathan on 17/03/17.
 */
'use strict';

(function (angular, litteraApp) {
  litteraApp.components.navBarUser = {
    name: 'litteraApp.navBarUser',
    controllers: {
      navBar: {
        name: 'NavBarUserController',
        nameas: 'NavBarUserCtrl'
      }
    },
    routes: {

    },
    factories: {

    },
    templates: {
      navBar: {
        url: 'navBarUser.tpl.html'
      }
    },
    imports: {

    }
  };

  angular.module(litteraApp.components.navBarUser.name, [
    'ngRoute'
  ]);

}(angular, litteraApp));
