/**
 * Created by jonathan on 01/04/17.
 */
'use strict';
(function(angular, litteraApp) {

  function has_errorService($filter) {
    let lstErrors = [];

    function clearError() {
      lstErrors = [];
    }

    function addError(field, message, isInput) {
      lstErrors.push({
        field: field,
        message: message,
        isInput: isInput||false
      });
    }

    function hasError(field) {
      return ($filter('filter')(lstErrors, { field : field }).length > 0);
    }

    function getErrorMessage(field) {
      return ($filter('filter')(lstErrors, { field : field }))[0].message;
    }

    function noFieldErrors() {
      return ($filter('filter')(lstErrors, { isInput : false }));
    }

    function hasNoFieldErrors() {
      return noFieldErrors().length > 0;
    }

    return {
      clearError: clearError,
      addError: addError,
      hasError: hasError,
      getErrorMessage: getErrorMessage,
      noFieldErrors: noFieldErrors,
      hasNoFieldErrors: hasNoFieldErrors
    };
  }

  has_errorService.$inject = [
    '$filter'
  ];

  angular.module(litteraApp.core.name)
    .service(litteraApp.core.services.has_error, has_errorService);
}(angular, litteraApp));
