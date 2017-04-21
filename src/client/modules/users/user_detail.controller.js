/**
 * Created by jonathan on 21/04/17.
 */
'use strict';
(function (angular, litteraApp) {
  function UserDetailCtrl($scope,
                          $routeParams,
                          $rootScope,
                          $filter,
                          $location,
                          Upload,
                          usersFactory,
                          message,
                          authentication,
                          has_error,
                          request) {
    var vm = this;

    vm.user = {
      _id: '',
      name: '',
      username: '',
      username_link: '',
      email: '',
      written_books: [],
      library: [],
      wishlist: [],
      following: [],
      followers: [],
      choices: [],
      reviews: [],
      acepted_terms: 0,
      average_stars: 0,
      gender: 0,
      dob: '',
      cover_image: ''
    };


    request._get('/users/' + $routeParams.username)
      .then(function (data) {
        let user = data.data.data;
        vm.user = {
          _id: user._id ,
          name: user.name ,
          username: user.username,
          username_link: '@'+user.username,
          email: user.email ,
          written_books: user.written_books ,
          library: user.library ,
          wishlist: user.wishlist ,
          following: user.following ,
          followers: user.followers ,
          choices: user.choices ,
          reviews: user.reviews ,
          acepted_terms: user.acepted_terms,
          average_stars: user.average_stars,
          gender: user.gender ,
          dob: user.dob ,
          cover_image: user.cover_image
        };
      })
      .catch(function (err) {
        console.log(err);
      });

    console.log($routeParams);
    vm.page = 'page';

  }

  UserDetailCtrl.$inject = [
    '$scope',
    '$routeParams',
    '$rootScope',
    '$filter',
    '$location',
    'Upload',
    litteraApp.modules.users.factories.users,
    litteraApp.modules.users.imports.message,
    litteraApp.modules.users.imports.authentication,
    litteraApp.modules.users.imports.has_error,
    litteraApp.modules.users.imports.request
  ];

  angular.module(litteraApp.modules.users.name)
    .controller(litteraApp.modules.users.controllers.userDetail.name, UserDetailCtrl);
}(angular, litteraApp));
