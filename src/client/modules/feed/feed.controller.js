/**
 * Created by jonathan on 19/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  function FeedCtrl($rootScope, $window, request) {
    var vm = this;
    vm.feedItems = [
      {
        post_id: 1,
        post_url: '#/books/1',
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
      });
  }

  FeedCtrl.$inject = ['$rootScope', '$window',
    litteraApp.modules.feed.imports.request];

  angular.module(litteraApp.modules.feed.name)
    .controller(litteraApp.modules.feed.controllers.feed.name, FeedCtrl);
}(angular, litteraApp));
