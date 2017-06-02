/**
 * Created by jonathan on 24/03/17.
 */
'use strict';

(function (angular, litteraApp) {
  function notAuthorizedCtrl($location, $window) {
    var vm = this;
    vm.goBack = function () {
      $window.history.back();
    };
  }

  function notFoundCtrl($location, $window) {
    var vm = this;
    vm.goBack = function () {
      $window.history.back();
    };
  }

  function serverErrorCtrl($location, $routeParams, $window) {
    var vm = this;
    vm.errorCode = $routeParams.errorCode;
    vm.goBack = function () {
      $window.history.back();
    };
  }

  notAuthorizedCtrl.$inject = ['$location', '$window'];
  notFoundCtrl.$inject = ['$location', '$window'];
  serverErrorCtrl.$inject = ['$location', '$routeParams', '$window'];


  angular.module(litteraApp.modules.handlers.name)
    .controller(litteraApp.modules.handlers.controllers.notAuthorized.name,
    notAuthorizedCtrl)
    .controller(litteraApp.modules.handlers.controllers.notFound.name,
    notFoundCtrl)
    .controller(litteraApp.modules.handlers.controllers.serverError.name,
    serverErrorCtrl);

}(angular, litteraApp));
