/**
 * Created by jonathan on 07/05/17.
 */
'use strict';
(function (angular, litteraApp) {

  angular.module(litteraApp.modules.business.name)
    .config(
    function ($locationProvider, $routeProvider) {
      $routeProvider
        .when(litteraApp.modules.business.routes.booksPerformancePage, {
          controller:  litteraApp.modules.business.controllers.bookPerformance.name,
          controllerAs:  litteraApp.modules.business.controllers.bookPerformance.nameas,
          templateUrl: litteraApp.modules.business.templates.bookPerformance.url,
          title: 'Performance de venda',
          access: {
            requiresLogin: true
          },
          resolve: {
            booksPerformanceData: function ($route, authenticationFactory, businessFactory) {
              return new Promise(function (resolve, reject) {
                let userLogged = {};
                let books = {};
                let writtenBooks = {};
                authenticationFactory.credential()
                  .then(function (data) {
                    userLogged = data.data.data;
                    return businessFactory.getBooksWritten(userLogged.username);
                  })
                  .then(function (data) {
                    writtenBooks = data.data;
                    return businessFactory.getBooksSalesPerformance(userLogged.username);
                  })
                  .then(function (data) {
                    books = data.data;
                    return resolve({
                      user: userLogged,
                      books: books,
                      writtenBooks: writtenBooks,
                      businessFactory: businessFactory
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
