/**
 * Created by jonathan on 17/03/17.
 */
'use strict';

(function (angular, litteraApp) {
  litteraApp.components.header = {
    name: 'litteraApp.header',
    component: 'liheader',
    controller: {
      name: 'HeaderController',
      nameas: 'HeaderCtrl'
    },
    template: './components/header/header.tpl.html',
    imports: {

    }
  };

  angular.module(litteraApp.components.header.name, [])
    .component(litteraApp.components.header.component,
    {
      templateUrl:  litteraApp.components.header.template,
      controller: litteraApp.components.header.controller.name
    });

}(angular, litteraApp));
