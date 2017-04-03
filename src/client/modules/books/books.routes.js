/**
 * Created by jonathan on 28/03/17.
 */
'use strict';
(function (angular, litteraApp) {

  angular.module(litteraApp.modules.books.name)
    .config(
    function ($locationProvider, $routeProvider) {
      $routeProvider
        .when(litteraApp.modules.books.routes.books(':id'), {
          controller:  litteraApp.modules.books.controllers.books.name,
          controllerAs:  litteraApp.modules.books.controllers.books.nameas,
          templateUrl: litteraApp.modules.books.templates.books.url,
          css: 'static/css/notice.css',
          access: {
            requiresLogin: false
          }/*,
          resolve: {
            bookStoreData: function (storeFactory) {
              return storeFactory.getBooks();
            }
          }*/
        });
    });

}(angular, litteraApp));
