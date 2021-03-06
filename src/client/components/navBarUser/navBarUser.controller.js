/**
 * Created by jonathan on 17/03/17.
 */
'use strict';

(function (angular, litteraApp) {

  function navBarUserController($rootScope, navBarUserFactory, authentication) {
    var vm = this;

    vm.User = {
      _id: '',
      name: '',
      username: '',
      cover_image: ''
    };

    $rootScope.$on('evt_navBarUser_event', function(ev, obj){
      if(authentication.isAuthenticated()) {
        loadData()
          .then(function (data) {
            loadFields(data.data, false);
            $rootScope.$broadcast('evt_navBarLinks_event', vm.User);
            $rootScope.$broadcast('evt_navBarNotify_event', vm.User);
            $rootScope.$broadcast('evt_header_event', vm.User);
          })
          .catch(function () {
            loadFields({}, true);
            $rootScope.$broadcast('evt_navBarLinks_event', vm.User);
            $rootScope.$broadcast('evt_navBarNotify_event', vm.User);
            $rootScope.$broadcast('evt_header_event', vm.User);
          });
      }
      else {
        loadFields({}, true);
        $rootScope.$broadcast('evt_navBarLinks_event', vm.User);
        $rootScope.$broadcast('evt_navBarNotify_event', vm.User);
        $rootScope.$broadcast('evt_header_event', vm.User);
      }

    });

    vm.init = function () {
      if(authentication.isAuthenticated()) {
        loadData()
          .then(function (data) {
            loadFields(data.data, false);
            $rootScope.$broadcast('evt_navBarLinks_event', vm.User);
            $rootScope.$broadcast('evt_navBarNotify_event', vm.User);
            $rootScope.$broadcast('evt_header_event', vm.User);
          })
          .catch(function () {
            loadFields({}, true);
            $rootScope.$broadcast('evt_navBarLinks_event', vm.User);
            $rootScope.$broadcast('evt_navBarNotify_event', vm.User);
            $rootScope.$broadcast('evt_header_event', vm.User);
          });
      }
      else {
        loadFields({}, true);
        $rootScope.$broadcast('evt_navBarLinks_event', vm.User);
        $rootScope.$broadcast('evt_navBarNotify_event', vm.User);
        $rootScope.$broadcast('evt_header_event', vm.User);
      }

    };

    function loadFields(data, err) {
      vm.User = {
        _id: '-',
        name: 'Participe',
        username: '',
        cover_image: './static/images/no-image.png'
      };

      if (!err) {
        vm.User = {
          _id: data._id,
          name: data.name,
          username_link: '@' + data.username,
          username: data.username,
          cover_image: data.cover_image ? data.cover_image + '?' + new Date().getTime() : './static/images/no-image.png'
          //data.cover_image + '?' + new Date().getTime()//|| './static/images/no-image.png'
        };
      }
    }

    function loadData() {
      return navBarUserFactory.getUser();
    }

  }

  navBarUserController.$inject = [
    '$rootScope',
    litteraApp.components.navBarUser.factories.navBarUserFactory,
    litteraApp.components.navBarUser.imports.authentication
  ];

  angular.module(litteraApp.components.navBarUser.name)
    .controller(litteraApp.components.navBarUser.controller.name, navBarUserController);

}(angular, litteraApp));
