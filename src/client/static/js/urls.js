/**
 * Created by jonathan on 19/03/17.
 */
'use strict';
(function (litteraApp){
  litteraApp.URLS = {
    HOME: function () {
      return '/';
    },
    BOOKS: function() {
      return function (id) {
        if (id)
          return '/books/' + id;
        else
          return '/books';
      };
    },
    STORE: function () {
      return function (page) {
        if (page)
          return '/store?page=' + page;
        else
          return '/store';
      };

    },
    FEED: function () {
      return '/feed';
    },
    USER: function () {
      return '/users';
    },
    LOGIN: function () {
      return '/mordor/login';
    },
    REGISTER: function () {
      return '/mordor/register';
    },
    LOGINNEXT: function () {
      return function () {
        return '/mordor/login/:next';
      };

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
