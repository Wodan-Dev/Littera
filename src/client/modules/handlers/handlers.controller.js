/**
 * Created by jonathan on 24/03/17.
 */
'use strict';

(function (angular, litteraApp) {
  function notAuthorizedCtrl($location) {
    var vm = this;
    vm.goBack = function () {
      $location.path('/');
    };
  }

  function notFoundCtrl($location) {
    var vm = this;
    vm.goBack = function () {
      $location.path('/');
    };
  }

  function serverErrorCtrl($location, $routeParams) {
    var vm = this;
    vm.errorCode = $routeParams.errorCode;
    vm.goBack = function () {
      $location.path('/');
    };
  }

  notAuthorizedCtrl.$inject = ['$location'];
  notFoundCtrl.$inject = ['$location'];
  serverErrorCtrl.$inject = ['$location', '$routeParams'];


  angular.module(litteraApp.modules.handlers.name)
    .controller(litteraApp.modules.handlers.controllers.notAuthorized.name,
    notAuthorizedCtrl)
    .controller(litteraApp.modules.handlers.controllers.notFound.name,
    notFoundCtrl)
    .controller(litteraApp.modules.handlers.controllers.serverError.name,
    serverErrorCtrl);

}(angular, litteraApp));
