/**
 * Created by jonathan on 19/03/17.
 */
'use strict';
(function (angular, litteraApp) {
  litteraApp.modules.feed = {
    name: 'litteraApp.feed',
    controllers: {
      feed: {
        name: 'FeedController',
        nameas: 'FeedCtrl'
      }
    },
    routes: {
      feed: litteraApp.URLS.HOME()
    },
    factories: {
      feed: {
        url: 'views/feed.view.html'
      }
    },
    templates: {
    },
    imports: {
    }
  };

  angular.module(litteraApp.modules.feed.name, [
    'ngRoute'
  ]);

}(angular, litteraApp));
