/**
 * Created by jonathan on 07/05/17.
 */
'use strict';
(function(angular, litteraApp) {
  function SaleStatus() {
    return function(input) {

      if (input) {
        switch(input) {
        case 1:
          return 'Aguardando Pagamento';
        case 2:
          return 'Confirmado';
        case 3:
          return 'Cancelado';
        }
      }


      return 'Pendente';

    };
  }

  angular.module(litteraApp.core.name)
    .filter(litteraApp.core.filters.saleStatus, SaleStatus);
}(angular, litteraApp));
