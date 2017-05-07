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
          title: 'Livro',
          access: {
            requiresLogin: false
          }
        })
        .when(litteraApp.modules.books.routes.bookCreate, {
          controller:  litteraApp.modules.books.controllers.bookCreate.name,
          controllerAs:  litteraApp.modules.books.controllers.bookCreate.nameas,
          templateUrl: litteraApp.modules.books.templates.bookCreate.url,
          title: 'Publicação',
          access: {
            requiresLogin: true
          },
          resolve: {
            bookData: function () {
              return new Promise(function (resolve) {
                resolve({});
              });
            }
          }
        })
        .when(litteraApp.modules.books.routes.bookUpdate(':id'), {
          controller:  litteraApp.modules.books.controllers.bookCreate.name,
          controllerAs:  litteraApp.modules.books.controllers.bookCreate.nameas,
          templateUrl: litteraApp.modules.books.templates.bookCreate.url,
          title: 'Publicação',
          access: {
            requiresLogin: true
          },
          resolve: {
            bookData: function ($route, booksFactory) {
              return booksFactory.getBookById($route.current.params.id|| '-');
            }
          }
        })
        .when(litteraApp.modules.books.routes.bookReading(':id'), {
          controller:  litteraApp.modules.books.controllers.bookReading.name,
          controllerAs:  litteraApp.modules.books.controllers.bookReading.nameas,
          templateUrl: litteraApp.modules.books.templates.bookReading.url,
          title: 'Leitura',
          access: {
            requiresLogin: true
          },
          resolve: {
            bookData: function ($route, authenticationFactory, booksFactory) {
              return new Promise(function (resolve, reject) {
                let userLogged = {};
                let book = {};
                authenticationFactory.credential()
                  .then(function (data) {
                    userLogged = data.data.data;
                    return booksFactory.getBookById($route.current.params.id|| '-');
                  })
                  .then(function (data) {
                    book = data.data;
                    return resolve({
                      user: userLogged,
                      book: book
                    });
                  })
                  .catch(function (err) {
                    reject(err);
                  });
              });
            }
          }
        });
    });

}(angular, litteraApp));
