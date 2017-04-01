/**
 * Created by jonathan on 20/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  function LoginCtrl($rootScope, $scope, $routeParams, $location, authFactory, $filter) {
    let vm = this;
    vm.lstErrors = [];
    vm.user = {
      username: '',
      pass: ''
    };

    vm.init = function () {
      vm.lstErrors = [];
      authFactory.logOut();
    };

    vm.hasError = function (field) {
      return ($filter('filter')(vm.lstErrors, { field : field }).length > 0);
    };

    vm.getErrorMessage = function (field) {
      return ($filter('filter')(vm.lstErrors, { field : field }))[0].message;
    };

    vm.btnCreate = function () {
      generate('warning', 'notification_html[0]');
      generate('error', 'notification_html[1]');
      generate('information', 'notification_html[2]');
      generate('success', 'notification_html[3]');
      confirm('ola').then(function () {
        generate('success', 'ok');
      })
      .catch(function () {
        generate('error', 'cancel');
      });
    };

    function generate(type, text) {
      var n = noty({
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
    }

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

    vm.btnAuthenticate = function () {
      vm.lstErrors = [];
      $rootScope.__showLoad = true;


      authFactory.authenticate(vm.user.username, vm.user.pass)
        .then(function (data) {
          authFactory.setToken(data.data.data.toString())
            .then(function () {
              $scope.$apply(function () {
                console.log($routeParams.next);
                let uri = $routeParams.next || '/feed';

                if (uri[0] !== '/')
                  uri = '/' + $routeParams.next;

                $location.path(uri);
              });
            });

        })
        .catch(function (data) {
          let lst = data.data.data.err;
          $scope.$apply(function () {
            if (lst instanceof Array) {
              for (var i = 0, len = lst.length; i < len; i++) {

                vm.lstErrors.push({
                  field: lst[i].field,
                  message: lst[i].message
                });
              }
            }
            else {
              vm.lstErrors.push({
                field: data.data.data.value,
                message: data.data.data.err
              });
            }
            $rootScope.__showLoad = false;

          });
        });
    };


  }

  LoginCtrl.$inject = [
    '$rootScope',
    '$scope',
    '$routeParams',
    '$location',
    litteraApp.modules.auth.factories.authentication,
    '$filter'
  ];

  angular.module(litteraApp.modules.auth.name)
    .controller(litteraApp.modules.auth.controllers.login.name, LoginCtrl);
}(angular, litteraApp));
