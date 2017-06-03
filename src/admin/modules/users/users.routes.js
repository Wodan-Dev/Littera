/**
 * Created by jonathan on 28/03/17.
 */
'use strict';
(function (angular, litteraApp) {

  angular.module(litteraApp.modules.users.name)
    .config(
    function ($locationProvider, $routeProvider) {
      $routeProvider
        .when(litteraApp.modules.users.routes.users(':username'), {
          controller:  litteraApp.modules.users.controllers.userDetail.name,
          controllerAs:  litteraApp.modules.users.controllers.userDetail.nameas,
          templateUrl: litteraApp.modules.users.templates.userDetail.url,
          title: 'Usuário',
          access: {
            requiresLogin: true
          }
        })
        .when(litteraApp.modules.users.routes.users_all(), {
          controller:  litteraApp.modules.users.controllers.users.name,
          controllerAs:  litteraApp.modules.users.controllers.users.nameas,
          templateUrl: litteraApp.modules.users.templates.users.url,
          title: 'Usuários',
          access: {
            requiresLogin: true
          }
        });
    });

}(angular, litteraApp));
