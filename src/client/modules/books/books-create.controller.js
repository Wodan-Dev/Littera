/**
 * Created by jonathan on 17/04/17.
 */
'use strict';
(function (angular, litteraApp) {
  function BookCreateCtrl(
    $scope,
    $rootScope,
    $routeParams,
    $location,
    $filter,
    booksFactory,
    message,
    authentication,
    has_error,
    request,
    bookData) {
    var vm = this;
    let changedImage = false;
    let changedContent = false;
    vm.noPrice = true;
    vm.noOff = false;

    vm.price = {
      minimum: 0,
      suggested: 0
    };

    vm.promotion = {
      minimum: 0,
      suggested: 0
    };

    vm.book = {
      _id: '-',
      _id_user: '',
      title: '',
      subtitle: '',
      synopsis: '',
      content: '',
      status: 0,
      percentage: 0,
      esbn: '',
      date_published: moment(),
      visible: 0,
      language: '',
      average_star: 0,
      prices: [],
      forums: [],
      rankings: [],
      keywords: [],
      comments: [],
      cover_image: $rootScope.BASEURLS.BASE_API +
      '/upload/books/' +  this._id + '?' + new Date().getTime()
    };

    vm.allTags = [];
    vm.lstKeyWords = [];
    vm.filterSelected = true;
    vm.cover_url = '';
    vm.maxPriceDef = 100;
    vm.maxPricePro = 100;

    vm.cbei18n = [
      { desc: 'Albanian (Albania)', id: 'sq_AL' },
      { desc: 'Albanian', id: 'sq' },
      { desc: 'Arabic (Algeria)', id: 'ar_DZ' },
      { desc: 'Arabic (Bahrain)', id: 'ar_BH' },
      { desc: 'Arabic (Egypt)', id: 'ar_EG' },
      { desc: 'Arabic (Iraq)', id: 'ar_IQ' },
      { desc: 'Arabic (Jordan)', id: 'ar_JO' },
      { desc: 'Arabic (Kuwait)', id: 'ar_KW' },
      { desc: 'Arabic (Lebanon)', id: 'ar_LB' },
      { desc: 'Arabic (Libya)', id: 'ar_LY' },
      { desc: 'Arabic (Morocco)', id: 'ar_MA' },
      { desc: 'Arabic (Oman)', id: 'ar_OM' },
      { desc: 'Arabic (Qatar)', id: 'ar_QA' },
      { desc: 'Arabic (Saudi Arabia)', id: 'ar_SA' },
      { desc: 'Arabic (Sudan)', id: 'ar_SD' },
      { desc: 'Arabic (Syria)', id: 'ar_SY' },
      { desc: 'Arabic (Tunisia)', id: 'ar_TN' },
      { desc: 'Arabic (United Arab Emirates)', id: 'ar_AE' },
      { desc: 'Arabic (Yemen)', id: 'ar_YE' },
      { desc: 'Arabic', id: 'ar' },
      { desc: 'Belarusian (Belarus)', id: 'be_BY' },
      { desc: 'Belarusian', id: 'be' },
      { desc: 'Bulgarian (Bulgaria)', id: 'bg_BG' },
      { desc: 'Bulgarian', id: 'bg' },
      { desc: 'Catalan (Spain)', id: 'ca_ES' },
      { desc: 'Catalan', id: 'ca' },
      { desc: 'Chinese (China)', id: 'zh_CN' },
      { desc: 'Chinese (Hong Kong)', id: 'zh_HK' },
      { desc: 'Chinese (Singapore)', id: 'zh_SG' },
      { desc: 'Chinese (Taiwan)', id: 'zh_TW' },
      { desc: 'Chinese', id: 'zh' },
      { desc: 'Croatian (Croatia)', id: 'hr_HR' },
      { desc: 'Croatian', id: 'hr' },
      { desc: 'Czech (Czech Republic)', id: 'cs_CZ' },
      { desc: 'Czech', id: 'cs' },
      { desc: 'Danish (Denmark)', id: 'da_DK' },
      { desc: 'Danish', id: 'da' },
      { desc: 'Dutch (Belgium)', id: 'nl_BE' },
      { desc: 'Dutch (Netherlands)', id: 'nl_NL' },
      { desc: 'Dutch', id: 'nl' },
      { desc: 'English (Australia)', id: 'en_AU' },
      { desc: 'English (Canada)', id: 'en_CA' },
      { desc: 'English (India)', id: 'en_IN' },
      { desc: 'English (Ireland)', id: 'en_IE' },
      { desc: 'English (Malta)', id: 'en_MT' },
      { desc: 'English (New Zealand)', id: 'en_NZ' },
      { desc: 'English (Philippines)', id: 'en_PH' },
      { desc: 'English (Singapore)', id: 'en_SG' },
      { desc: 'English (South Africa)', id: 'en_ZA' },
      { desc: 'English (United Kingdom)', id: 'en_GB' },
      { desc: 'English (United States)', id: 'en_US' },
      { desc: 'English', id: 'en' },
      { desc: 'Estonian (Estonia)', id: 'et_EE' },
      { desc: 'Estonian', id: 'et' },
      { desc: 'Finnish (Finland)', id: 'fi_FI' },
      { desc: 'Finnish', id: 'fi' },
      { desc: 'French (Belgium)', id: 'fr_BE' },
      { desc: 'French (Canada)', id: 'fr_CA' },
      { desc: 'French (France)', id: 'fr_FR' },
      { desc: 'French (Luxembourg)', id: 'fr_LU' },
      { desc: 'French (Switzerland)', id: 'fr_CH' },
      { desc: 'French', id: 'fr' },
      { desc: 'German (Austria)', id: 'de_AT' },
      { desc: 'German (Germany)', id: 'de_DE' },
      { desc: 'German (Luxembourg)', id: 'de_LU' },
      { desc: 'German (Switzerland)', id: 'de_CH' },
      { desc: 'German', id: 'de' },
      { desc: 'Greek (Cyprus)', id: 'el_CY' },
      { desc: 'Greek (Greece)', id: 'el_GR' },
      { desc: 'Greek', id: 'el' },
      { desc: 'Hebrew (Israel)', id: 'iw_IL' },
      { desc: 'Hebrew', id: 'iw' },
      { desc: 'Hindi (India)', id: 'hi_IN' },
      { desc: 'Hungarian (Hungary)', id: 'hu_HU' },
      { desc: 'Hungarian', id: 'hu' },
      { desc: 'Icelandic (Iceland)', id: 'is_IS' },
      { desc: 'Icelandic', id: 'is' },
      { desc: 'Indonesian (Indonesia)', id: 'in_ID' },
      { desc: 'Indonesian', id: 'in' },
      { desc: 'Irish (Ireland)', id: 'ga_IE' },
      { desc: 'Irish', id: 'ga' },
      { desc: 'Italian (Italy)', id: 'it_IT' },
      { desc: 'Italian (Switzerland)', id: 'it_CH' },
      { desc: 'Italian', id: 'it' },
      { desc: 'Japanese (Japan)', id: 'ja_JP' },
      { desc: 'Japanese (Japan JP)', id: 'ja_JP_JP' },
      { desc: 'Japanese', id: 'ja' },
      { desc: 'Korean (South Korea)', id: 'ko_KR' },
      { desc: 'Korean  ', id: 'ko' },
      { desc: 'Latvian (Latvia)', id: 'lv_LV' },
      { desc: 'Latvian     ', id: 'lv' },
      { desc: 'Lithuanian (Lithuania)', id: 'lt_LT' },
      { desc: 'Lithuanian  ', id: 'lt' },
      { desc: 'Macedonian (Macedonia)', id: 'mk_MK' },
      { desc: 'Macedonian', id: 'mk' },
      { desc: 'Malay (Malaysia)', id: 'ms_MY' },
      { desc: 'Malay   ', id: 'ms' },
      { desc: 'Maltese (Malta)', id: 'mt_MT' },
      { desc: 'Maltese', id: 'mt' },
      { desc: 'Norwegian (Norway)', id: 'no_NO' },
      { desc: 'Norwegian (Norway Nynorsk)', id: 'no_NO_NY' },
      { desc: 'Norwegian', id: 'no' },
      { desc: 'Polish (Poland)', id: 'pl_PL' },
      { desc: 'Polish', id: 'pl' },
      { desc: 'Portuguese (Brazil)', id: 'pt_BR' },
      { desc: 'Portuguese (Portugal)', id: 'pt_PT' },
      { desc: 'Portuguese', id: 'pt' },
      { desc: 'Romanian (Romania)', id: 'ro_RO' },
      { desc: 'Romanian', id: 'ro' },
      { desc: 'Russian (Russia)', id: 'ru_RU' },
      { desc: 'Russian', id: 'ru' },
      { desc: 'Serbian (Bosnia and Herzegovina)', id: 'sr_BA' },
      { desc: 'Serbian (Montenegro)', id: 'sr_ME' },
      { desc: 'Serbian (Serbia and Montenegro)', id: 'sr_CS' },
      { desc: 'Serbian (Serbia)', id: 'sr_RS' },
      { desc: 'Serbian', id: 'sr' },
      { desc: 'Slovak (Slovakia)', id: 'sk_SK' },
      { desc: 'Slovak', id: 'sk' },
      { desc: 'Slovenian (Slovenia)', id: 'sl_SI' },
      { desc: 'Slovenian', id: 'sl' },
      { desc: 'Spanish (Argentina)', id: 'es_AR' },
      { desc: 'Spanish (Bolivia)', id: 'es_BO' },
      { desc: 'Spanish (Chile)', id: 'es_CL' },
      { desc: 'Spanish (Colombia)', id: 'es_CO' },
      { desc: 'Spanish (Costa Rica)', id: 'es_CR' },
      { desc: 'Spanish (Dominican Republic)', id: 'es_DO' },
      { desc: 'Spanish (Ecuador)', id: 'es_EC' },
      { desc: 'Spanish (El Salvador)', id: 'es_SV' },
      { desc: 'Spanish (Guatemala)', id: 'es_GT' },
      { desc: 'Spanish (Honduras)', id: 'es_HN' },
      { desc: 'Spanish (Mexico)', id: 'es_MX' },
      { desc: 'Spanish (Nicaragua)', id: 'es_NI' },
      { desc: 'Spanish (Panama)', id: 'es_PA' },
      { desc: 'Spanish (Paraguay)', id: 'es_PY' },
      { desc: 'Spanish (Peru)', id: 'es_PE' },
      { desc: 'Spanish (Puerto Rico)', id: 'es_PR' },
      { desc: 'Spanish (Spain)', id: 'es_ES' },
      { desc: 'Spanish (United States)', id: 'es_US' },
      { desc: 'Spanish (Uruguay)', id: 'es_UY' },
      { desc: 'Spanish (Venezuela)', id: 'es_VE' },
      { desc: 'Spanish', id: 'es' },
      { desc: 'Swedish (Sweden)', id: 'sv_SE' },
      { desc: 'Swedish', id: 'sv' },
      { desc: 'Thai (Thailand)', id: 'th_TH' },
      { desc: 'Thai (Thailand TH)', id: 'th_TH_TH' },
      { desc: 'Thai', id: 'th' },
      { desc: 'Turkish (Turkey)', id: 'tr_TR' },
      { desc: 'Turkish', id: 'tr' },
      { desc: 'Ukrainian (Ukraine)', id: 'uk_UA' },
      { desc: 'Ukrainian', id: 'uk' },
      { desc: 'Vietnamese (Vietnam)', id: 'vi_VN' },
      { desc: 'Vietnamese', id: 'vi' }
    ];

    vm.cbeVisible = [
      { desc:'Público', id: 0 },
      { desc:'Seguidores', id: 1 },
      { desc:'Oculto', id: 2 }
    ];

    vm.selectedVisible = vm.cbeVisible[0];
    vm.selectedI18n = vm.cbei18n[104];

    function loadTags() {
      request._get('/tags')
        .then(function (data) {
          data.data.data.map(function (tag) {
            vm.allTags.push(tag.tag);
          });
        });
    }

    vm.init = function () {
      loadTags();

      if ($routeParams.id) {

        bookData.data.keywords.map(function (item) {
          vm.lstKeyWords.push(item.content);
        });

        vm.selectedVisible = $filter('filter')(vm.cbeVisible, { id: bookData.data.visible })[0];
        vm.selectedI18n = $filter('filter')(vm.cbei18n, { id: bookData.data.language })[0];

        vm.cover_url = bookData.data.cover_image;
        vm.noPrice = bookData.data.prices.length === 0;

        if (bookData.data.prices.length > 0) {
          let priceDef = $filter('filter')(bookData.data.prices, { type: 0 });
          if (priceDef.length) {
            vm.price = {
              minimum: priceDef[0].price_min,
              suggested: priceDef[0].price_sug
            };

            vm.maxPrice = vm.price.suggested + 15;


          }
          priceDef = $filter('filter')(bookData.data.prices, { type: 1 });
          if (priceDef.length) {
            vm.noOff = true;
            vm.promotion = {
              minimum: priceDef[0].price_min,
              suggested: priceDef[0].price_sug
            };
          }

        }

        vm.book = {
          _id: bookData.data._id,
          _id_user: bookData.data._id_user,
          title: bookData.data.title,
          subtitle: bookData.data.subtitle,
          synopsis: bookData.data.synopsis,
          content: bookData.data.content,
          status: bookData.data.status,
          percentage: bookData.data.percentage,
          esbn: bookData.data.esbn,
          date_published: bookData.data.date_published,
          visible: bookData.data.visible,
          language: bookData.data.language,
          average_star: bookData.data.average_star,
          prices: bookData.data.prices,
          forums: bookData.data.forums,
          rankings: bookData.data.rankings,
          keywords: bookData.data.keywords,
          comments: bookData.data.comments,
          cover_image: bookData.data.cover_image
        };
      }
    };

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(contact) {
        return (contact.toLowerCase().indexOf(lowercaseQuery) !== -1);
      };

    }

    vm.querySearch = function (criteria) {
      return criteria ? vm.allTags.filter(createFilterFor(criteria)) : [];
    };

    vm.transformChip = function (chip) {
      if (!vm.allTags.filter(createFilterFor(chip)).length) {
        vm.allTags.push(chip);
        request._post('/tags', { tag: chip})
          .then(function () {

          })
          .catch(function () {

          });
      }

      return chip;
    };

    vm.updateMaxValueDef = function () {

      let perc = vm.maxPriceDef * 0.10;
      if ((vm.maxPriceDef - vm.price.suggested) < perc)
        vm.maxPriceDef += 10;

    };

    vm.updateMaxValuePro = function () {

      let perc = vm.maxPricePro * 0.10;
      if ((vm.maxPricePro - vm.promotion.suggested) < perc)
        vm.maxPricePro += 10;

    };

    $scope.setFile = function(element) {
      $scope.currentFile = element.files[0];
      var reader = new FileReader();

      reader.onload = function(event) {
        vm.book.cover_image = event.target.result;
        changedImage = true;
        $scope.$apply();

      };
      reader.readAsDataURL(element.files[0]);
    };

    $scope.setContent = function(element) {
      $scope.currentContent = element.files[0];
      var reader = new FileReader();

      reader.onload = function(event) {
        changedContent = true;
        $scope.$apply();

      };
      reader.readAsDataURL(element.files[0]);
    };

    vm.hasError = function (field) {
      return has_error.hasError(field);
    };

    vm.getErrorMessage = function (field) {
      return has_error.getErrorMessage(field);
    };

    vm.btnCreate = function () {
      let bookNew = {};
      let idFolder = '';
      let username = '';

      has_error.clearError();
      $rootScope.__showLoad = true;
      authentication.credential()
        .then(function (data) {
          if ((!$routeParams.id) && (!changedContent)) {
            throw {
              data: {
                data: {
                  value: 'content',
                  err: 'Informe o conteúdo da sua publicação.'
                }
              }
            };
          }

          username = data.data.data.username;

          vm.book.img_data = vm.book.cover_image;

          bookNew = {
            _id_user: data.data.data._id.toString(),
            title: vm.book.title,
            subtitle: vm.book.subtitle,
            synopsis: vm.book.synopsis,
            content: 'vm.book.content',
            status: (vm.book.percentage === 100 ? 0 : 1).toString(),
            percentage: vm.book.percentage,
            esbn: vm.book.esbn,
            date_published: vm.book.date_published,
            visible: vm.selectedVisible.id,
            language: vm.selectedI18n.id,
            average_star: vm.book.average_star,
            prices: [],
            forums: vm.book.forums,
            rankings: vm.book.rankings,
            keywords: [],
            comments: vm.book.comments,
            cover_image: vm.cover_url
          };

          if (!vm.noPrice) {
            bookNew.prices.push({
              price_min: vm.price.minimum,
              price_sug: vm.price.suggested,
              active: 1,
              type: 0
            });

            if(vm.noOff) {
              bookNew.prices.push({
                price_min: vm.promotion.minimum,
                price_sug: vm.promotion.suggested,
                active: 1,
                type: 1
              });
            }
          }

          idFolder = booksFactory.getIdFolder(
            (!$routeParams.id) ? '': bookNew.cover_image
          );

          if (!$routeParams.id) {
            bookNew.cover_image = $rootScope.BASEURLS.BASE_API +
            '/upload/books/' + idFolder;
          }

          bookNew.content = $rootScope.BASEURLS.BASE_API + '/content/' + idFolder + '/content.epub';

          vm.lstKeyWords.map(function (item) {
            bookNew.keywords.push({ content: item });
          });

          if ($routeParams.id) {
            bookNew._id = $routeParams.id;
            return booksFactory.update(bookNew);
          }

          return booksFactory.create(bookNew);
        })
        .then(function (data) {
          /* uploading book cover */
          return new Promise(function (resolve, reject) {
            if (changedImage) {
              return booksFactory.updateImg('/books/' + idFolder,
                {
                  image: dataURItoBlob(vm.book.img_data)
                })
                .then(function () {
                  resolve(data);
                })
                .catch(function (err) {
                  reject(err);
                });
            }
            else
              resolve(data);
          });

        })

        .then(function (data) {
          /* uploading book content */
          return new Promise(function (resolve, reject) {
            if (changedContent) {
              return booksFactory.updateContent('/books/content/' + idFolder,
                {
                  content: $scope.currentContent
                })
                .then(function () {
                  resolve(data);
                })
                .catch(function (err) {
                  reject(err);
                });
            }
            else
              resolve(data);
          });

        })
        .then(function (data) {
          $scope.$apply(function () {
            $location.path('/written/'+ username);
          });
        })
        .catch(function (data) {

          if (data.data) {
            let lst = data.data.data.err;
            $scope.$apply(function () {
              if (lst instanceof Array) {
                for (var i = 0, len = lst.length; i < len; i++) {
                  has_error.addError(lst[i].field, lst[i].message);
                }
              }
              else {
                has_error.addError(data.data.data.value, data.data.data.err);
              }

            });
          }
          $rootScope.__showLoad = false;
          $scope.$apply();

        });
    };

    function dataURItoBlob(dataURI) {
      var binary = atob(dataURI.split(',')[1]);
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      var array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], {
        type: mimeString
      });
    }

  }

  BookCreateCtrl.$inject = [
    '$scope',
    '$rootScope',
    '$routeParams',
    '$location',
    '$filter',
    litteraApp.modules.books.factories.books,
    litteraApp.modules.books.imports.message,
    litteraApp.modules.books.imports.authentication,
    litteraApp.modules.books.imports.has_error,
    litteraApp.modules.books.imports.request,
    'bookData'
  ];

  angular.module(litteraApp.modules.books.name)
    .controller(litteraApp.modules.books.controllers.bookCreate.name, BookCreateCtrl);
}(angular, litteraApp));
