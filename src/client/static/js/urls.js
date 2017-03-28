/**
 * Created by jonathan on 19/03/17.
 */
'use strict';
(function (litteraApp){
  litteraApp.URLS = {
    HOME: function () {
      return '/';
    },
    FEED: function () {
      return '/feed';
    },
    LOGIN: function (next) {
      let n = '?next=' + next;
      return '/mordor/login';
    },
    MORDOR: {
      AUTHENTICATION: function () {
        return '/mordor/authenticate';
      },
      ME: function () {
        return '/mordor/me';
      }
    },
    NOTAUTHORIZED: function() {
      return '/not-authorized';
    },
    SERVERERROR: function() {
      return function (code) {
        if (code)
          return '/server-error/' + code;
        else
          return '/server-error/:errorCode';
      };
    },
    NOTFOUND: function () {
      return '/not-found';
    }
  };
}(litteraApp));
