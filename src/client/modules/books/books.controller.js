/**
 * Created by jonathan on 28/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  function BooksCtrl(
    $scope,
    $rootScope,
    $routeParams,
    $filter,
    $location,
    booksFactory,
    message,
    authentication,
    salesFactory,
    has_error) {
    var vm = this;
    vm.showSynopsis = true;
    vm.showStars = false;
    vm.ranking = {
      comment: '',
      stars: 1
    };

    vm.comments = {
      content: ''
    };

    vm.tabs = [

    ];


    $scope.selectedTab = 1;

    $scope.$watch('selectedTab', function(current, old){
      if (current === 4) {
        if (vm.hasBook()) {
          vm.btnReading();
        }
        else {
          vm.btnAddBasket();
        }
      }
    });



    vm.readonly = false;
    vm.err = false;

    vm.loggedUser = {};

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

    vm.isLogged = function () {
      return authentication.isAuthenticated();
    };

    vm.hasBook = function () {

      if ((vm.isLogged()) &&
        (vm.loggedUser.library) &&
        (vm.loggedUser.library.length)) {
        return $filter('filter')(vm.loggedUser.library, { _id_book: $routeParams.id }).length;
      }
      return false;
    };

    vm.init = function () {


      if (vm.isLogged()) {
        authentication.credential()
          .then(function (data) {
            vm.loggedUser = data.data.data;
            if (vm.hasBook()) {
              vm.tabs.push(
                {
                  id: 0,
                  text: 'Ler'
                });

            }
            else {
              vm.tabs.push(
                {
                  id: 0,
                  text: 'Comprar'
                });
            }

            loadData();
            if (($routeParams.tab) && ([1, 2, 3].indexOf(parseInt($routeParams.tab) ) > -1) )
              $scope.selectedTab = parseInt($routeParams.tab);
          })
          .catch(function () {

          });
      }
      else {
        loadData();
        if (($routeParams.tab) && ([1, 2, 3].indexOf(parseInt($routeParams.tab) ) > -1) )
          $scope.selectedTab = parseInt($routeParams.tab);
      }



    };

    function getActualPrice(prices) {

      let off = $filter('filter')(prices, { active:1, type: 1 });
      if (off.length)
        return off;

      return $filter('filter')(prices, { type: 0 });
    }

    vm.getMinPrice = function (prices) {

      if (prices.length) {
        return getActualPrice(prices)[0].price_min;
      }
      return 0;
    };

    vm.getSugPrice = function (prices) {

      if (prices.length) {
        return getActualPrice(prices)[0].price_sug;
      }
      return 0;
    };

    vm.btnAddBasket = function () {
      $scope.selectedTab = 1;
      salesFactory.getCurrentSale(vm.loggedUser._id)
        .then(function (data) {
          return new Promise(function (resolve, reject) {
            if (!data.data.length) {
              let sale = {
                _id_user: vm.loggedUser._id,
                transaction_id: '-',
                status: '0',
                items: []
              };

              salesFactory.createSale(sale)
                .then(function (dt) {
                  resolve(dt.data.data);
                })
                .catch(function (err) {
                  reject(err);
                });
            }
            else
              resolve(data.data[0]);
          });
        })
        .then(function (data) {

          let saleItem = {
            _id_user: vm.loggedUser._id,
            _id_sale: data._id,
            _id_book: vm.book._id,
            value: vm.getSugPrice(vm.book.prices)
          };

          return salesFactory.addToBasket(saleItem);
        })
        .then(function () {
          message.notification('information', 'Adicionado ao carrinho com sucesso!!');
        })
        .catch(function (err) {
          if(err.data.data.err)
            message.notification('information', err.data.data.err);
        });

    };

    vm.btnPostRanking = function () {
      if(vm.isLogged()) {
        has_error.clearError();
        $rootScope.__showLoad = true;
        let ran = {
          _id_book: vm.book._id,
          _id_user: vm.loggedUser._id,
          comment: vm.ranking.comment,
          stars: vm.ranking.stars
        };
        booksFactory.saveRanking(ran)
          .then(function (data) {

            $scope.$apply(function () {

              vm.book.average_star = data.data.data.average_star;
              let newRanking = {
                'stars': ran.stars,
                'comment': ran.comment,
                '_id_user': ran._id_user,
                '_id': Math.floor(Math.random(0, 1) * 99999999999999999).toString() + new Date().getTime(),
                'username': vm.loggedUser.username,
                'name': vm.loggedUser.name,
                'email': vm.loggedUser.email,
                'followers': [],
                'following': [],
                'cover_image': vm.loggedUser.cover_image,
                'reviews': [],
                'created_at': moment()
              };
              vm.ranking = {
                comment: '',
                stars: 1
              };

              vm.book.rankings.unshift(newRanking);

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

    vm.btnPostComment = function () {
      if(vm.isLogged()) {
        has_error.clearError();
        $rootScope.__showLoad = true;
        let com = {
          _id_book: vm.book._id,
          _id_user: vm.loggedUser._id,
          content: vm.comments.content
        };
        booksFactory.saveComment(com)
          .then(function () {

            $scope.$apply(function () {

              let newComment = {
                'content': com.content,
                '_id_user': com._id_user,
                '_id': Math.floor(Math.random(0, 1) * 99999999999999999).toString() + new Date().getTime(),
                'username': vm.loggedUser.username,
                'name': vm.loggedUser.name,
                'email': vm.loggedUser.email,
                'followers': [],
                'following': [],
                'cover_image': vm.loggedUser.cover_image,
                'reviews': [],
                'created_at': moment()
              };
              vm.comments = {
                content: ''
              };

              vm.book.comments.unshift(newComment);

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

    vm.btnBackToStore = function () {
      $location.path('/');
    };

    vm.btnReading = function () {
      $location.path('/book/reading/'+ $routeParams.id);
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
    '$filter',
    '$location',
    litteraApp.modules.books.factories.books,
    litteraApp.modules.books.imports.message,
    litteraApp.modules.books.imports.authentication,
    litteraApp.modules.books.imports.salesFactory,
    litteraApp.modules.books.imports.has_error
  ];

  angular.module(litteraApp.modules.books.name)
    .controller(litteraApp.modules.books.controllers.books.name, BooksCtrl);
}(angular, litteraApp));
