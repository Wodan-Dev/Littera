/**
 * Created by jonathan on 17/03/17.
 */
'use strict';

(function (angular, litteraApp) {
  litteraApp.components.navBarNotify = {
    name: 'litteraApp.navBarNotify',
    component: 'linavBarNotify',
    controller: {
      name: 'NavBarNotifyController',
      nameas: 'NavBarNotifyCtrl'
    },
    template: './components/navBarNotify/navBarNotify.tpl.html',
    imports: {

    }
  };

  angular.module(litteraApp.components.navBarNotify.name, [])
    .component(litteraApp.components.navBarNotify.component,
    {
      templateUrl: litteraApp.components.navBarNotify.template,
      controller: litteraApp.components.navBarNotify.controller.name
    });

}(angular, litteraApp));
