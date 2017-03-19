/**
 * Created by jonathan on 11/07/16.
 */
'use strict';
(function() {
  var modal = document.getElementById('Modal');
  var navLeft = document.getElementById('NavLeft');
  var navRight = document.getElementById('NavRight');
  var navUser = document.getElementById('NavUser');
  var btnMenu = document.getElementById('btnMenu');
  var btnUser = document.getElementById('btnUser');
  var btnUserPic = document.getElementById('btnUserPic');
  var btnSearch = document.getElementById('btnSearch');
  var txtSearch = document.getElementById('txtSearch');
  var icoSearch = document.getElementById('icoSearch');

  if (btnUserPic) {
    btnUserPic.addEventListener('click', function () {
      modal.style.display = 'block';
      navUser.style.right = '0';
    });
  }

  if (btnMenu) {
    btnMenu.addEventListener('click', function () {
      modal.style.display = 'block';
      navLeft.style.left = '0';
    });
  }

  if (btnUser) {
    btnUser.addEventListener('click', function () {
      if ((txtSearch.style.display || 'none') === 'none') {
        modal.style.display = 'block';
        navRight.style.right = '0';
      }
    });
  }

  if (btnSearch) {
    btnSearch.addEventListener('click', function () {
      changeSearch();
    });
  }

  window.addEventListener('resize', function() {
    if ((txtSearch.style.display || 'none')  !== 'none') {
      changeSearch();
    }
  });

  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
      navLeft.style.left = '-15.625rem'; /* '-250px'; */
      navRight.style.right = '-15.625rem'; /* '-250px'; */
      navUser.style.right = '-15.625rem'; /* '-250px'; */
    }
  });

  function changeSearch() {
    var navUser = document.getElementById('navDescUser');
    var txtUserName =  document.getElementById('txtUsername');
    if ((txtSearch.style.display || 'none') === 'none') {
      if (window.innerWidth >= 600) {
        navUser.style.width = '25rem'; /* '400px'; */
        btnUser.style.width = '18.75rem'; /* '300px'; */
      }
      else {
        txtSearch.style.width = '9.375rem'; /* '150px'; */
      }

      txtSearch.style.display = 'block';
      txtUserName.style.display = 'none';
      icoSearch.className = 'fa fa-times';

    }
    else {
      if (window.innerWidth >= 600) {
        txtSearch.style.width = '18.75rem'; /* '300px'; */
      }
      navUser.style.width = '15.625rem'; /* '250px'; */
      txtSearch.style.display = 'none';
      txtUserName.style.display = 'block';
      btnUser.style.width = '9.375rem'; /* '150px'; */
      icoSearch.className = 'fa fa-search';
    }
  }
}());
