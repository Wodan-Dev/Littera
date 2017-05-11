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
      $rootScope.__showLoad = true;
      businessFactory.getBooksSalesProfit(loggedUser.username)
        .then(function (data) {
          console.log(data);
          $rootScope.__showLoad = false;
        })
        .catch(function (err) {
          $rootScope.__showLoad = false;
        });


      vm.actualGraph.series = ['Nice Places'];
      vm.actualGraph.legend = [
        'Trenzalore',
        'Earth',
        'Caprica',
        'Sol',
        'Tau Ceti'];
      vm.actualGraph.data = [[5, 10, 6, 7, 2]];
      vm.actualGraph.labels = [
        'Trenzalore',
        'Earth',
        'Caprica',
        'Sol',
        'Tau Ceti'];
    }


    vm.init = function () {
      console.log(booksPerformanceData);
      businessFactory = booksPerformanceData.businessFactory;
      loggedUser = booksPerformanceData.user;
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

