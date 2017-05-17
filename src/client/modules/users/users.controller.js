/**
 * Created by jonathan on 28/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  function UsersCtrl($scope,
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
    let changedImage = false;

    vm.year = moment().year();

    vm.cbeGender = [
      { desc:'Não especificado', id: 0 },
      { desc:'Masculino', id: 1 },
      { desc:'Feminino', id: 2 }
    ];

    vm.cbeMonths =[
      { desc:'Janeiro', id: 1 },
      { desc:'Fevereiro', id: 2 },
      { desc:'Março', id: 3 },
      { desc:'Abril', id: 4 },
      { desc:'Maio', id: 5 },
      { desc:'Junho', id: 6 },
      { desc:'Julho', id: 7 },
      { desc:'Agosto', id: 8 },
      { desc:'Setembro', id: 9 },
      { desc:'Outubro', id: 10 },
      { desc:'Novembro', id: 11 },
      { desc:'Dezembro', id: 12 }
    ];

    vm.cbeDays =[
      { desc:'01', id: 1 },
      { desc:'02', id: 2 },
      { desc:'03', id: 3 },
      { desc:'04', id: 4 },
      { desc:'05', id: 5 },
      { desc:'06', id: 6 },
      { desc:'07', id: 7 },
      { desc:'08', id: 8 },
      { desc:'09', id: 9 },
      { desc:'10', id: 10 },
      { desc:'11', id: 11 },
      { desc:'12', id: 12 },
      { desc:'13', id: 13 },
      { desc:'14', id: 14 },
      { desc:'15', id: 15 },
      { desc:'16', id: 16 },
      { desc:'17', id: 17 },
      { desc:'18', id: 18 },
      { desc:'19', id: 19 },
      { desc:'21', id: 21 },
      { desc:'22', id: 22 },
      { desc:'23', id: 23 },
      { desc:'24', id: 24 },
      { desc:'25', id: 25 },
      { desc:'26', id: 26 },
      { desc:'27', id: 27 },
      { desc:'28', id: 28 },
      { desc:'29', id: 29 },
      { desc:'30', id: 30 },
      { desc:'31', id: 31 }
    ];

    vm.allTags = [];
    vm.lstKeyWords = [];
    vm.filterSelected = true;

    vm.selectedGender = vm.cbeGender[0];
    vm.selectedDay = vm.cbeDays[0];
    vm.selectedMonth = vm.cbeMonths[0];

    vm.user = {
      username: '',
      _id: '',
      name: '',
      gender: '0',
      dob: '',
      average_stars: '0',
      acepted_terms: false,
      cover_image: '',
      img_data: '',
      payment: '',
      choices: []
    };

    function loadTags() {
      request._get('/tags')
        .then(function (data) {
          data.data.data.map(function (tag) {
            vm.allTags.push(tag.tag);
          });
        });
    }

    vm.init = function () {
      loadTags();
      loadData();
    };

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(contact) {
        return (contact.toLowerCase().indexOf(lowercaseQuery) !== -1);
      };

    }

    vm.querySearch = function (criteria) {
      return criteria ? vm.allTags.filter(createFilterFor(criteria)) : [];
    };

    vm.transformChip = function (chip) {
      if (!vm.allTags.filter(createFilterFor(chip)).length) {
        vm.allTags.push(chip);
        request._post('/tags', { tag: chip})
          .then(function () {

          })
          .catch(function () {

          });
      }

      return chip;
    };

    $scope.setFile = function(element) {
      $scope.currentFile = element.files[0];
      var reader = new FileReader();

      reader.onload = function(event) {
        vm.user.cover_image = event.target.result;
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

    vm.btnUpdate = function () {
      let usr = {};

      has_error.clearError();
      $rootScope.__showLoad = true;
      authentication.credential()
        .then(function (data) {

          let terms = vm.user.acepted_terms || false;

          vm.user.img_data = vm.user.cover_image;

          usr = {
            _id: data.data.data._id.toString() || '',
            name: vm.user.name || '',
            gender: vm.selectedGender.id.toString() || '0',
            dob: '',
            average_stars: data.data.data.average_stars.toString() || '',
            acepted_terms: terms ? '1' : '0',
            cover_image: vm.user.cover_image || '',
            payment: vm.user.payment || '',
            choices: []
          };

          vm.lstKeyWords.map(function (item) {
            usr.choices.push({ content: item });
          });

          if (usr.cover_image) {
            usr.cover_image = $rootScope.BASEURLS.BASE_API +
            '/upload/users/' +  data.data.data.username;
          }

          if (vm.year) {
            usr.dob = moment.utc(
              new Date(vm.year, vm.selectedMonth.id -1, vm.selectedDay.id  )
            ).format();
          }

          return usersFactory.update(usr);
        })
        .then(function (data) {
          return new Promise(function (resolve, reject) {
            if (changedImage) {
              return usersFactory.updateImg('/users/' + data.data.data.username,
                {
                  image: dataURItoBlob(vm.user.img_data)
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
          if (!data.status)
            throw data;
          $scope.$apply(function () {
            $rootScope.$broadcast('evt_navBarUser_event', '');
          });
          $location.path('/feed');

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

    function loadData() {
      authentication.credential()
        .then(function (data) {
          vm.user._id = data.data.data._id;
          vm.user.name = data.data.data.name;
          vm.user.gender = data.data.data.gender;
          vm.user.dob = data.data.data.dob;
          if (vm.user.dob) {
            let dt = vm.user.dob.split('-');
            vm.year = dt[0];
            vm.selectedDay = $filter('filter')(vm.cbeDays, { 'id': parseInt(dt[2].substr(0, 2)) })[0];
            vm.selectedMonth = $filter('filter')(vm.cbeMonths, { 'id': parseInt(dt[1]) })[0];
          }

          vm.selectedGender = vm.cbeGender[data.data.data.gender];
          vm.user.average_stars = data.data.data.average_stars;
          vm.user.acepted_terms = data.data.data.acepted_terms === 1 ? true: false;
          vm.user.cover_image = data.data.data.cover_image ? data.data.data.cover_image + '?' + new Date().getTime() : null;
          vm.user.payment = data.data.data.payment;
          vm.user.username = '@' + data.data.data.username;
          vm.user.choices = [];

          data.data.data.choices.map(function (item) {
            vm.lstKeyWords.push(item.content);
          });

        })
        .catch(function () {

        });
    }

  }

  UsersCtrl.$inject = [
    '$scope',
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
    .controller(litteraApp.modules.users.controllers.users.name, UsersCtrl);
}(angular, litteraApp));

