/**
 * Created by jonathan on 28/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  function StoreCtrl($rootScope, $window, request) {
    var vm = this;

    vm.book = {
      _id: '',
      title: '',
      username: '',
      cover: '',
      synopsis: ''
    };


    vm.btnShowDetail = function(book) {
      $rootScope.__showModal = true;
      vm.book._id = book._id.$oid;
      vm.book.title = book.title;
      vm.book.username = book.username;
      vm.book.cover = book.cover;
      vm.book.synopsis = book.synopsis;
      document.getElementById('book-'+book._id.$oid).style.display = 'block';
    };

    vm.showItemDetail = function (id) {
      return vm.book._id === id;
    };

    vm.btnCloseDetail = function (id) {

      document.getElementById('book-'+id).style.display = 'none';
      console.log('c');
      vm.book._id = '-';
      vm.showDetail = false;
      $rootScope.__showModal = false;
    };

    vm.showDetail = false;


    vm.books = [{
      '_id': {
        '$oid': '58d9b570fc13ae3e7200028e'
      },
      'title': 'Maria GonzalezMaria Gonzalez Maria Gonzalez Maria GonzalezMaria Gonzalez',
      'username': 'mgonzalez0',
      'cover': 'http://dummyimage.com/244x200.png/ff4444/ffffff',
      'synopsis': 'morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit ametmorbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit ametmorbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit ametmorbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit ametmorbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit ametmorbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit ametmorbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet'
    }, {
      '_id': {
        '$oid': '58d9b570fc13ae3e7200028f'
      },
      'title': 'Jerry Andrews',
      'username': 'jandrews1',
      'cover': 'http://dummyimage.com/145x135.png/cc0000/ffffff',
      'synopsis': 'dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed'
    }, {
      '_id': {
        '$oid': '58d9b570fc13ae3e72000290'
      },
      'title': 'Linda Williamson',
      'username': 'lwilliamson2',
      'cover': 'http://dummyimage.com/142x236.png/cc0000/ffffff',
      'synopsis': 'habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat'
    }, {
      '_id': {
        '$oid': '58d9b570fc13ae3e72000291'
      },
      'title': 'Diane Morgan',
      'username': 'dmorgan3',
      'cover': 'http://dummyimage.com/134x242.png/dddddd/000000',
      'synopsis': 'sapien non mi integer ac neque duis bibendum morbi non quam nec'
    }, {
      '_id': {
        '$oid': '58d9b570fc13ae3e72000292'
      },
      'title': 'Joan Harper',
      'username': 'jharper4',
      'cover': 'http://dummyimage.com/236x149.png/cc0000/ffffff',
      'synopsis': 'amet justo morbi ut odio cras mi pede malesuada in'
    }, {
      '_id': {
        '$oid': '58d9b570fc13ae3e72000293'
      },
      'title': 'Katherine Morrison',
      'username': 'kmorrison5',
      'cover': 'http://dummyimage.com/130x173.png/cc0000/ffffff',
      'synopsis': 'in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin'
    }, {
      '_id': {
        '$oid': '58d9b570fc13ae3e72000294'
      },
      'title': 'Jeffrey Fisher',
      'username': 'jfisher6',
      'cover': 'http://dummyimage.com/207x204.png/dddddd/000000',
      'synopsis': 'blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi'
    }, {
      '_id': {
        '$oid': '58d9b570fc13ae3e72000295'
      },
      'title': 'Samuel Meyer',
      'username': 'smeyer7',
      'cover': 'http://dummyimage.com/112x215.png/dddddd/000000',
      'synopsis': 'curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a'
    }, {
      '_id': {
        '$oid': '58d9b570fc13ae3e72000296'
      },
      'title': 'Carl Austin',
      'username': 'caustin8',
      'cover': 'http://dummyimage.com/177x165.png/ff4444/ffffff',
      'synopsis': 'vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id'
    }, {
      '_id': {
        '$oid': '58d9b570fc13ae3e72000297'
      },
      'title': 'Ruth Greene',
      'username': 'rgreene9',
      'cover': 'http://dummyimage.com/236x221.png/cc0000/ffffff',
      'synopsis': 'diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis'
    }, {
      '_id': {
        '$oid': '58d9b570fc13ae3e72000298'
      },
      'title': 'Matthew Thomas',
      'username': 'mthomasa',
      'cover': 'http://dummyimage.com/208x132.png/dddddd/000000',
      'synopsis': 'faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel'
    }, {
      '_id': {
        '$oid': '58d9b570fc13ae3e72000299'
      },
      'title': 'Philip Schmidt',
      'username': 'pschmidtb',
      'cover': 'http://dummyimage.com/184x111.png/ff4444/ffffff',
      'synopsis': 'habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum'
    }, {
      '_id': {
        '$oid': '58d9b570fc13ae3e7200029a'
      },
      'title': 'Christine Hayes',
      'username': 'chayesc',
      'cover': 'http://dummyimage.com/118x106.png/cc0000/ffffff',
      'synopsis': 'morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus'
    }, {
      '_id': {
        '$oid': '58d9b570fc13ae3e7200029b'
      },
      'title': 'Teresa Woods',
      'username': 'twoodsd',
      'cover': 'http://dummyimage.com/151x112.png/ff4444/ffffff',
      'synopsis': 'pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum'
    }, {
      '_id': {
        '$oid': '58d9b570fc13ae3e7200029c'
      },
      'title': 'Rose Oliver',
      'username': 'rolivere',
      'cover': 'http://dummyimage.com/248x165.png/5fa2dd/ffffff',
      'synopsis': 'luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec'
    }, {
      '_id': {
        '$oid': '58d9b570fc13ae3e7200029d'
      },
      'title': 'Chris Dean',
      'username': 'cdeanf',
      'cover': 'http://dummyimage.com/144x213.png/5fa2dd/ffffff',
      'synopsis': 'quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor'
    }, {
      '_id': {
        '$oid': '58d9b570fc13ae3e7200029e'
      },
      'title': 'Anna Peters',
      'username': 'apetersg',
      'cover': 'http://dummyimage.com/215x156.png/cc0000/ffffff',
      'synopsis': 'erat quisque erat eros viverra eget congue eget semper rutrum'
    }, {
      '_id': {
        '$oid': '58d9b570fc13ae3e7200029f'
      },
      'title': 'Juan Cole',
      'username': 'jcoleh',
      'cover': 'http://dummyimage.com/132x238.png/dddddd/000000',
      'synopsis': 'duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse'
    }, {
      '_id': {
        '$oid': '58d9b570fc13ae3e720002a0'
      },
      'title': 'Victor Perkins',
      'username': 'vperkinsi',
      'cover': 'http://dummyimage.com/151x126.png/ff4444/ffffff',
      'synopsis': 'commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel'
    }, {
      '_id': {
        '$oid': '58d9b570fc13ae3e720002a1'
      },
      'title': 'Marilyn Lewis',
      'username': 'mlewisj',
      'cover': 'http://dummyimage.com/170x221.png/dddddd/000000',
      'synopsis': 'tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod'
    }];
  }

  StoreCtrl.$inject = ['$rootScope', '$window',
    litteraApp.modules.store.imports.request];

  angular.module(litteraApp.modules.store.name)
    .controller(litteraApp.modules.store.controllers.store.name, StoreCtrl);
}(angular, litteraApp));
