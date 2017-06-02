/**
 * Created by jonathan on 26/04/17.
 */
'use strict';
(function(angular, litteraApp) {
  function TitleCase() {
    return function(input) {
      let words = [];

      input.split(' ').map(function (item) {
        words.push(item.substring(0, 1).toUpperCase() + item.substring(1));
      });
      return words.join(' ').trim();

    };
  }

  angular.module(litteraApp.core.name)
    .filter(litteraApp.core.filters.titleCase, TitleCase);
}(angular, litteraApp));
