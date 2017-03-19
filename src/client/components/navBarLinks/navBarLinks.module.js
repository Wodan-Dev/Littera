/**
 * Created by jonathan on 17/03/17.
 */
'use strict';

(function (angular, litteraApp) {
  litteraApp.components.navBarLinks = {
    name: 'litteraApp.navBarLinks',
    component: 'linavBarLinks',
    controller: {
      name: 'NavBarLinksController',
      nameas: 'NavBarLinksCtrl'
    },
    template: './components/navBarLinks/navBarLinks.tpl.html',
    imports: {

    }
  };

  angular.module(litteraApp.components.navBarLinks.name, [])
    .component(litteraApp.components.navBarLinks.component,
    {
      templateUrl: litteraApp.components.navBarLinks.template,
      controller: litteraApp.components.navBarLinks.controller.name
    });

}(angular, litteraApp));
