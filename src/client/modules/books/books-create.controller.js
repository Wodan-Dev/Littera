/**
 * Created by jonathan on 17/04/17.
 */
'use strict';
(function (angular, litteraApp) {
  function BookCreateCtrl(
    $scope,
    $rootScope,
    $routeParams,
    $location,
    booksFactory,
    message,
    authentication,
    has_error) {
    var vm = this;
    let changedImage = false;
    vm.book = {
      _id: '-',
      _id_user: '',
      title: '',
      subtitle: '',
      synopsis: '',
      content: '',
      status: 0,
      percentage: 0,
      esbn: '',
      date_published: moment(),
      visible: 0,
      language: '',
      average_star: 0,
      prices: [],
      forums: [],
      rankings: [],
      keywords: [],
      comments: [],
      cover_image: $rootScope.BASEURLS.BASE_API +
      '/upload/books/' +  this._id + '?' + new Date().getTime()
    };

    vm.cbeStatus = [
      { desc:'Completo', id: 0 },
      { desc:'Em Progresso', id: 1 }
    ];

    vm.cbeVisible = [
      { desc:'Público', id: 0 },
      { desc:'Seguidores', id: 1 },
      { desc:'Oculto', id: 2 }
    ];

    vm.selectedStatus = vm.cbeStatus[0];
    vm.selectedVisible = vm.cbeVisible[0];

    vm.init = function () {

    };


    $scope.setFile = function(element) {
      $scope.currentFile = element.files[0];
      var reader = new FileReader();

      reader.onload = function(event) {
        vm.book.cover_image = event.target.result;
        changedImage = true;
        $scope.$apply();

      };
      reader.readAsDataURL(element.files[0]);
    };

    vm.hasError = function (field) {
      return has_error.hasError(field);
    };

    vm.getErrorMessage = function (field) {
      return has_error.getErrorMessage(field);
    };

    vm.btnCreate = function () {
      let bookNew = {};
      let idImg = '';
      let username = '';

      has_error.clearError();
      $rootScope.__showLoad = true;
      authentication.credential()
        .then(function (data) {
          username = data.data.data.username;
          vm.book.img_data = vm.book.cover_image;
/*vm.cbeStatus = [
 { desc:'Completo', id: 0 },
 { desc:'Em Progresso', id: 1 }
 ];

 vm.cbeVisible = [
 { desc:'Público', id: 0 },
 { desc:'Seguidores', id: 1 },
 { desc:'Oculto', id: 2 }
 ];

 vm.selectedStatus = vm.cbeStatus[0];
 vm.selectedVisible = vm.cbeVisible[0];*/
          bookNew = {
            _id_user: data.data.data._id.toString(),
            title: vm.book.title,
            subtitle: vm.book.subtitle,
            synopsis: vm.book.synopsis,
            content: 'vm.book.content',
            status: vm.selectedStatus.id,
            percentage: vm.book.percentage,
            esbn: vm.book.esbn,
            date_published: vm.book.date_published,
            visible: vm.selectedVisible.id,
            language: vm.book.language,
            average_star: 0,
            prices: [],
            forums: [],
            rankings: [],
            keywords: [],
            comments: []

          };

          idImg = Math.floor(Math.random(0,1) * 99999999999999999).toString() + new Date().getTime();


          bookNew.cover_image = $rootScope.BASEURLS.BASE_API +
          '/upload/books/' + idImg;



          return booksFactory.create(bookNew);
        })
        .then(function (data) {
          console.log('book');
          console.log(data);
          return new Promise(function (resolve, reject) {
            if (changedImage) {
              return booksFactory.updateImg('/books/' + idImg,
                {
                  image: dataURItoBlob(vm.book.img_data)
                })
                .then(function () {
                  resolve(data);
                })
                .catch(function (err) {
                  reject(err);
                });
            }
            else
              resolve(data);
          });

        })
        .then(function (data) {
          console.log('written');
          console.log(data);

          $location.path('/written/'+ username);
        })
        .catch(function (data) {
          console.log('err');
          console.log(data);
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

            });
          }
          $rootScope.__showLoad = false;
          $scope.$apply();

        });
    };



    function dataURItoBlob(dataURI) {
      var binary = atob(dataURI.split(',')[1]);
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      var array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], {
        type: mimeString
      });
    }

  }

  BookCreateCtrl.$inject = [
    '$scope',
    '$rootScope',
    '$routeParams',
    '$location',
    litteraApp.modules.books.factories.books,
    litteraApp.modules.books.imports.message,
    litteraApp.modules.books.imports.authentication,
    litteraApp.modules.books.imports.has_error
  ];

  angular.module(litteraApp.modules.books.name)
    .controller(litteraApp.modules.books.controllers.bookCreate.name, BookCreateCtrl);
}(angular, litteraApp));
