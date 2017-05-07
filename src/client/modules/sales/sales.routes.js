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
          title: 'Compra',
          access: {
            requiresLogin: true
          }/*,
          resolve: {
            bookStoreData: function (salesFactory) {
              return salesFactory.getBooks();
            }
          }*/
        })
        .when(litteraApp.modules.sales.routes.bought_page, {
          controller:  litteraApp.modules.sales.controllers.bought.name,
          controllerAs:  litteraApp.modules.sales.controllers.bought.nameas,
          templateUrl: litteraApp.modules.sales.templates.bought.url,
          title: 'Minhas Compras',
          access: {
            requiresLogin: true
          },
          resolve: {
            salesData: function ($route, authenticationFactory, salesFactory) {
              return new Promise(function (resolve, reject) {
                let userLogged = {};
                let sales = {};
                authenticationFactory.credential()
                  .then(function (data) {
                    userLogged = data.data.data;
                    return salesFactory.getSale(userLogged._id);
                  })
                  .then(function (data) {
                    sales = data.data;
                    return resolve({
                      user: userLogged,
                      sales: sales,
                      salesFactory: salesFactory
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
