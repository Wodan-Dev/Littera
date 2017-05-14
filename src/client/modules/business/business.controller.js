/**
 * Created by jonathan on 07/05/17.
 */
'use strict';
(function (angular, litteraApp) {
  function BookPerformanceCtrl(
    $scope,
    $rootScope,
    $location,
    $filter,
    message,
    booksPerformanceData) {
    var vm = this;
    vm.writtenBooks = [];
    vm.selectedBook = {};
    vm.showGraph = false;

    vm.books = [];
    let loggedUser = {};
    let businessFactory = {};

    $scope.$watch('selectedTab', function (newval, oldval) {
      switch(newval) {
      case 0:
        countTotalSales();
        break;
      case 1:
        valueProfitGraph();
        break;
      case 2:
        valueTotalProfitGraph();
        break;
      case 3:
        booksCountGraph();
        break;
      }
    });

    vm.actualGraph = {
      legend: [],
      series: [],
      labels: [],
      data: [],
      colours: [{
        fillColor:[
          '#FF0000',
          '#00FF00',
          '#0000FF',
          '#00FFFF',
          '#FFFF00'
        ]
      }],
      options: {
        barShowStroke : false,
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return (vm.actualGraph.legend[tooltipItem.index] + ': '+ tooltipItem.yLabel);
            }
          }
        }
      }
    };

    function countTotalSales() {
      let labels = [];
      let legend = [];
      let serie = [];

      vm.books = $filter('orderBy')(booksPerformanceData.books, 'count', true);

      vm.books.map(function (book, pos) {
        labels.push(pos + 1);
        legend.push(book.title);
        serie.push(book.count);
      });

      vm.actualGraph.series = ['Livros'];
      vm.actualGraph.legend = legend;
      vm.actualGraph.data = [serie];
      vm.actualGraph.labels = labels;
    }

    function valueProfitGraph() {
      vm.showGraph = false;
    }

    function valueTotalProfitGraph() {
      $rootScope.__showLoad = true;
      businessFactory.getBooksTotalProfit(loggedUser.username)
        .then(function (data) {
          let labels = [];
          let legend = [];
          let serie = [];

          let totalSales = $filter('orderBy')(data.data, '_id');


          totalSales.map(function (month, pos) {
            labels.push(month._id);
            legend.push(month._id);
            serie.push(month.total);
          });



          vm.actualGraph.series = ['Vendas'];
          vm.actualGraph.legend = legend;
          vm.actualGraph.data = [serie];
          vm.actualGraph.labels = labels;



          $rootScope.__showLoad = false;
        })
        .catch(function (err) {
          $rootScope.__showLoad = false;
        });
    }

    function booksCountGraph() {
      $rootScope.__showLoad = true;
      businessFactory.getBooksTotalProfit(loggedUser.username)
        .then(function (data) {
          let labels = [];
          let legend = [];
          let serie = [];

          let totalSales = $filter('orderBy')(data.data, '_id');


          totalSales.map(function (month, pos) {
            labels.push(month._id);
            legend.push(month._id);
            serie.push(month.total);
          });



          vm.actualGraph.series = ['Vendas'];
          vm.actualGraph.legend = legend;
          vm.actualGraph.data = [serie];
          vm.actualGraph.labels = labels;



          $rootScope.__showLoad = false;
        })
        .catch(function (err) {
          $rootScope.__showLoad = false;
        });
    }


    vm.btnLoadBook = function () {
      console.log(vm.selectedBook);

      if (vm.selectedBook) {
        businessFactory.getBooksCount(loggedUser.username, vm.selectedBook)
          .then(function (data) {
            console.log(data);
            vm.showGraph = true;
            let labels = [];
            let legend = [];
            let serie = [];

            let totalSales = $filter('orderBy')(data.data, '_id');


            totalSales.map(function (month, pos) {
              labels.push(month._id);
              legend.push(month._id);
              serie.push(month.count);
            });



            vm.actualGraph.series = ['Vendas'];
            vm.actualGraph.legend = legend;
            vm.actualGraph.data = [serie];
            vm.actualGraph.labels = labels;


            $rootScope.__showLoad = false;
          })
          .catch(function (err) {
            $rootScope.__showLoad = false;
          });
      }

    };

    vm.init = function () {
      console.log(booksPerformanceData);
      businessFactory = booksPerformanceData.businessFactory;
      loggedUser = booksPerformanceData.user;
      vm.writtenBooks = booksPerformanceData.writtenBooks;
      countTotalSales();
    };

  }

  BookPerformanceCtrl.$inject = [
    '$scope',
    '$rootScope',
    '$location',
    '$filter',
    litteraApp.modules.business.imports.message,
    'booksPerformanceData'
  ];

  angular.module(litteraApp.modules.business.name)
    .controller(litteraApp.modules.business.controllers.bookPerformance.name,
    BookPerformanceCtrl);
}(angular, litteraApp));

