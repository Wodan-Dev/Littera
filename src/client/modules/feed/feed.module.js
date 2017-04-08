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
      feed: litteraApp.URLS.FEED(),
      feed_page: litteraApp.URLS.FEED_PAGE()
    },
    factories: {

    },
    services: {
      feed: 'feedService'
    },
    templates: {
      feed: {
        url: 'views/feed.view.html'
      }
    },
    imports: {
      localSave: litteraApp.core.factories.localSave,
      request: litteraApp.core.services.request,
      authentication: litteraApp.modules.auth.factories.authentication,
      message: litteraApp.core.services.messages
    }
  };

  angular.module(litteraApp.modules.feed.name, [
    litteraApp.core.name,
    'ngRoute',
    'ngResource',
  ]);

}(angular, litteraApp));
