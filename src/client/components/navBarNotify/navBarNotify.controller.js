/**
 * Created by jonathan on 17/03/17.
 */
'use strict';

(function (angular, litteraApp) {

  function navBarNotifyController($rootScope) {
    var vm = this;
    vm.User = {
      _id: '',
      name: '',
      username: '',
      cover_image: ''
    };

    vm.lstNotify = [{
      picture: './static/images/image (4).jpg',
      name: 'Alice Braga',
      content: 'Comentou seu livro',
      time: 'Dom, 10 de Jul 17:02',
      url: '#'
    }];

    $rootScope.$on('evt_navBarNotify_event', function(ev, user) {

      vm.User = user;
    });

  }

  navBarNotifyController.$inject = [
    '$rootScope'
  ];

  angular.module(litteraApp.components.navBarNotify.name)
    .controller(litteraApp.components.navBarNotify.controller.name, navBarNotifyController);




}(angular, litteraApp));
