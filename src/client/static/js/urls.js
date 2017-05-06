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
    BOOK_CREATE: function() {
      return '/book';
    },
    BOOK_UPDATE: function() {
      return function (id) {
        return '/book/' + id;
      };
    },
    BOOK_READING: function() {
      return function (id) {
        return '/book/reading/' + id;
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
    STOREDETAIL: function () {
      return function (id) {
        return '/store/' + id;
      };
    },
    USER: function () {
      return '/users';
    },
    USER_DETAIL_PAGE: function () {
      return function (username) {
        return '/user/'+ username;
      };
    },
    USER_DETAIL: function () {
      return function (username) {
        return '/user/'+ username;
      };
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
    },
    FEED: function () {
      return function (user) {
        return '/users/' + user + '/feed';
      };
    },
    FEED_PAGE: function () {
      return '/feed';
    },
    USERS: function() {
      return function (user) {
        if (user)
          return '/users/' + user;
        else
          return '/users';
      };
    },
    WRITTENBOOKS_PAGE: function() {
      return function (user) {
        return '/written/' + user;
      };
    },
    WRITTENBOOKS: function() {
      return function (user) {
        return '/users/' + user + '/written/'; // '/written/' + user;
      };
    },
    SALES_PAGE: function () {
      return '/sales';
    },
    SALES: function () {
      return '/sales';
    },
    WISHLIST: function () {
      return function (username, id) {
        if (id)
          return '/users/' + username + '/wish/' + id;

        return '/users/' + username + '/wish';

      };
    }
  };
}(litteraApp));
