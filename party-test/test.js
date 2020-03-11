'use strict';

(function () {
  "use strict";

  var $$$modules$testData$$default = [['romantic', 'Романтика'], ['fantastic', 'Фантастика и фэнтези'], ['detectives', 'Детективы'], ['classic', 'Отечественная классика'], ['fairy', 'Сказки'], ['poetry', 'Поэзия']];

  var $$$modules$EqualTest$$$test = document.getElementById('party-test');
  var $$$modules$EqualTest$$$options = $$$modules$EqualTest$$$test.querySelector('.test-question__options');

  var $$$modules$EqualTest$$Test = {
    $: $$$modules$EqualTest$$$test,
    $name: $$$modules$EqualTest$$$test.querySelector('.test-name'),
    progress: {
      $: $$$modules$EqualTest$$$test.querySelector('.test-progress'),
      item: 'party-icon',
      statusAttr: 'data-status',
      successStatus: 'check',
      failStatus: 'fail'
    },
    $question: $$$modules$EqualTest$$$test.querySelector('.test-question__text'),
    $optionsContainer: $$$modules$EqualTest$$$options,
    $options: [$$$modules$EqualTest$$$options.querySelector('[data-option="1"]'), $$$modules$EqualTest$$$options.querySelector('[data-option="2"]'), $$$modules$EqualTest$$$options.querySelector('[data-option="3"]')],
    $note: $$$modules$EqualTest$$$test.querySelector('.test-question__note'),
    $next: $$$modules$EqualTest$$$test.querySelector('.test-next'),
    questions: null,
    check: null,
    blocked: false,
    result: 0,
    firstClick: true
  };

  $$$modules$EqualTest$$Test.setData = function (data) {
    this.$name.innerHTML = 'Тест дня: ' + data.name;
    this.questions = data.questions;
    this.check = data.check;

    this.$next.querySelector('.party-button').textContent = "Следующий вопрос";

    this.start();
  };

  $$$modules$EqualTest$$Test.start = function () {
    var _this = this;

    this.current = 0;
    this.showQuestion();

    this.$options.forEach(function (option, index) {
      option.addEventListener('click', function (e) {
        if (_this.blocked) return;
        _this.handleAnswer(option);
      });
    });

    this.$next.addEventListener('click', this.nextQuestion.bind(this));
  };

  $$$modules$EqualTest$$Test.showNote = function () {
    this.$note.innerHTML = this.questions[this.current].note;
  };

  $$$modules$EqualTest$$Test.hideNote = function () {
    this.$note.innerHTML = '';
  };

  $$$modules$EqualTest$$Test.showNext = function () {
    this.$next.style.display = "block";
  };

  $$$modules$EqualTest$$Test.hideNext = function () {
    this.$next.style.display = "none";
  };

  $$$modules$EqualTest$$Test.handleAnswer = function (option) {
    this.block();

    if (this.firstClick) {
      this.firstClick = false;
      this.onFirstClick ? this.onFirstClick() : null;
    }

    var correct = this.checkOption(option.getAttribute('data-option'));
    if (correct) this.result++;else this.showCorrectOption();
    var status = correct ? 'check' : 'fail';

    var progressItem = this.progress.$.querySelector('[data-index="' + (this.current + 1) + '"]');

    progressItem.setAttribute('data-status', status);

    option.setAttribute('data-status', status);
    this.showNote();
    this.showNext();
  };

  $$$modules$EqualTest$$Test.checkOption = function (option) {
    return option == this.check[this.current];
  };

  $$$modules$EqualTest$$Test.showCorrectOption = function () {
    this.$options[this.check[this.current] - 1].setAttribute('data-status', 'view');
  };

  $$$modules$EqualTest$$Test.nextQuestion = function (e) {
    this.hideNote();
    this.hideNext();

    this.current++;
    if (this.current == this.questions.length - 1) {
      this.$next.querySelector('.party-button').textContent = "Закончить тест";
    }
    this.$.setAttribute('data-current', this.current + 1);
    if (this.current >= this.questions.length) {
      this.finishGame();
    } else {
      this.showQuestion();
    }
  };

  $$$modules$EqualTest$$Test.showQuestion = function () {
    this.unblock();
    this.$options.forEach(function (option, index) {
      option.removeAttribute('data-status');
    });
    var question = this.questions[this.current];
    this.$question.innerHTML = question.question;

    for (var i = 0, count = question.options.length; i < count; i++) {
      this.$options[i].querySelector('.text').innerHTML = question.options[i];
    }
  };

  $$$modules$EqualTest$$Test.block = function () {
    this.blocked = true;
    this.$optionsContainer.setAttribute('data-block', '');
  };

  $$$modules$EqualTest$$Test.unblock = function () {
    this.blocked = false;
    this.$optionsContainer.removeAttribute('data-block');
  };

  $$$modules$EqualTest$$Test.finishGame = function () {
    this.onSuccess ? this.onSuccess(this.result) : null;
  };

  var $$$modules$EqualTest$$default = $$$modules$EqualTest$$Test;
  function $$helpers$$setEnding(count, endings, prefixes) {
    var rem = count % 100;
    var index = 2;
    if (rem < 11 || rem > 14) {
      rem = count % 10;
      if (rem == 1) index = 0;
      if (rem >= 2 && rem <= 4) index = 1;
    }

    var prefix = prefixes ? prefixes[index] : '';
    var ending = endings[index];

    return prefix + ' ' + count + ' ' + ending;
  }

  var $$texts$$compliments = ["Так держать!", "Вот это знания!", "Вот это да!", "Да вы чемпион!", "Ого! Да вы настоящий книголюб!"];

  var $$texts$$default = {
    nullPointsMessage: "Вы пока не набрали ни одного балла. Пройдите тест целиком и здесь появятся ваши результаты.",
    getMessagePhrase: function getMessagePhrase(data) {
      var randomIndex = Math.floor(Math.random() * $$texts$$compliments.length);
      var randomCompliment = $$texts$$compliments[randomIndex];
      var nextDiscountPhrase = "";
      if (data.nextDiscount) {
        nextDiscountPhrase = "Еще " + $$helpers$$setEnding(data.pointsLeft, ["правильный ответ", "правильных ответа", "правильных ответов"]) + ", и скидка " + data.nextDiscount + "% ваша!";
      }
      return randomCompliment + ' \u0421\u043A\u0438\u0434\u043A\u0430 ' + data.currentDiscount + '% \u0437\u0430\u0440\u0430\u0431\u043E\u0442\u0430\u043D\u0430. ' + nextDiscountPhrase;
    },
    discountMessage: {
      0: "Вы дали 0 правильных ответов.<br>Сожалеем, скидка даётся за хотя бы один правильный ответ",
      5: "Хорошая новость: у вас впереди много отличных книг!<br>Которые станут ближе с приятной скидкой – 5%.",
      10: "Вы молодец и много знаете о книгах.<br>А со скидкой 10% вас ждет еще много интересного!",
      15: "Ура! Вы настоящий знаток литературы, обладатель острого ума и завидной памяти.<br>Получайте заслуженную награду – 15% скидки!"
    }

  };

  var $$$modules$AchievementsBlock$$AchievementsBlock = {
    $scheme: document.querySelector('.scheme'),
    $ranges: document.querySelector('.scheme__ranges'),
    $days: document.querySelector('.scheme__dates'),
    $blocks: document.querySelector('.test-achievements__blocks'),
    $pointsToWin: document.querySelector('.test-achievements__message'),
    $message: document.querySelector('.test-achievements__message'),
    $title: document.querySelector('.test-achievements__title'),
    currentRange: null,
    currentBlock: null,
    currentDay: null,
    total: 0,
    lastDay: false,
    finished: false
  };

  $$$modules$AchievementsBlock$$AchievementsBlock.showDiscount = [[0, false], [15, true], [20, false], [25, true]];

  $$$modules$AchievementsBlock$$AchievementsBlock.pointsToWin = [{
    from: 0,
    to: 0,
    discount: 0
  }, {
    from: 1,
    to: 19,
    discount: 5
  }, {
    from: 20,
    to: 29,
    discount: 10
  }, {
    from: 30,
    to: 36,
    discount: 15
  }];

  $$$modules$AchievementsBlock$$AchievementsBlock.getDiscountData = function (points) {
    var current = 0;
    for (var i = 0, count = this.pointsToWin.length; i < count; i++) {
      var step = this.pointsToWin[i];
      if (points >= step.from && points <= step.to) {
        current = i;
        break;
      }
    }
    var currentDiscount = this.pointsToWin[current];
    var nextDiscount = this.pointsToWin[current + 1];

    return {
      points: points,
      currentDiscount: currentDiscount['discount'],
      nextDiscount: nextDiscount ? nextDiscount['discount'] : null,
      nextDiscountText: nextDiscount ? nextDiscount['discountText'] : null,
      pointsLeft: nextDiscount ? nextDiscount['from'] - points : 0
    };
  };

  $$$modules$AchievementsBlock$$AchievementsBlock.updateMessage = function (points) {
    var titlePhrase = this.finished ? "Результаты теста" : "Ваши достижения";
    if (points > 0) {
      titlePhrase += ": " + $$helpers$$setEnding(points, ["ответ", "ответа", "ответов"]);
    }

    var discountData = this.getDiscountData(points);

    var messagePhrase = $$texts$$default.nullPointsMessage;

    if (this.finished) {
      messagePhrase = '<p>' + $$texts$$default.discountMessage[discountData['currentDiscount']] + '</p>';

      if (points > 0) messagePhrase += '<a class="party-button bg_yellow" href="/">Перейти на сайт</a>';else {
        this.$scheme.style.display = "none";
        this.$blocks.style.display = "none";
      }
    } else if (points > 0) {

      messagePhrase = $$texts$$default.getMessagePhrase(discountData);
    }

    this.$title.innerHTML = titlePhrase;
    this.$message.innerHTML = messagePhrase;
  };

  $$$modules$AchievementsBlock$$AchievementsBlock.setData = function (config) {
    var testCount = $$$modules$testData$$default.length;
    var testIndex = config.currentTestIndex;

    this.finished = testIndex === -1 || testIndex >= testCount;
    this.lastDay = testIndex === testCount - 1;

    this.total = config.status && config.totalPoints ? config.totalPoints : 0;

    this.showData(config);

    this.updateMessage(this.total);
  };
  $$$modules$AchievementsBlock$$AchievementsBlock.showData = function (config) {
    var _this2 = this;

    var _loop = function _loop(test) {
      var result = config.results[test];
      var selector = '[data-day="' + test + '"]';
      var $block = _this2.$blocks.querySelector(selector);
      var index = $block.getAttribute('data-index');
      var $range = _this2.$ranges.querySelector(selector);
      var $day = _this2.$days.querySelector(selector);

      var setPassed = function setPassed(points) {
        points = config.status && _this2.total > 0 ? points : 0;
        $range.setAttribute('data-range', points);
        $block.setAttribute('data-pass', true);
        $block.querySelector('.current').textContent = points;
      };

      if (index < config.currentTestIndex || config.currentTestIndex === -1) {
        var points = result.passed ? result.points : 0;
        setPassed(points);
      } else if (index == config.currentTestIndex) {
        _this2.currentBlock = $block;
        _this2.currentRange = $range;
        $day.classList.add('current');
        if (result.passed) {
          if (_this2.lastDay) _this2.finished = true;
          setPassed(result.points);
        }
      } else {}
    };

    for (var test in config.results) {
      _loop(test);
    }
  };

  $$$modules$AchievementsBlock$$AchievementsBlock.updateCurrent = function (points) {
    if (this.lastDay) this.finished = true;
    this.currentRange.setAttribute('data-range', points);
    this.currentBlock.setAttribute('data-pass', '');
    this.currentBlock.querySelector('.current').textContent = points;
    this.total = this.total + points;
    this.updateMessage(this.total);
  };

  var $$$modules$AchievementsBlock$$default = $$$modules$AchievementsBlock$$AchievementsBlock;
  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  function $$$modules$AnimatedScroll$$animatedScrollBottom(position, duration, increment) {
    duration = duration || 300;
    increment = increment || 10;
    var element = document.documentElement,
        start = element.scrollTop;
    if (!start && start !== 0) {
      element = document.body;
      start = element.scrollTop;
    }
    var bottom = document.documentElement.clientHeight;
    var diff = position + start - bottom;

    if (diff < 10) return;

    var scrollHeight = diff;

    if (start >= scrollHeight) return;

    var change = scrollHeight - start,
        currentTime = 0;

    var scroll = function scroll() {
      currentTime += increment;
      var val = Math.easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(scroll, increment);
      }
    };

    scroll();
  }function $$$modules$AnimatedScroll$$animatedScrollTop(position, duration, increment) {
    duration = duration || 300;
    increment = increment || 10;

    var element = document.documentElement,
        start = element.scrollTop;

    var diff = position + start;
    var scrollHeight = diff;
    if (diff < 10) return;

    if (!start && start !== 0) {
      element = document.body;
      start = element.scrollTop;
    }

    if (start >= scrollHeight) return;

    var change = scrollHeight - start,
        currentTime = 0;

    var scroll = function scroll() {
      currentTime += increment;
      var val = Math.easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(scroll, increment);
      }
    };

    scroll();
  }

  window.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function (e) {
      if (e.target.classList.contains('to-scroller')) {
        var scrollerPosition = document.getElementById('scroller').getBoundingClientRect().top;
        $$$modules$AnimatedScroll$$animatedScrollTop(scrollerPosition, 300, 10);
      }
    });
  });

  var test$$selectors = {
    page: '.party-test',
    header: '.test-header',
    playground: '.test-playground',
    testName: '.test-name',
    achievements: '.test-achievements',
    results: '.test-results',
    authAttr: 'data-auth',
    finishedAttr: 'data-finished',
    resultStatusAttr: 'data-status',
    resultStatusNotAuth: 'auth',
    resultStatusNotList: 'list',
    resultStatusNotPoints: 'points',
    playgroundFinishedClass: 'finished',
    testLoadError: '.test-error'
  };

  var test$$getTestByIndex = function test$$getTestByIndex(index) {
    var test = $$$modules$testData$$default[index];
    return {
      id: test[0],
      name: test[1],
      index: index
    };
  };

  var test$$setTestData = function test$$setTestData(id, playground, dataUrl) {
    var testName = playground.querySelector(test$$selectors.testName);
    $.ajax({
      url: dataUrl,
      success: function success(data) {
        $$$modules$testData$$default = data[id];
        $$$modules$EqualTest$$default.setData($$$modules$testData$$default);
        playground.style.display = "block";
      },
      error: function error(err) {
        document.querySelector(test$$selectors.testLoadError).style.display = "block";
        playground.style.display = "none";
      }
    });
  };

  window.setPartyTest = function setTest(data, config) {
    var page = document.querySelector(test$$selectors.page);
    var header = document.querySelector(test$$selectors.header);
    var playground = page.querySelector(test$$selectors.playground);
    var achievements = page.querySelector(test$$selectors.achievements);
    var result = page.querySelector(test$$selectors.results);

    if (data.userID > 0) page.setAttribute(test$$selectors.authAttr, '');

    var currentTestIndex = data.current_test;

    if (currentTestIndex === -1) {
      page.setAttribute(test$$selectors.finishedAttr, '');

      var setNullResult = function setNullResult(status) {
        achievements.style.display = "none";
        result.setAttribute(test$$selectors.resultStatusAttr, status);
      };
      if (data.userID <= 0) {
        setNullResult(test$$selectors.resultStatusNotAuth);
      } else if (data.status == 0) {
        setNullResult(test$$selectors.resultStatusNotList);
      } else if (data.status === -1 || data.total_points === 0) {
        setNullResult(test$$selectors.resultStatusNotPoints);
      } else {
        $$$modules$AchievementsBlock$$default.setData({
          status: data.status,
          results: data.results,
          currentTestIndex: currentTestIndex,
          totalPoints: data.total_points
        });
      };
      return;
    }

    var currentTestData = test$$getTestByIndex(currentTestIndex);
    header.querySelector(test$$selectors.testName).innerHTML = currentTestData.name;
    playground.querySelector(test$$selectors.testName).innerHTML = currentTestData.name;

    $$$modules$AchievementsBlock$$default.setData({
      status: data.status,
      results: data.results,
      currentTestIndex: currentTestData.index,
      totalPoints: data.total_points
    });

    if (data.status === 0) {
      $$$modules$EqualTest$$default.onFirstClick = function () {
        config.onFirstClick(data.userID);
      };
    };

    $$$modules$EqualTest$$default.onSuccess = function (points) {
      playground.classList.add(test$$selectors.playgroundFinishedClass);
      $$$modules$AchievementsBlock$$default.updateCurrent(points);
      config.onFinishGame({
        userID: data.userID,
        testID: currentTestData.id,
        points: points
      });
    };

    if (data.results[currentTestData.id] && !data.results[currentTestData.id].passed) {
      playground.style.display = "block";
      test$$setTestData(currentTestData.id, playground, config.dataUrl);
    } else {}
  };
}).call(undefined);