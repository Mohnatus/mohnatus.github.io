window.filword = (function() {

  // отправка событий аналитики
  var analytics = (function() {
    window.dataLayer = window.dataLayer || [];
    var gameName;
    var startMoment;
    var lastGuessedMoment;
    var count = 0;
    var totalCount = 0;


    var events = {
      start: 'GameStart', // игра началась
      word: 'word', // слово угадано
      wordTime: 'word-time', // время, за которое слово угадано
      first: 'first', // первое слово угадано
      error: {
        path: 'error-path', // ошибочный путь, слово правильное
        word: 'error-word', // ошибочное слово
      },
      finish: 'GameEnd', // конец игры
      hint: 'hint', // взята подсказка
    };

    var setName = function(name) {
      gameName = name;
    };

    var setTotal = function(total) {
      totalCount = total;
    };

    var sendEvent = function(action, label, value) {
      var eventData = {
        eventCategory: 'filword',
        eventAction: action,
      };
      if (label) eventData.eventLabel = label;
      if (value) eventData.eventValue = value;
      console.log('event', eventData);
      window.dataLayer.push(eventData);
    };

    // начало игры
    var start = function() {
      // запустить таймер игры
      startMoment = Date.now();
      // запустить таймер последнего угаданного слова
      lastGuessedMoment = startMoment;
      // событие GameStart
      sendEvent(events.start, gameName, totalCount);
    };

    // слово угадано
    var guess = function(word) {
      // посчитать время
      var now = Date.now();
      var time = (now - lastGuessedMoment) / 1000;
      // перезапустить таймер угаданных слов
      lastGuessedMoment = now;
      // отправить событие - угадано слово
      sendEvent(events.word, word);
      // отправить событие - время, за которое угадано слово
      sendEvent(events.wordTime, null, time);
      //если слово первое, отправить событие - угадано первое слово
      if (count == 0) sendEvent(events.first, word, time);
      count++;
      // отправить событие - имя игры, количество слов
      sendEvent(gameName, count);
    };

    // ошибка
    var error = function(type) {
      var eventName = events.error[type];
      if (eventName) sendEvent(eventName);
    };

    // игра окончена
    var finish = function() {
      var now = Date.now();
      var time = (now - startMoment) / 1000;
      sendEvent(events.finish, gameName, time);
    };

    // взята подсказки
    var hint = function() {
      var time = (Date.now() - startMoment) / 1000;
      sendEvent(events.hint, null, time);
    };

    return {
      setName: setName,
      setTotal: setTotal,
      sendEvent: sendEvent,
      events: events,
      start: start,
      guess: guess,
      error: error,
      finish: finish,
      hint: hint,
    }
  })();

  // список слов
  var wordsList = (function() {
    var selectors = {
      counter: '.words__count',
      total: '.total-count',
      current: '.current-count',
      list: '.words-list'
    };

    var totalCount;
    var guessedCount;

    var counter = document.querySelector(selectors.counter);
    var total = counter.querySelector(selectors.total);
    var current = counter.querySelector(selectors.current);
    
    var list = document.querySelector(selectors.list);

    // установить общее количество слов
    var setTotal = function(count) {
      total.textContent = count;
      totalCount = count;
    };

    // установить количество угаданных слов
    var setGuessed = function(count) {
      current.textContent = count;
      guessedCount = count;
    };

    var add = function(word) {
      var item = document.createElement('div');
      item.textContent = word.toLowerCase();
      list.appendChild(item);
    };

    return {
      setTotalCount: setTotal,
      setGuessedCount: setGuessed,
      add: add,
    };
  })();

  // игровое поле
  var field = (function() {
    var element = null; // контейнер для поля
    var cssPrefix = 'playground__'; // префикс для классов поля

    var rows = 0; // количество рядов
    var cols = 0; // количество колонок

    var cells = []; // массив dom-элементов ячеек

    var lastError = null; // последнее ошибочное слово
    var lastPathError = null; // последнее слово с ошибочным путем

    // тексты ошибок
    var errors = {
      'incorrectWord': 'не то слово, которое<br>здесь спрятано.',
      'incorrectPath': 'правильный ответ,<br>но расположен иначе.',
      'repeatPath': 'ты уже выделял это слово, отвянь',
    };
    // показать ошибку игры 
    // неправильное слово, неправильный путь
    var showError = (function() {
      var selectors = { // селекторы dom-элементов
        error: '.puzzle__error',
        button: '.continue',
        word: '.word-text',
        description: '.description',
        showAttr: 'data-show',
        showValue: 'show'
      };
      // dom-элемент ошибки
      var error = document.querySelector(selectors.error);
      // обработка нажатия на кнопку - Попробую еще
      // скрытие ошибки, продолжение игры
      error.querySelector(selectors.button).addEventListener('click', function() {
        error.setAttribute(selectors.showAttr, '');
        selection.setStatus('waiting');
      });
      // dom-элемент для вывода ошибочного слова
      var word = error.querySelector(selectors.word);
      // dom-Элемент для вывода текста ошибки
      var description = error.querySelector(selectors.description);

      return function(wordText, message) {
        word.textContent = wordText.toUpperCase();
        description.innerHTML = message;
        error.setAttribute(selectors.showAttr, selectors.showValue);
      }
    })();

    // ячейка поля
    var fieldCell = (function() {
      var cellClass = cssPrefix + 'cell';
      var notActiveClass = 'not-active';
      var emptyAttr = 'data-empty';
      var hintEmptyAttr = 'data-hint-empty';
      var selectedAttr = 'data-selected';
      var hintedAttr = 'data-hinted';
      var emptyClass = 'empty';
      var svgNamespace = 'http://www.w3.org/2000/svg';

      // создание svg-рамки
      var createBorders = function(cell) {
        var border = document.createElementNS(svgNamespace, 'svg');
        var borderSvg = Snap(border).attr({ 
          'class': 'svg-borders'
        });
        borderSvg.rect({ 
          'class': 'svg-border svg-border_top',
          x: 0, y: 0, height: 2, width: '100%'
        });
        borderSvg.rect({ 
          'class': 'svg-border svg-border_left',
          x: 0, y: 0, width: 2, height: '100%'
        });
        borderSvg.rect({ 
          'class': 'svg-border svg-border_right',
          x: '100%', y: 0, width: 2, height: '100%',
          transform: 'translate(-2px, 0)'
        });
        borderSvg.rect({ 
          'class': 'svg-border svg-border_bottom',
          x: 0, y: '100%', width: '100%', height: 2,
          transform: 'translate(0, -2px)'
        });
        cell.appendChild(border);
      };
      var setBorderAttr = function(cell, value, attr) {
        cell.setAttribute(attr, value);
      };
      var addBorder = function(cell, value, hint) {
        if (!cell || !value) return;

        var attr = hint ? hintEmptyAttr : emptyAttr;

        var borders = cell.getAttribute(attr).split('');
        var borderIndex = borders.indexOf(value);
        if (borderIndex > -1) {
          borders.splice(borderIndex, 1)
          setBorderAttr(cell, borders.join(''), attr);
        }
      };
      var removeBorder = function(cell, value, hint) {
        if (!cell || !value) return;

        var attr = hint ? hintEmptyAttr : emptyAttr;

        var borders = cell.getAttribute(attr);
        if (borders.indexOf(value) === -1) {
          setBorderAttr(cell, borders + value, attr);
        }
      };
      var removeAllBorders = function(cell) {
        if (!cell) return;
        setBorderAttr(cell, '', 'data-empty');
      };
      var getCrossBorder = function(prev, current) {
        if (!prev) return {
          prev: '',
          current: ''
        };

        var crossBorder = '';
        var crossPrevBorder = '';

        if (prev.x === current.x && prev.y - current.y === 1) {
          crossBorder = 'b';
          crossPrevBorder = 't';
        } else  if (prev.x === current.x && prev.y - current.y === -1) {
          crossBorder = 't';
          crossPrevBorder = 'b';
        } else  if (prev.y === current.y && prev.x - current.x === 1) {
          crossBorder = 'r';
          crossPrevBorder = 'l';
        } else  if (prev.y === current.y && prev.x - current.x === -1) {
          crossBorder = 'l';
          crossPrevBorder = 'r';
        }

        return {
          prev: crossPrevBorder,
          current: crossBorder
        };
      };
      var handleRemovingCellBorders = function(current, prev, hint) {
        var crossBorder = getCrossBorder(prev, current);
        addBorder(prev, crossBorder.prev, hint);
      };
      var handleAddingCellBorders = function(current, prev, hint) {
        var crossBorder = getCrossBorder(current, prev);
        removeBorder(prev, crossBorder.current, hint);
        removeBorder(current, crossBorder.prev, hint);
      };

      var isAvail = function(cell) {
        return !cell.selected && !cell.empty;
      }

      // выделить клетку
      var select = function(current, prev) {
        if (prev) {
          handleAddingCellBorders(prev, current);
        }
        current.selected = true;
        current.setAttribute(selectedAttr, '');
      };
      // снять выделение с клетки
      var deselect = function(current, prev) {
        current.selected = false;
        current.removeAttribute(selectedAttr);
        removeAllBorders(current);

        if (prev) handleRemovingCellBorders(current, prev);
      };

      // обработка событий
      // кнопка мыши нажата
      var mouseDownHandler = function(cell) {
        if (cell.selected || cell.empty) return;
        selection.start(cell);
      };
      // мышь над клеткой 
      var mouseOverHandler = function(cell) {
        if (cell.empty) return;
        selection.addCell(cell);
      };

      // создать ячейку
      var create = function(x, y, letter) {
        var cell = document.createElement('div');
        cell.classList.add(cssPrefix + 'cell');

        letter = letter.toUpperCase();

        // записать данные
        cell.x = x;
        cell.y = y;
        cell.letter = letter;
        cell.selected = false;
        cell.empty = !cell.letter;

        // поставить букву
        var text = document.createElement('span');
        cell.appendChild(text);
        if (letter) text.textContent = cell.letter;
        else cell.classList.add('not-active');

        // атрибуты для подсветки границ
        cell.setAttribute(emptyAttr, '');
        cell.setAttribute(hintEmptyAttr, '');

        createBorders(cell);

        cell.addEventListener('mousedown', function(e) {
          e.preventDefault();
          mouseDownHandler(cell);
        });
        cell.addEventListener('mouseover', function(e) {
          e.preventDefault();
          mouseOverHandler(cell);
        });

        return cell;
      };

      // очистить ячейку
      var clear = function(x, y) {
        var cell = cells[y][x];
        cell.selected = false;
        cell.empty = true;
        cell.removeAttribute(selectedAttr);
        cell.removeAttribute(hintedAttr);
        cell.classList.add(emptyClass);
        cell.children[0].textContent = '';
      };

      // выделить клетку подсказки
      var hint = function(cell, prev, delay) {
        if (prev) {
          handleAddingCellBorders(cell, prev, true);
        }
        cell.style.transitionDelay = delay + 'ms';
        cell.setAttribute(hintedAttr, '');
      };

      return {
        create: create,
        clear: clear,
        select: select,
        deselect: deselect,
        hint: hint,
        isAvail: isAvail,
      }
    })();

    // методы выделения
    var selection = (function() {
      var selectionAttr = 'data-selecting';

      // статусы выделения
      var statuses = {
        'waiting': 1,
        'selecting': 2,
        'selected': 3,
        'finish': 4,
        'pause': 5
      };
      var status = statuses.pause;

      var touched = false; // Обрабатывается касание

      var hintAnimationDelay = 150; // задержка для анимации выделения подсказки

      var isFree = function() {
        return status === statuses.waiting;
      };

      var setStatus = function(newStatus) {
        status = statuses[newStatus] || statuses.pause;
        if (status == statuses.selecting) element.setAttribute(selectionAttr, '');
        else element.removeAttribute(selectionAttr);
      };

      // выделенные клетки
      var selected = [];

      // начать выделение
      var start = function(cell, touching) {
        // если не режим ожидания, ничего не делать
        if (status !== statuses.waiting) return;

        if (touching && !touched || !touching && touched) return;

        // установить статус Выделение
        setStatus('selecting');
        // добавить клетку
        addCell(cell);
      };
      
      // удалить последнюю выделенную клетку
      var resetLastCell = function() {
        // снять выделение с клетки
        var cell = selected[selected.length - 1];
        var prevCell = selected[selected.length - 2];
        fieldCell.deselect(cell, prevCell);
        // удалить из массива выбранных
        selected.length = selected.length - 1;
      }

      // добавить клетку в выделение
      var addCell = function(cell) {
        // если выделение не идет, ничего не делать
        if (status !== statuses.selecting) return;

        // если клетка - предпоследняя в выделении,
        // убрать выделение с последней клетки
        var preLastCell = selected.length > 1 ? selected[selected.length - 2] : null;
        if (preLastCell && preLastCell.x === cell.x && preLastCell.y === cell.y) {
          resetLastCell();
          return;
        }

        // если клетка уже выделена, ничего не делать
        if (cell.selected) return;

        // добавить клетку
        // если есть выделенны, добавлять только соседнюю с последней выделенной
        var lastCell = selected.length ? selected[selected.length - 1] : null;
        if (!lastCell ||
          lastCell.x === cell.x && Math.abs(lastCell.y - cell.y) === 1 ||
          lastCell.y === cell.y && Math.abs(lastCell.x - cell.x) === 1
        ) {
          selected.push(cell);
          fieldCell.select(cell, lastCell);
        }
      };

      // закончить выделение
      var finish = function() {
        if (status !== statuses.selecting) return;
        setStatus('selected');

        if (!selected.length) {
          setStatus('waiting');
          return;
        }

        var word = '';
        var path = [];

        selected.forEach(function(cell) {
          word += cell.letter;
          path.push([cell.x, cell.y]);
        })
        
        var params = {
          word: word,
          path: path
        };

        checkSelection(params);
      };

      // убрать выделение
      var deselectPath = function(path) {
        path.forEach(function(coords) {
          var cell = cells[coords[1]][coords[0]];
          fieldCell.deselect(cell);
        });
      };

      // очистить клетки
      var clearPath = function(path) {
        path.forEach(function(coords) {
          fieldCell.clear(coords[0], coords[1]);
        })
      };

      var clearSelected = function() {
        selected.length = 0;
      };

      var hint = function(path) {
        setStatus('pause');
        var prev;


        for (var i = 0, len = path.length; i < len; i++) {
          var coords = path[i];
          var cell = cells[coords[1]][coords[0]];

          fieldCell.hint(cell, prev, i*hintAnimationDelay);

          prev = cell;
        }

        setStatus('waiting');
      };

      var getCellByTouch = function(touchObj) {
        var x = parseInt(touchObj.clientX);
        var y = parseInt(touchObj.clientY);
        var obj = document.elementFromPoint(x, y);
        if (!obj) return null;

        var $cell = obj.closest('.' + cssPrefix + 'cell');
        if (!$cell) return null;
        var cell = cells[$cell.y][$cell.x];
        return cell;
      }

      var addTouchHandling = function(wrapper) {
        wrapper.addEventListener('touchstart', function(e) {
          if (touched) return;
          touched = true;
          var cell = getCellByTouch(e.changedTouches[0]);
          e.preventDefault();
          if (!cell || !fieldCell.isAvail(cell)) return;
          start(cell, true);
        });

        wrapper.addEventListener('touchmove', function(e) {
          if (!touched) return;
          var cell = getCellByTouch(e.changedTouches[0]);
          e.preventDefault();
          if (!cell || !fieldCell.isAvail(cell)) return;
          addCell(cell);
        });

        wrapper.addEventListener('touchend', function(e) {
          touched = false;
          var cell = getCellByTouch(e.changedTouches[0]);
          e.preventDefault();
          finish();
        });
      }

      return {
        statuses: statuses,
        start: start,
        addCell: addCell,
        finish: finish,
        setStatus: setStatus,
        isFree: isFree,
        clearPath: clearPath,
        deselectPath: deselectPath,
        clearSelected: clearSelected,
        hint: hint,
        addTouchHandling: addTouchHandling,
      }
    })();

    // создать поле
    var create = function(container, letters) {
      element = container;

      rows = letters.length;
      cols = letters[0].length; 

      var wrapper = document.createElement('div');
      wrapper.classList.add(cssPrefix + 'table');
      selection.addTouchHandling(wrapper);
  
      for (var y = 0; y < rows; y++) {
        cells[y] = [];
        var row = document.createElement('div');
        row.classList.add(cssPrefix + 'row');

        for (var x = 0; x < cols; x++) {
          var cell = fieldCell.create(x, y, letters[y][x]);
          row.appendChild(cell);
          cells[y][x] = cell;
        }

        wrapper.appendChild(row);
      }

      element.appendChild(wrapper);

    };

    // очистить клетки маршрута
    var clearPath = function(path) {
      selection.clearPath(path);
    };

    // обработчик на отпускание кнопки мышки
    // и окончание прикосновения
    document.addEventListener('mouseup', function() {
      selection.finish();
    });
    document.addEventListener('touchend', function() {
      selection.finish();
    });

    var start = function() {
      selection.setStatus('waiting');
    };

    // отправить выделенное слово на проверку
    var checkSelection = function(params) {

      // отправить на проверку
      api.filword.check(params, function(res) {
        // Ответ пришел
        if (res.result) {

          // слово угадано верно
          if (res.result.check) {
            analytics.guess(params.word); // отправить событие
            wordsList.add(params.word); // Добавить в список угаданных
            selection.clearPath(params.path); // очистить клетки

            // больше слов нет
            if (res.result.coupon) {
              analytics.finish(); // отправить событие
              selection.setStatus('finish');
              app.showCoupon(res.result.coupon);
            } else {
              selection.setStatus('waiting');
            }

          } else { // слово не угадано
            selection.deselectPath(params.path); // убрать выделение с клеток
            selection.setStatus('pause');
            
            if (res.result.path) { // слово правильное, но маршрут другой
              analytics.error('path'); // отправить событие
              if (lastPathError == params.word) showError(params.word, errors.incorrectPath);
              else selection.setStatus('waiting');
              lastPathError = params.word;
            } else { // слово неправильное
              analytics.error('word'); // отправить событие
              if (lastError == params.word) showError(params.word, errors.incorrectWord);
              else selection.setStatus('waiting');
              lastError = params.word;
            }
          };
          selection.clearSelected();
        } else { // ответ не пришел
          app.showError(res.error);
        }
      })
    };

    // получить подсказку
    var getHint = (function() {
      var wasHinted = false;
      
      var btn = null;

      // убрать кнопку
      var hide = function() {
        btn.disabled = true;
        btn.removeAttribute('onclick');
        btn.onclick = function() { return false;}
      }

      return function(button) {
        btn = button;
        if (wasHinted) return;
        if (!selection.isFree()) return;
        // запросить подсказку
        api.filword.getHint(function(res) {
          // если ответ пришел
          if (res.result) {
            analytics.hint(); // отправить событие
            // отобразить подсказку на поле
            selection.hint(res.result);
            // удалить кнопку
            hide();
            wasHinted = true;
          } 
        })
      }
    })();

    return {
      create: create,
      clearPath: clearPath,
      start: start,
      getHint: getHint,
    }
  })();

    

  var start = function($puzzle, config) {
    console.log(config)
    // сохранить имя выпуска (для аналитики)
    analytics.setName(config.gameName);
    analytics.setTotal(config.totalCount)

    // установить общее количество слов
    // установить количество угаданных слов
    wordsList.setTotalCount(config.totalCount);
    wordsList.setGuessedCount(config.guessedCount);

    // создать поле из букв
    field.create($puzzle, config.cells);

    // если есть угаданные слова, вывести и отметить их
    if (config.guessedWords) {
      guessedWords = config.guessedWords;
      guessedWords.forEach(function(wordData) {
        wordsList.add(wordData.word);
        field.clearPath(wordData.path);
      })
    }

    // запустить аналитику
    analytics.start();
    field.start();
  };

  return {
    start: start,
    getHint: field.getHint,
  }
})();