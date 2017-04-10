/**
 * Created by jonathan on 17/03/17.
 */
'use strict';

(function (angular, litteraApp) {
  litteraApp.components.navBarUser = {
    name: 'litteraApp.navBarUser',
    component: 'linavBarUser',
    controller: {
      name: 'NavBarUserController',
      nameas: 'NavBarUserCtrl'
    },
    factories: {
      navBarUserFactory: 'navBarUserFactory'
    },
    routes: {
      me: litteraApp.URLS.MORDOR.ME()
    },
    template: './components/navBarUser/navBarUser.tpl.html',
    imports: {
      request: litteraApp.core.services.request,
      localSave: litteraApp.core.factories.localSave,
      authentication: litteraApp.modules.auth.factories.authentication
    }
  };

  angular.module(litteraApp.components.navBarUser.name, [
    litteraApp.core.name
  ])
    .component(litteraApp.components.navBarUser.component,
    {
      templateUrl: litteraApp.components.navBarUser.template,
      controller: litteraApp.components.navBarUser.controller.name
    });

}(angular, litteraApp));
