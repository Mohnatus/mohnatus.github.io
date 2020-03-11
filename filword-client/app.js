var test = {
  auth: true,
  used: false,
  coupon: false,
  game: true,
  checkError: false,
  check: false,
  path: false,
  finish: false,
  error: false
}

var testCoupon = {
  coupon: '123-987-000',
  discount: 15,
  date: Date.parse(new Date(2018, 10, 22))
}

var helper = {
  loadScript: function(src, error, success) {
    var script = document.createElement('script');
    script.src = src;
    document.body.appendChild(script);
    script.onload = function() {
      success ? success() : null;
    };
    script.onerror = function() {
      error ? error() : null;
    }
  }
}

var api = {
  
  filword: {
    words: ["бродский","довлатов","зощенко","замятин","войнович","мандельштам","распутин","цветаева","астафьев","гумилев","ахматова","аксенов"],
    pathes: [
          [[6,3],[6,4],[6,5],[7,5],[8,5],[9,5],[9,6],[9,7]],
          [[10,5],[10,4],[9,4],[9,3],[8,3],[8,2],[9,2],[10,2]],
          [[10,3],[11,3],[11,2],[11,1],[11,0],[10,0],[9,0]],
          [[9,1],[8,1],[8,0],[7,0],[6,0],[5,0],[4,0]],
          [[7,1],[6,1],[5,1],[4,1],[3,1],[2,1],[1,1],[1,2]],
          [[3,2],[2,2],[2,3],[3,3],[3,4],[2,4],[2,5],[3,5],[3,6],[2,6],[2,7]],
          [[1,3],[1,4],[1,5],[1,6],[1,7],[0,7],[0,8],[0,9]],
          [[1,9],[1,8],[2,8],[2,9],[3,9],[3,8],[4,8],[5,8]],
          [[5,9],[6,9],[7,9],[8,9],[9,9],[10,9],[11,9],[11,8]],
          [[9,8],[10,8],[10,7],[11,7],[11,6],[11,5],[11,4]],
          [[8,8],[8,7],[7,7],[7,8],[6,8],[6,7],[5,7],[4,7]],
          [[4,6],[4,5],[5,5],[5,6],[6,6],[7,6],[8,6]]
      ],
    // проверяет участника, говорит, что с ним делать
    // купон - coupon
    // игра - game
    // ??
    start: function(callback) {
      var res = {
        result: {
          coupon: false, // данные купона
          used: false, // купон применен
          game: false, // данные игры
        }
      };

      if (test.used) res.result.used = true;
      else if (test.coupon) res.result.coupon = testCoupon;
      else if (test.game) res.result.game = {
        name: 'GAME1',
        totalCount: 14,
        guessedCount: 0,
        guessedWords: [
          { 
            word: 'булгаков',
            path: [[4,4],[4,3],[5,3],[5,2],[6,2],[7,2],[7,3],[7,4]]
          },{
            word: 'пастернак',
            path: [[3,0],[2,0],[1,0],[0,0],[0,1],[0,2],[0,3],[0,4],[0,5]]
          },
        ],
        cells: [
          ["т","с","а","п","н","и","т","я","м","о","к","н"],
          ["е","и","в","о","н","й","о","в","а","з","","е"],
          ["р","ч","а","м","","г","а","к","т","о","в","щ"],
          ["н","р","н","д","у","л","б","о","а","л","з","о"],
          ["а","а","л","е","б","","р","в","","в","о","в"],
          ["к","с","ь","ш","к","с","о","д","с","к","д","е"],
          ["","п","а","т","а","е","н","о","в","и","","л"],
          ["т","у","м","","а","в","о","м","х","й","м","и"],
          ["и","в","е","е","в","а","т","а","а","г","у","в"],
          ["н","ц","т","а","","а","с","т","а","ф","ь","е"]
        ]
      }
      if (test.error) res.result = null;
      callback(res)
    },
    // проверяет выделенное слово
    // правильно, дальше
    // правильно, все угадано
    // неправильно, но есть такое же
    // неправильно
    check: function(params, callback) {

      var res = {
        result: {
          check: true, // слово угадано
          coupon: false, // слова кончились
          path: false // по-другому расположено
        }
      };

      if (!this.words.length || test.finish) {
        res.result.check = true;
        res.result.coupon = testCoupon;
      } else {
        var index = this.words.indexOf(params.word.toLowerCase());

        if (index == -1) res.result.check = false;
        else {
          var path = this.pathes[index];
          for (var i = 0; i < path.length; i++) {
            var selectedCell = params.path[i];
            var cell = path[i];
            if (cell[0] !== selectedCell[0] || cell[1] !== selectedCell[1]) {
              res.result.check = false;
              res.result.path = true;
              break;
            }
          }
          if (res.result.check) {
            this.words.splice(index, 1);
            this.pathes.splice(index, 1);
          }
        }
      }


      callback(res);
    },
    // выдать подсказку
    getHint: function(callback) {
      callback({
        result: this.pathes[1]
      })
    }
  }
};

// полифилл для ie
(function addCustomEvents() {
  try {
    new CustomEvent("");
  } catch (e) {
    window.CustomEvent = function(event, params) {
      var evt;
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined
      };
      evt = document.createEvent("CustomEvent");
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    };
  
    CustomEvent.prototype = Object.create(window.Event.prototype);
  }
})();

(function() {
  var copyButtonClass = '.puzzle-coupon__copy';
  var clipboard = new Clipboard(copyButtonClass);
  clipboard.on('success', function(e) {
    e.clearSelection();
    document.querySelector(copyButtonClass).innerHTML = "код скопирован";
  });
})();

