/**
 * Created by jonathan on 21/04/17.
 */
'use strict';
(function (angular, litteraApp) {
  function UserDetailCtrl($scope,
                          $filter,
                          authentication,
                          request,
                          userData) {
    var vm = this;
    vm.loggedUser = {};
    vm.selectedTab = 0;
    vm.isAuthenticated = false;
    vm.tabs = [
      {
        id: 0,
        desc: 'Publicações'
      },
      {
        id: 1,
        desc: 'Biblioteca'
      }
    ];

    let usr = userData.data;
    vm.user = {
      _id: usr._id,
      name: usr.name,
      username: usr.username,
      username_link: '@'+usr.username,
      email: usr.email,
      written_books: usr.written_books ,
      library: usr.library,
      wishlist: usr.wishlist,
      following: usr.following,
      followers: usr.followers,
      choices: usr.choices,
      reviews: usr.reviews,
      acepted_terms: usr.acepted_terms,
      average_stars: usr.average_stars,
      gender: usr.gender,
      dob: usr.dob,
      cover_image: usr.cover_image
    };

    vm.init = function () {
      vm.isAuthenticated = authentication.isAuthenticated();
      if (vm.isAuthenticated) {
        authentication.credential()
          .then(function (data) {
            $scope.$apply(function () {
              vm.loggedUser = data.data.data;
            });
          })
          .catch(function (err) {

          });
      }
    };

    vm.sameUser = function () {
      return (vm.loggedUser._id === vm.user._id);
    };

    vm.isFollowing = function () {
      let tot = $filter('filter')(vm.loggedUser.following, { _id_user_follow: vm.user._id });
      return (tot || []).length > 0;
    };




    vm.btnUnFollow = function () {

      request._delete('/users/' + vm.loggedUser.username + '/following/' + vm.user._id, {})
        .then(function () {
          return authentication.credential();
        })
        .then(function (data) {
          $scope.$apply(function () {
            vm.loggedUser = data.data.data;
          });
        })
        .catch(function (err) {

        });
    };


    vm.btnFollow = function () {

      request._post('/users/' + vm.loggedUser.username + '/following/',
            {_id_user_follow: vm.user._id })
        .then(function () {
          return authentication.credential();
        })
        .then(function (data) {
          $scope.$apply(function () {
            vm.loggedUser = data.data.data;
          });
        })
        .catch(function (err) {

        });
    };


    vm.changePage = function (page) {
      vm.selectedTab = page;
    };
  }

  UserDetailCtrl.$inject = [
    '$scope',
    '$filter',
    litteraApp.modules.users.imports.authentication,
    litteraApp.modules.users.imports.request,
    'userData'
  ];

  angular.module(litteraApp.modules.users.name)
    .controller(litteraApp.modules.users.controllers.userDetail.name, UserDetailCtrl);
}(angular, litteraApp));
