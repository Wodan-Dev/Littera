/**
 * Created by jonathan on 27/05/17.
 */
'use strict';

(function (angular, litteraApp) {
  function TermsCtrl($mdDialog) {
    var vm = this;

    vm.cancel = function() {
      $mdDialog.cancel();
    };

    vm.accept = function() {
      $mdDialog.hide('accept');
    };
  }

  TermsCtrl.$inject = [
    '$mdDialog'
  ];


  angular.module(litteraApp.modules.main.name)
    .controller(litteraApp.modules.main.controllers.terms.name,
    TermsCtrl);

}(angular, litteraApp));