var events = {
  auth: {
    check: function(callback) {
      // Заглушка
      if (window.test.auth) {
        callback();
      } else {
        console.log('authorisation window');
      }
    }
  }
}

var app = (function() {
  // dom-селекторы
  var selectors = {
    'page': '.puzzle',
    'startAttr': 'data-started',

    'errorText': '.puzzle-error__description',

    'coupon': {
      'block': '.puzzle-coupon',
      'text': '.puzzle-coupon__text',
      'date': '.puzzle-coupon__date',
      'discount': '.puzzle-coupon__discount',
      'lastDayAttr': 'data-last-day',
      'used': '.used-show',
      'notUsed': '.used-hide'
    },

    'puzzle': '.playground'
  };
  // виды страницы
  var views = {
    'error': 'error',
    'coupon': 'coupon',
    'game': 'play',
  };
  // тексты ошибок
  var errors = {
    'default': 'Что-то пошло не так. Попробуйте перезагрузить страницу.',
    'script': 'Не удалось загрузить скрипт игры'
  }

  var page = document.querySelector(selectors.page); // dom-элемент страницы для изменения вида


  var tetris = window.tetris; // модуль с методами тетриса
  var tetrisLoaded = false; // эффект сборки кубика завершен
  var startDelay = 400; // ?? что-то для тетриса

  // сменить экран
  var setView = function (view) {
    page.setAttribute('data-view', view);
  };

  // запустить эффект сборки кубика
  var startTetris = function (callback) {
    if (!tetris || tetrisLoaded) {
      callback ? callback() : null;
      return;
    }
    page.setAttribute('data-cube', '');
    tetris.start(function() {
      callback ? callback() : null;
      setTimeout(function() {
        page.removeAttribute('data-delay');
      }, 2800);
      tetrisLoaded = true;
    }, startDelay);
  };

  // вывести ошибку
  var showError = function(message) {
    message = message || errors.default;
    element = document.querySelector(selectors.errorText);
    if (element) element.innerHTML = message;
    setView(views.error);
  };
  
  // нажатие на кнопку как играть
  // показать экран правил
  // effect - эффект сборки кубика
  var showRules = function(effect) {
    if (effect == 'cube') {
      startTetris(function() {
        setView('rules');
      })
    } else setView('rules');
  };

  // показать экран с купоном
  // установить данные купона
  var showCoupon = function(data) {
    var couponBlock = document.querySelector(selectors.coupon.block);

    var usedShow = couponBlock.querySelector(selectors.coupon.used);
    var usedHide = couponBlock.querySelector(selectors.coupon.notUsed);

    // если нет данных о купоне
    if (!data) {
      // спрятать блок с данными
      usedHide.style.display = 'none';
    } else {
      // спрятать блок Купон применен
      usedShow.style.display = 'none';
      // вывести данные купона
      var couponText = couponBlock.querySelector(selectors.coupon.text);
      var couponDate = couponBlock.querySelector(selectors.coupon.date);
      var couponDiscount = couponBlock.querySelector(selectors.coupon.discount);

      // рассчитываем дату, чтобы вывести количество оставшихся дней
      var date = new Date(data.date);
      var now = Date.now();

      if (date - now < 1000 * 60 * 60 * 24) 
        couponBlock.setAttribute(selectors.coupon.lastDayAttr, '');

      var outputDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      outputDate += '.';
      outputDate += date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
      outputDate += '.';
      outputDate += date.getFullYear();

      couponText.innerHTML = data.coupon;
      couponDate.innerHTML = outputDate;
      couponDiscount.innerHTML = data.discount;
    }

    setView(views.coupon);
  }

  // показать экран с игрой
  // установить данные игры
  var showGame = function(game) {
    var element = document.querySelector(selectors.puzzle);
    var onload = function() {
      // запустить игру
      console.log(window.filword)
      if (window.filword) {
        page.setAttribute(selectors.startAttr, '');
        window.filword.start(element, game);
        setView(views.game);
      }
      else showError(errors.script);
    };
    var onerror = function() {
      showError(errors.script);
    };
    //загрузить скрипт игры
    helper.loadScript('filword.js?v=8', onerror, onload);
  }

  // нажатие на кнопку старт
  var start = function(effect) {
    // проверить авторизацию
    events.auth.check(function() {
      var tetrisCallback = null;

      // если авторизован
      // отправить запрос к апи
      // что делать с этим участником
      api.filword.start(function(res) {
        if (res.result) {
          if (res.result.used) { // если купон применен
            tetrisCallback = function() {
              showCoupon();
            }
          } else if (res.result.coupon) { // если вернулся купон
            tetrisCallback = function() {
              showCoupon(res.result.coupon);
            } 
          } else if (res.result.game) { // если вернулась игра
            tetrisCallback = function() {
              showGame(res.result.game);
            }
          } else {
            // что тут может быть еще?
          }

          if (tetrisLoaded || !effect) { // если кубик уже собрался
            // просто выполнить коллбэк
            tetrisCallback ? tetrisCallback() : null;
          }
        } else {
          showError('проблемы с отправкой запроса');
        }
      });

      if (effect) {
        // запустить эффект собирания кубика
        tetris.start(function() {
          console.log('tetris loaded');
          tetrisLoaded = true;
          // выполнить коллбэк, если он есть
          tetrisCallback ? tetrisCallback() : null;
        });
      }
    })
  }



  return {
    start: start, // кнопка Начать игру
    showRules: showRules, // показать экран правил
    toGame: function() {
      setView(views.game);
    },
    showError: showError, // показать экран ошибки
    showCoupon: showCoupon,
  }
})();