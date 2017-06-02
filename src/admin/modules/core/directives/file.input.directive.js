/**
 * Created by jonathan on 09/04/17.
 */
'use strict';

(function (angular, litteraApp) {
  function FileInput() {
    return {
      scope: {
        fileread: '='
      },
      link: function (scope, element, attributes) {
        element.bind('change', function (changeEvent) {
          var reader = new FileReader();
          reader.onload = function (loadEvent) {
            scope.$apply(function () {
              scope.fileread = loadEvent.target.result;
            });
          };
          reader.readAsDataURL(changeEvent.target.files[0]);
        });
      }
    };
  }

  FileInput.$inject = [
    '$rootScope',
    '$window'
  ];

  angular.module(litteraApp.core.name)
    .directive(litteraApp.core.components.fileInput.name,
      FileInput);

}(angular, litteraApp));
/*
* .directive("fileread", [function () {
 return {
 scope: {
 fileread: "="
 },
 link: function (scope, element, attributes) {
 element.bind("change", function (changeEvent) {
 var reader = new FileReader();
 reader.onload = function (loadEvent) {
 scope.$apply(function () {
 scope.fileread = loadEvent.target.result;
 });
 }
 reader.readAsDataURL(changeEvent.target.files[0]);
 });
 }
 }
 }]);
* */
