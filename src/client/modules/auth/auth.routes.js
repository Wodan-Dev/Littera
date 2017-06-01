/**
 * Created by jonathan on 20/03/17.
 */
'use strict';
(function (angular, litteraApp) {

  angular.module(litteraApp.modules.auth.name)
    .config(
    function ($locationProvider, $routeProvider) {
      $routeProvider
        .when(litteraApp.modules.auth.routes.login, {
          controller:  litteraApp.modules.auth.controllers.login.name,
          controllerAs:  litteraApp.modules.auth.controllers.login.nameas,
          templateUrl: litteraApp.modules.auth.templates.login.url,
          title: 'Login',
          access: {
            requiresLogin: false
          }
        })
        .when(litteraApp.modules.auth.routes.register, {
          controller:  litteraApp.modules.auth.controllers.register.name,
          controllerAs:  litteraApp.modules.auth.controllers.register.nameas,
          templateUrl: litteraApp.modules.auth.templates.register.url,
          title: 'Cadastrar',
          access: {
            requiresLogin: false
          }
        })
        .when(litteraApp.modules.auth.routes.change_pass, {
          controller: litteraApp.modules.auth.controllers.password.name,
          controllerAs: litteraApp.modules.auth.controllers.password.nameas,
          templateUrl: litteraApp.modules.auth.templates.password.url,
          title: 'Alterar a senha',
          access: {
            requiresLogin: true
          }
        })
        .when(litteraApp.modules.auth.routes.forgot_pass, {
          controller: litteraApp.modules.auth.controllers.password.name,
          controllerAs: litteraApp.modules.auth.controllers.password.nameas,
          templateUrl: litteraApp.modules.auth.templates.forgot.url,
          title: 'Esqueci a senha',
          access: {
            requiresLogin: false
          }
        })
        .when(litteraApp.modules.auth.routes.recover_pass(':checksum'), {
          controller: litteraApp.modules.auth.controllers.password.name,
          controllerAs: litteraApp.modules.auth.controllers.password.nameas,
          templateUrl: litteraApp.modules.auth.templates.recover.url,
          title: 'Recuperar senha',
          access: {
            requiresLogin: false
          }
        });
    });

}(angular, litteraApp));
