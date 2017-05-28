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
      },
      trends: {
        name: 'TrendsController',
        nameas: 'TrendsCtrl'
      },
      trending: {
        name: 'TrendingController',
        nameas: 'TrendingCtrl'
      },
      readings: {
        name: 'ReadingsController',
        nameas: 'ReadingsCtrl'
      }
    },
    routes: {
      feed: litteraApp.URLS.FEED(),
      trends: litteraApp.URLS.TRENDS(),
      feed_page: litteraApp.URLS.FEED_PAGE(),
      trending: litteraApp.URLS.TRENDING(),
      readings: litteraApp.URLS.READINGS(),
    },
    factories: {

    },
    services: {
      trends: 'trendsService',
      feed: 'feedService'
    },
    templates: {
      feed: {
        url: 'views/feed.view.html'
      },
      trending: {
        url: 'views/trending-detail.view.html'
      },
      readings: {
        url: 'views/readings-detail.view.html'
      }
    },
    imports: {
      localSave: litteraApp.core.factories.localSave,
      request: litteraApp.core.services.request,
      authentication: litteraApp.modules.auth.factories.authentication,
      message: litteraApp.core.services.messages,
      salesFactory: litteraApp.modules.sales.factories.sales
    }
  };

  angular.module(litteraApp.modules.feed.name, [
    litteraApp.core.name,
    'ngRoute',
    'ngResource',
  ]);

}(angular, litteraApp));
