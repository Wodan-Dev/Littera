/**
 * Created by jonathan on 19/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  function FeedCtrl($rootScope, $scope, $window, request) {
    var vm = this;
    request._get('/users/req.body36/feed')
      .then(function (data) {
        $scope.$apply(function () {

          console.log('data');
          console.log(data);
          vm.feedItems = data.data.data.docs;
          console.log(vm.feedItems);
        });
      })
      .catch(function (err) {
        console.log(err);
      });

    /*
    let av ={
      "_id": "58dc3e4a7c2d351d25dbd83c",
      "_id_user": {
      "_id": "58bc25201945b3130dee89b3",
        "username": "req.body36",
        "email": "req36.body@email.com",
        "password": "$2a$14$yekIkJ20yIcKGR4STWEVJejyjl8QQHZDCEXyWTVAx7Hu095HbKf4C",
        "__v": 0,
        "written_books": [
        {
          "_id_book": "58dc3d37712edd1c4d46819f",
          "_id": "58dc3d37712edd1c4d4681a0"
        },
        {
          "_id_book": "58dc3d9d40a4b91cadaf60d3",
          "_id": "58dc3d9d40a4b91cadaf60d4"
        },
        {
          "_id_book": "58dc3e4a7c2d351d25dbd83a",
          "_id": "58dc3e4a7c2d351d25dbd83b"
        }
      ],
        "library": [],
        "wishlist": [
        {
          "date_saved": "2017-03-16T04:07:11.553Z",
          "_id": "58ca0f6faffbb26baf496ae6"
        },
        {
          "date_saved": "2017-03-16T04:09:21.155Z",
          "_id": "58ca0ff1affbb26baf496ae7"
        },
        {
          "date_saved": "2017-03-16T04:18:24.509Z",
          "_id_book": "58bc9042ad45b31bd96c10a1",
          "_id": "58ca1210f7eb606d11e874c1"
        }
      ],
        "following": [
        {
          "date_followed": "2017-03-15T04:04:59.775Z",
          "_id_user_follow": "58bc25201945b3130dee89b3",
          "_id": "58c8bd6b01c9c61ed7f70dc0"
        }
      ],
        "followers": [
        {
          "date_followed": "2017-03-15T04:04:59.775Z",
          "_id_user_follow": "58bc9a1cfc6fc621cfd8b865",
          "_id": "58c8bd6b01c9c61ed7f70dc0"
        },
        {
          "date_followed": "2017-03-15T04:07:56.924Z",
          "_id_user_follow": "58c8be04934c8b1f7a1c6b99",
          "_id": "58c8be1c934c8b1f7a1c6b9a"
        }
      ],
        "choices": [
        {
          "content": "dados",
          "_id": "58c88137bcea111aad3dd970",
          "modified_at": "2017-03-14T23:49:49.514Z",
          "create_at": "2017-03-14T23:48:07.201Z"
        }
      ],
        "reviews": [],
        "checksum": "-",
        "modified_at": "2017-03-05T14:47:57.860Z",
        "create_at": "2017-03-05T14:47:57.860Z",
        "is_staff": false,
        "status": true,
        "acepted_terms": 0,
        "average_stars": 0,
        "gender": 0
    },
      "_id_book": {
      "_id": "58dc3e4a7c2d351d25dbd83a",
        "title": "livro novo",
        "synopsis": "livro novo",
        "content": "livro novo",
        "percentage": 100,
        "esbn": "12155",
        "date_published": "2017-02-19T03:00:00.000Z",
        "visible": 1,
        "language": "sdddsd",
        "average_star": 1,
        "__v": 0,
        "comments": [],
        "keywords": [],
        "rankings": [],
        "forums": [],
        "prices": [],
        "modified_at": "2017-03-29T23:07:54.857Z",
        "created_at": "2017-03-29T23:06:44.115Z",
        "status": 1
    },
      "__v": 0,
      "modified_at": "2017-03-29T23:07:54.883Z",
      "create_at": "2017-03-29T23:07:54.883Z",
      "type_feed": 0
    }


    vm.feedItems = [
      {
        _id: '',
        post_url: '#/feed/' + 'id',
        post_cover: './static/images/publicacoes.jpg',
        user_picture: './static/images/image (12).jpg',
        user_url: '#/user/kennymack',
        name: 'J. R. R. Tolkien',
        create_at: 'Dom, 10 de Jul 17:02',
        bookmark: '#/bookmark/1',
        post_title: 'O - Hobbit – J. R. R. Tolkien',
        post_content: `Numa toca no chão vivia um hobbit. Não uma toca desagradável,
        suja e úmida, cheia de restos de minhocas e com cheiro de lodo; tampouco uma
        toca seca, vazia e arenosa, sem nada em que sentar ou o que comer: era a toca
        de um hobbit, e isso quer dizer conforto.\r\n
        A toca tinha uma porta perfeitamente redonda como uma
        escotilha, pintada de verde, com uma maçaneta brilhante de latão amarelo
        exatamente no centro.`,
        post_ranking_url: '#/books/1',
        post_average_starts: 5,
        post_ranking_comment: 10
      }
    ];

    console.log('request');
    request._get('/books')
      .then(function (data) {
        console.log(data);
      })
      .catch(function (err) {
        console.log(err);
      });*/
  }

  FeedCtrl.$inject = [ '$rootScope', '$scope', '$window',
    litteraApp.modules.feed.imports.request];

  angular.module(litteraApp.modules.feed.name)
    .controller(litteraApp.modules.feed.controllers.feed.name, FeedCtrl);
}(angular, litteraApp));
