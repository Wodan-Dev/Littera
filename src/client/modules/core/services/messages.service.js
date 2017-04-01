/**
 * Created by jonathan on 01/04/17.
 */
'use strict';

(function(angular, litteraApp) {

  function messagesService() {


    /**
     * Display notification
     * @param  {String} type alert/information/error/warning/notification/success
     * @param  {String} text notification content
     * @return {Promise}      Resolve/Reject
     */
    function notification(type, text) {
      return new Promise(function (resolve) {
        let n = noty({
          text        : text,
          type        : type,
          dismissQueue: true,
          layout      : 'topRight',
          closeWith   : ['click'],
          theme       : 'relax',
          progressBar : true,
          timeout     : 8000,
          maxVisible  : 10,
          animation   : {
            open  : 'animated bounceInRight',
            close : 'animated zoomOutRight',
            easing: 'swing',
            speed : 500
          }
        });

        $('#'+ n.options.id).click(function () {
          resolve();
        });

      });

    }

    /**
     * Display a confirmation box
     * @param  {String} text text to confirm
     * @return {Promise}      Resolve/Reject
     */
    function confirm(text) {
      return new Promise(function (resolve, reject) {
        noty({
          text        : text,
          type        : 'alert',
          dismissQueue: true,
          layout      : 'center',
          theme       : 'relax',
          modal       : true,
          animation   : {
            open  : 'animated zoomIn',
            close : 'animated bounceOut',
            easing: 'swing',
            speed : 500
          },
          buttons     : [
            {addClass: 'btn btn-info', text: 'Ok', onClick: function ($noty) {
              $noty.close();
              resolve();
            }
            },
            {addClass: 'btn btn-danger', text: 'Cancelar', onClick: function ($noty) {
              $noty.close();
              reject();
            }
            }
          ]
        });
      });
    }

    return {
      notification: notification,
      confirm: confirm
    };
  }

  messagesService.$inject = [
  ];

  angular.module(litteraApp.core.name)
    .service(litteraApp.core.services.messages, messagesService);
}(angular, litteraApp));
