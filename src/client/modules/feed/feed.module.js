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
      request: litteraApp.core.services.request
    }
  };

  angular.module(litteraApp.modules.feed.name, [
    litteraApp.core.name,
    'ngRoute',
    'ngResource',
  ]);

}(angular, litteraApp));
