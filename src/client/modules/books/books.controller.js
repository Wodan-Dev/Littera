/**
 * Created by jonathan on 28/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  function BooksCtrl($scope, $rootScope, $routeParams, booksFactory, message) {
    var vm = this;
    vm.showSynopsis = true;
    vm.showStars = false;
    vm.book = {
      '_id': '',
      'title': '',
      'synopsis': '',
      'percentage': 0,
      'esbn': '',
      'date_published': '',
      'language': '',
      'average_star': 1,
      'cover_image': '',
      'comments': [],
      'keywords': [],
      'rankings': [],
      'prices': [],
      'user': {
        '_id': '',
        'username': '',
        'email': '',
        'following': [],
        'followers': [],
        'reviews': [],
        'average_stars': 0
      }
    };

    vm.init = function () {
      loadData();
    };

    vm.btnShowStars = function() {
      if (vm.book.rankings[0].username) {
        vm.showSynopsis = !vm.showSynopsis;
        vm.showStars = !vm.showStars;
      }
      else
        message.notification('information', 'Ninguém fez comentários ainda :/');


    };

    vm.btnCloseDetail = function (id) {
      document.getElementById('book-'+id).style.display = 'none';
      vm.showDetail = false;
      $rootScope.__showModal = false;
    };

    vm.btnLoadMore = function () {
      loadData();

    };

    function loadData() {
      booksFactory.getStoreBookById($routeParams.id)
        .then(function (data) {
          vm.book = data.data[0];
        })
        .catch(function () {

        });
    }

  }

  BooksCtrl.$inject = [
    '$scope',
    '$rootScope',
    '$routeParams',
    litteraApp.modules.books.factories.books,
    litteraApp.modules.books.imports.message
  ];

  angular.module(litteraApp.modules.books.name)
    .controller(litteraApp.modules.books.controllers.books.name, BooksCtrl);
}(angular, litteraApp));
