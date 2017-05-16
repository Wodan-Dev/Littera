/**
 * Created by jonathan on 21/04/17.
 */
'use strict';
(function (angular, litteraApp) {
  function UserDetailCtrl(
    $rootScope,
    $scope,
    $filter,
    $routeParams,
    authentication,
    request,
    userData,
    has_error,
    usersFactory) {
    var vm = this;
    vm.loggedUser = {};
    vm.selectedTab = 0;
    vm.isAuthenticated = false;
    vm.review = {
      comment: '',
      stars: 1
    };

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

              if(vm.sameUser()) {
                vm.tabs.push({
                  id: 5,
                  desc: 'Lista de desejos'
                });
              }

              if (($routeParams.tab) &&
                 ([0, 1, 2, 3, 4, 5, 6].indexOf(parseInt($routeParams.tab)) > -1))
                vm.selectedTab = parseInt($routeParams.tab);
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

            let selectedUser = $filter('filter')(vm.user.followers, { '_id_user_follow._id' :  vm.loggedUser._id})[0];
            vm.user.followers.splice(vm.user.followers.indexOf(selectedUser), 1);
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

            vm.user.followers.push({
              _id: Math.floor(Math.random(0,1) * 99999999999999999).toString() + new Date().getTime(),
              _id_user_follow: vm.loggedUser,
              date_followed: moment()
            });
          });
        })
        .catch(function (err) {

        });
    };

    vm.changePage = function (page) {
      vm.selectedTab = page;
    };

    vm.hasError = function (field) {
      return has_error.hasError(field);
    };

    vm.getErrorMessage = function (field) {
      return has_error.getErrorMessage(field);
    };

    vm.btnPostRanking = function () {
      if(authentication.isAuthenticated() &&
        !vm.sameUser()) {
        has_error.clearError();
        $rootScope.__showLoad = true;
        let ran = {
          _id_user_comment: vm.user._id,
          _id_user: vm.loggedUser._id,
          comment: vm.review.comment,
          stars: vm.review.stars
        };
        usersFactory.saveRanking(vm.user.username, ran)
          .then(function (data) {

            $scope.$apply(function () {

              vm.user.average_stars = data.data.data.average_stars;
              let newReview = {
                _id: Math.floor(Math.random(0, 1) * 99999999999999999).toString() + new Date().getTime(),
                stars: ran.stars,
                comment: ran.comment,
                create_at: moment(),
                modified_at: moment(),
                _id_user: {
                  _id: vm.loggedUser._id,
                  username: vm.loggedUser.username,
                  name: vm.loggedUser.name,
                  email: vm.loggedUser.email,
                  followers: [],
                  following: [],
                  cover_image: vm.loggedUser.cover_image
                }

              };

              vm.review = {
                comment: '',
                stars: 1
              };

              vm.user.reviews.unshift(newReview);

              $rootScope.__showLoad = false;
            });
          })
          .catch(function (data) {
            if (data.data) {
              let lst = data.data.data.err;
              $scope.$apply(function () {
                if (lst instanceof Array) {
                  for (var i = 0, len = lst.length; i < len; i++) {
                    has_error.addError(lst[i].field, lst[i].message);
                  }
                }
                else {
                  has_error.addError(data.data.data.value, data.data.data.err);
                }

                $rootScope.__showLoad = false;

              });
            }
          });
      }
    };
  }

  UserDetailCtrl.$inject = [
    '$rootScope',
    '$scope',
    '$filter',
    '$routeParams',
    litteraApp.modules.users.imports.authentication,
    litteraApp.modules.users.imports.request,
    'userData',
    litteraApp.modules.users.imports.has_error,
    litteraApp.modules.users.factories.users
  ];

  angular.module(litteraApp.modules.users.name)
    .controller(litteraApp.modules.users.controllers.userDetail.name, UserDetailCtrl);
}(angular, litteraApp));
