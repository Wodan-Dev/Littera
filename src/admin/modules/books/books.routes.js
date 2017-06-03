/**
 * Created by jonathan on 28/03/17.
 */
'use strict';
(function (angular, litteraApp) {

  angular.module(litteraApp.modules.books.name)
    .config(
    function ($locationProvider, $routeProvider) {
      $routeProvider
        .when(litteraApp.modules.books.routes.books(''), {
          controller:  litteraApp.modules.books.controllers.books.name,
          controllerAs:  litteraApp.modules.books.controllers.books.nameas,
          templateUrl: litteraApp.modules.books.templates.books.url,
          title: 'Livro',
          access: {
            requiresLogin: true
          }
        })
        .when(litteraApp.modules.books.routes.bookDetail(':id'), {
          controller:  litteraApp.modules.books.controllers.bookDetail.name,
          controllerAs:  litteraApp.modules.books.controllers.bookDetail.nameas,
          templateUrl: litteraApp.modules.books.templates.bookDetail.url,
          title: 'Livros',
          access: {
            requiresLogin: true
          }
        });
    });

}(angular, litteraApp));
