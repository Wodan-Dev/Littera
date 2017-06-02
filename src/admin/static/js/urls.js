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
        let url = '/store';

        if (page)
          url += '?page=' + page;

        return url;
      };
    },
    STORE_QUERY: function () {
      return function (page, query) {
        let url = '/store/q?' + query;

        if (page)
          url += '&page=' + page;

        return url;
      };
    },
    STOREDETAIL: function () {
      return function (id) {
        return '/store/book/' + id;
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
    CHANGE_PASS: function () {
      return '/mordor/change';
    },
    FORGOT_PASS: function () {
      return '/mordor/forgot';
    },
    RECOVER_PASS: function () {
      return function (param) {
        return '/mordor/recover/' + param;
      };
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
      },
      CHANGE: function () {
        return '/mordor/change';
      },
      FORGOT: function () {
        return '/mordor/forgot';
      },
      RECOVER: function () {
        return '/mordor/recover/';
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
    },
    BOOKS_BOUGHT_PAGE: function () {
      return '/sales/bought/';
    },
    BUSINESS_BOOKS_PERFORMANCE_PAGE: function () {
      return '/business/sales/performance/';
    },
    BUSINESS_BOOKS_PERFORMANCE: function () {
      return function (username) {
        return '/users/'+username + '/sales/performance/';
      };
    },
    BUSINESS_BOOKS_PROFIT: function () {
      return function (username) {
        return '/users/'+username + '/sales/profit/';
      };
    },
    BUSINESS_BOOKS_TOTAL_PROFIT: function () {
      return function (username) {
        return '/users/'+username + '/sales/total/';
      };
    },
    BUSINESS_BOOKS_BOOK_COUNT: function () {
      return function (username, idBook) {
        return '/users/'+username + '/sales/books/' + idBook;
      };
    },
    TRENDS: function () {
      return '/users/top/trends';
    },
    TRENDING: function () {
      return '/trending';
    },
    READINGS: function () {
      return '/readings';
    },
    TERMS: function () {
      return '/terms';
    },
    ADMIN: function () {
      return '/admin';
    }
  };
}(litteraApp));
