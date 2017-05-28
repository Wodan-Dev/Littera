/**
 * Created by jonathan on 27/05/17.
 */
'use strict';

(function (angular, litteraApp) {
  function TermsCtrl() {
    var vm = this;
  }

  TermsCtrl.$inject = [];


  angular.module(litteraApp.modules.main.name)
    .controller(litteraApp.modules.main.controllers.terms.name,
    TermsCtrl);

}(angular, litteraApp));
