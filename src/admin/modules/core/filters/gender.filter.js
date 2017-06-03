/**
 * Created by jonathan on 02/06/17.
 */
'use strict';
(function(angular, litteraApp) {
  function GenderFilter() {
    return function(input) {

      if (input) {
        switch(input) {
        case 1:
          return 'Homen';
        case 2:
          return 'Mulher';
        }
      }

      return 'Não especificado';

    };
  }

  angular.module(litteraApp.core.name)
    .filter(litteraApp.core.filters.gender, GenderFilter);
}(angular, litteraApp));
