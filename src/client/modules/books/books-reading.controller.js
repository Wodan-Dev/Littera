/**
 * Created by jonathan on 30/04/17.
 */
'use strict';
(function (angular, litteraApp) {
  function BookReadingCtrl(
    $scope,
    $rootScope,
    $routeParams,
    $filter,
    $location,
    booksFactory,
    authentication,
    bookData) {
    var vm = this;
    let Book = {};
    vm.loggedUser = {};
    vm.book = {};
    vm.chapters = [];
    vm.selectedChapter = {};

    vm.isLogged = function () {
      return authentication.isAuthenticated();
    };

    vm.init = function () {
      $rootScope.__showLoad = true;
      if (vm.isLogged()) {
        console.log(bookData);
        vm.book = bookData.book;
        Book = ePub(bookData.book.content, {
          width: 400,
          spreads : false,
          restore: false
        });
        Book.getMetadata().then(function(meta){


          $rootScope.__Title = 'Leitura';
          document.title = 'Littera - ' + meta.bookTitle + ' – ' + meta.creator;

        });

        Book.getToc().then(function(toc){

          toc.forEach(function(chapter) {
            vm.chapters.push({
              desc: chapter.label,
              id: chapter.href
            });
          });

          console.log(vm.chapters[0]);
          vm.selectedChapter = vm.chapters[0].id;
        });
        Book.setStyle('font-size', '1.2rem');
        Book.setStyle('line-height', '1.8rem');

        Book.ready.all.then(function(){
          $rootScope.__showLoad = true;
        });

        Book.renderTo('area');

        vm.loggedUser = bookData.user;
      }

    };

    vm.prevPage = function () {
      Book.prevPage();
    };

    vm.nextPage = function () {
      Book.nextPage();
    };

    vm.selectedChapterChange = function () {
      Book.goto(vm.selectedChapter);
    };

  }

  BookReadingCtrl.$inject = [
    '$scope',
    '$rootScope',
    '$routeParams',
    '$filter',
    '$location',
    litteraApp.modules.books.factories.books,
    litteraApp.modules.books.imports.authentication,
    'bookData'
  ];

  angular.module(litteraApp.modules.books.name)
    .controller(litteraApp.modules.books.controllers.bookReading.name, BookReadingCtrl);
}(angular, litteraApp));
