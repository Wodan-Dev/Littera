/**
 * Created by jonathan on 28/03/17.
 */
'use strict';
(function (angular, litteraApp) {

  angular.module(litteraApp.modules.sales.name)
    .config(
    function ($locationProvider, $routeProvider) {
      $routeProvider
        .when(litteraApp.modules.sales.routes.sales_page, {
          controller:  litteraApp.modules.sales.controllers.sales.name,
          controllerAs:  litteraApp.modules.sales.controllers.sales.nameas,
          templateUrl: litteraApp.modules.sales.templates.sales.url,
          access: {
            requiresLogin: true
          }/*,
          resolve: {
            bookStoreData: function (salesFactory) {
              return salesFactory.getBooks();
            }
          }*/
        });
    });

}(angular, litteraApp));
