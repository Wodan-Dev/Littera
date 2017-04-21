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
          controller:  litteraApp.modules.users.controllers.users.name,
          controllerAs:  litteraApp.modules.users.controllers.users.nameas,
          templateUrl: litteraApp.modules.users.templates.users.url,
          access: {
            requiresLogin: false
          }
        })
        .when(litteraApp.modules.users.routes.writtenbooks_page(':username'), {
          controller:  litteraApp.modules.users.controllers.writtenBooks.name,
          controllerAs:  litteraApp.modules.users.controllers.writtenBooks.nameas,
          templateUrl: litteraApp.modules.users.templates.writtenBooks.url,
          access: {
            requiresLogin: true
          }
        })
        .when(litteraApp.modules.users.routes.userDetail_page(':username'), {
          controller:  litteraApp.modules.users.controllers.userDetail.name,
          controllerAs:  litteraApp.modules.users.controllers.userDetail.nameas,
          templateUrl: litteraApp.modules.users.templates.userDetail.url,
          access: {
            requiresLogin: true
          }
        });
    });

}(angular, litteraApp));
