/**
 * Created by jonathan on 23/05/17.
 */
'use strict';
(function(angular, litteraApp) {
  function ParentalRating() {
    return function(input) {

      if (input) {
        switch(input) {
        case 1:
          return '10+';
        case 2:
          return '12+';
        case 3:
          return '14+';
        case 4:
          return '16+';
        case 5:
          return '18+';
        }
      }

      return 'L';

    };
  }

  angular.module(litteraApp.core.name)
    .filter(litteraApp.core.filters.parentalRating, ParentalRating);
}(angular, litteraApp));
