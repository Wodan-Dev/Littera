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
    template: './components/navBarUser/navBarUser.tpl.html',
    imports: {

    }
  };

  angular.module(litteraApp.components.navBarUser.name, [])
    .component(litteraApp.components.navBarUser.component,
    {
      templateUrl: litteraApp.components.navBarUser.template,
      controller: litteraApp.components.navBarUser.controller.name
    });

}(angular, litteraApp));
