'use strict';

(function () {
  "use strict";

  var $$$modules$map$$default = function $$$modules$map$$default(selector) {
    var map = document.querySelector(selector);
    var close = map.querySelector(selector + '__close');

    var isClose = map.hasAttribute('data-close');

    var closeMap = function closeMap(event) {
      isClose = true;
      map.setAttribute('data-close', '');
    };

    var openMap = function openMap(event) {
      isClose = false;
      map.removeAttribute('data-close');
    };

    map.addEventListener('click', function (e) {
      e.stopPropagation();
      if (isClose) openMap();else closeMap();
    });
  };

  window.dataLayer = window.dataLayer || [];
  var $$$modules$ecommerce$$list = "Терри Пратчетт";

  var $$$modules$ecommerce$$default = {
    'buy': function buy(data) {
      
    },
    'link': function link(data) {

    }
  };

  var $$bookCard$$bookCard = {
    inited: false,

    $: null,
    link: null,
    img: null,
    title: null,
    author: null,
    publisherBlock: null,
    publisher: null,
    priceBlock: null,
    price: null,
    buttonBlock: null,
    rating: null,
    ratingCount: null,
    ratingVote: null,
    yearBlock: null,
    year: null,
    description: null
  };

  $$bookCard$$bookCard.selectors = {
    link: '.book-card__img',
    img: 'img',
    title: '.book-card__title',
    author: '.book-card__author',
    publisherBlock: '.book-card__publisher',
    publisher: '.publisher',
    priceBlock: '.book-card__price',
    price: '.price',
    buttonBlock: '.book-card__button',
    rating: '.book-rating',
    ratingCount: '.count',
    ratingVote: '.vote',
    yearBlock: '.book-card__year',
    year: '.year',
    description: '.book-card__annotation'
  };

  $$bookCard$$bookCard.init = function (config) {
    if (this.inited) return;

    this.$ = config.element;

    this.link = this.$.querySelector($$bookCard$$bookCard.selectors.link);
    this.img = this.link.querySelector($$bookCard$$bookCard.selectors.img);
    this.title = this.$.querySelector($$bookCard$$bookCard.selectors.title);
    this.author = this.$.querySelector($$bookCard$$bookCard.selectors.author);
    this.publisherBlock = this.$.querySelector($$bookCard$$bookCard.selectors.publisherBlock);
    this.publisher = this.publisherBlock.querySelector($$bookCard$$bookCard.selectors.publisher);
    this.priceBlock = this.$.querySelector($$bookCard$$bookCard.selectors.priceBlock);
    this.price = this.priceBlock.querySelector($$bookCard$$bookCard.selectors.price);
    this.buttonBlock = this.$.querySelector($$bookCard$$bookCard.selectors.buttonBlock);
    this.rating = this.$.querySelector($$bookCard$$bookCard.selectors.rating);
    this.ratingCount = this.rating.querySelector($$bookCard$$bookCard.selectors.ratingCount);
    this.ratingVote = this.rating.querySelector($$bookCard$$bookCard.selectors.ratingVote);
    this.ratingVote = this.rating.querySelector($$bookCard$$bookCard.selectors.ratingVote);
    this.yearBlock = this.$.querySelector($$bookCard$$bookCard.selectors.yearBlock);
    this.year = this.yearBlock.querySelector($$bookCard$$bookCard.selectors.year);
    this.description = this.$.querySelector($$bookCard$$bookCard.selectors.description);

    this.link.addEventListener('click', this.clickHandler.bind(this));
    this.title.addEventListener('click', this.clickHandler.bind(this));

    this.inited = true;
  };

  $$bookCard$$bookCard.clickHandler = function (e) {
    var _this = this;

    e.preventDefault();
    $$$modules$ecommerce$$default.link({
      id: this.$.getAttribute('data-element'),
      name: this.title.innerHTML,
      price: this.price.textContent,
      callback: function callback() {
        window.location.href = _this.link.href;
      }
    });
  };

  $$bookCard$$bookCard.setImage = function (img) {
    this.img.setAttribute('src', img);
  };

  $$bookCard$$bookCard.setLink = function (link) {
    this.link.setAttribute('href', link);
  };

  $$bookCard$$bookCard.setTitle = function (title) {
    this.title.textContent = title;
  };

  $$bookCard$$bookCard.setAuthor = function (author) {
    if (!author) this.author.style.display = "none";else {
      this.author.textContent = author;
      this.author.style.display = "block";
    }
  };

  $$bookCard$$bookCard.setRating = function (rating, votes) {
    rating = rating || 0;
    votes = votes || 0;
    this.ratingCount.textContent = rating;
    this.ratingVote.textContent = votes;
  };

  $$bookCard$$bookCard.setYear = function (year) {
    if (!year) {
      this.yearBlock.style.display = "none";
    } else {
      this.year.textContent = year;
      this.yearBlock.style.display = "inline";
    }
  };

  $$bookCard$$bookCard.setPublisher = function (publisher) {
    if (!publisher) {
      this.publisherBlock.style.display = "none";
    } else {
      this.publisher.textContent = publisher;
      this.publisherBlock.style.display = "inline";
    }
  };

  $$bookCard$$bookCard.setPrice = function (price) {
    this.price.textContent = price;
  };

  $$bookCard$$bookCard.setId = function (id) {
    this.$.setAttribute('data-element', id);
  };

  $$bookCard$$bookCard.setButton = function (data) {
    var _this2 = this;

    this.buttonBlock.innerHTML = data.button;
    var button = this.buttonBlock.querySelector('button');
    if (!button) return;
    button.addEventListener('click', function (e) {
      var status = button.getAttribute('data-status');
      if (status == 'buy') {
        var id = button.getAttribute('data-product');
        window.add2Basket(button, function () {
          data.button = _this2.buttonBlock.innerHTML;
          $$$modules$ecommerce$$default.buy({ id: data.id, name: data.title, price: data.price });
          
        });
      } else if (status == 'in-basket') {
        window.location.reload();
      }
    });
  };

  $$bookCard$$bookCard.setDescription = function (description) {
    this.description.innerHTML = description;
  };

  $$bookCard$$bookCard.setData = function (data) {
    this.setLink(data.link);
    this.setImage(data.img);
    this.setTitle(data.title);
    this.setAuthor(data.author);
    this.setRating(data.rating, data.votes);
    this.setYear(data.year);
    this.setPublisher(data.publisher);
    this.setPrice(data.price);
    this.setDescription(data.description);
    this.setId(data.id);
    this.setButton(data);
  };

  var $$bookCard$$default = $$bookCard$$bookCard;
  var $$simpleSlider$$slider = {
    inited: false,

    $: null,
    prev: null,
    next: null,
    $slidesContainer: null,

    slides: [],

    viewed: 5,

    center: null,
    leftDiff: null,
    leftLimit: null,

    currentSlide: null,
    currentSlideIndex: null,
    currentLeftIndex: null,

    activeAttr: 'data-active',
    slideAttr: 'data-slide',
    mainAttr: '',

    onChange: null,

    reset: false,
    hideNext: false,
    hidePrev: false
  };

  $$simpleSlider$$slider.selectors = {
    prev: '[data-prev]',
    next: '[data-next]',
    slides: '[data-slides]'
  };

  $$simpleSlider$$slider.init = function (config) {
    if (this.inited) return;

    this.$ = config.element;
    this.prev = this.$.querySelector($$simpleSlider$$slider.selectors.prev);
    this.next = this.$.querySelector($$simpleSlider$$slider.selectors.next);

    this.prev.addEventListener('click', this.toPrevSlide.bind(this));
    this.next.addEventListener('click', this.toNextSlide.bind(this));

    this.$slidesContainer = this.$.querySelector($$simpleSlider$$slider.selectors.slides);

    this.viewed = config.viewed || this.viewed;
    this.center = config.center;
    this.leftDiff = this.center - 1;

    this.mainAttr = config.attr;

    this.onChange = config.onChange;

    this.inited = true;
  };

  $$simpleSlider$$slider.update = function () {
    this.slides = [];
    var $slides = Array.prototype.slice.call(this.$slidesContainer.children);

    this.handleSlides($slides);

    if ($slides.length <= this.viewed) {
      if (!this.reset) this.resetSlider();
      return;
    }
    if (this.reset) this.setSlider();
    this.leftLimit = this.slides.length - this.viewed;
  };

  $$simpleSlider$$slider.handleSlides = function (slides) {
    var _this3 = this;

    slides.forEach(function (slide, index) {
      slide.setAttribute(_this3.slideAttr, index);
      slide.querySelector('[data-index]').setAttribute('data-index', index + 1);
      slide.addEventListener('click', function () {
        return _this3.handleClick(index);
      });
      var attr = slide.dataset;
      console.log(attr);
      _this3.slides.push({
        $: slide,
        index: index,
        data: attr
      });
    });
    this.leftLimit = this.slides.length - this.viewed;
  };

  $$simpleSlider$$slider.setActive = function (index, attr) {
    index = index || 0;
    if (this.currentSlide) {
      this.currentSlide.removeAttribute(this.activeAttr);
    }

    var slide = void 0;

    if (attr) {
      var $slide = this.$slidesContainer.querySelector('[data-' + attr + '="' + index + '"]');
      console.log($slide);
      slide = this.slides[$slide.getAttribute(this.slideAttr)].$;
    } else {
      slide = this.slides[index].$;
    }

    this.currentSlide = slide;
    this.currentSlideIndex = index;

    this.currentSlide.setAttribute(this.activeAttr, '');

    this.setCenterSlide();
    this.handleControls();
  };

  $$simpleSlider$$slider.handleControls = function () {
    if (this.currentSlideIndex == 0) this.hidePrevControl();else if (this.hidePrev) this.showPrevControl();

    if (this.currentSlideIndex == this.slides.length - 1) this.hideNextControl();else if (this.hideNext) this.showNextControl();
  };

  $$simpleSlider$$slider.setCenterSlide = function () {
    if (this.reset) {
      this.currentLeftIndex = 0;
      this.move(0);
      return;
    }
    var sliderLeft = this.$slidesContainer.getBoundingClientRect().left;

    var leftSlide = this.countLeftSlide(this.currentSlideIndex);
    this.currentLeftIndex = leftSlide.index;
    var diff = Math.floor(leftSlide.$.getBoundingClientRect().left - sliderLeft);

    this.move(diff);
  };

  $$simpleSlider$$slider.countLeftSlide = function (centerIndex) {
    if (!centerIndex || centerIndex < 0) centerIndex = 0;

    var leftSlideIndex = this.isCenter ? 0 : centerIndex;

    if (centerIndex > this.leftDiff) leftSlideIndex = centerIndex - this.leftDiff;
    if (leftSlideIndex > this.leftLimit) leftSlideIndex = this.leftLimit;

    var leftSlide = this.slides[leftSlideIndex];
    return leftSlide;
  };

  $$simpleSlider$$slider.move = function (diff) {
    this.$slidesContainer.style.left = -1 * diff + 'px';
  };

  $$simpleSlider$$slider.toPrevSlide = function () {
    var index = Math.max(this.currentSlideIndex - 1, 0);
    this.toSlide(index);
  };

  $$simpleSlider$$slider.toNextSlide = function () {
    var index = Math.min(this.currentSlideIndex + 1, this.slides.length - 1);
    this.toSlide(index);
  };

  $$simpleSlider$$slider.toSlide = function (index) {
    console.log(this.slides[index]);
    this.setActive(index);
    this.onChange(this.slides[index].data);
  };

  $$simpleSlider$$slider.handleClick = function (index) {
    this.toSlide(index);
  };

  $$simpleSlider$$slider.resetSlider = function () {
    this.$.setAttribute('data-no-slider', '');
    this.prev = this.$.removeChild(this.prev);
    this.next = this.$.removeChild(this.next);
    this.reset = true;
  };

  $$simpleSlider$$slider.hidePrevControl = function () {
    //this.prev.style.visibility = "hidden";
    this.prev.setAttribute('data-inactive', '');
    this.hidePrev = true;
  };

  $$simpleSlider$$slider.hideNextControl = function () {
    //this.next.style.visibility = "hidden";
    this.next.setAttribute('data-inactive', '');
    this.hideNext = true;
  };

  $$simpleSlider$$slider.showPrevControl = function () {
    //this.prev.style.visibility = "visible";
    this.prev.removeAttribute('data-inactive');
    this.hidePrev = false;
  };

  $$simpleSlider$$slider.showNextControl = function () {
    //this.next.style.visibility = "visible";
    this.next.removeAttribute('data-inactive');
    this.hideNext = false;
  };

  $$simpleSlider$$slider.setSlider = function () {
    this.$.removeAttribute('data-no-slider');
    this.$.insertBefore(this.prev, this.$.children[0]);
    this.$.insertBefore(this.next, null);
    this.reset = false;
  };

  $$simpleSlider$$slider.moveOn = function () {
    this.$.setAttribute('data-move', '');
  };

  $$simpleSlider$$slider.moveOff = function () {
    this.$.removeAttribute('data-move');
  };

  var $$simpleSlider$$default = $$simpleSlider$$slider;

  var $$$modules$card$$card = {
    $: null,
    close: null,
    controls: null,
    seria: null,

    bookCard: $$bookCard$$default,
    controlsSlider: $$simpleSlider$$default,
    sets: {},
    currentSet: null,

    tagText: '',

    showAttr: 'data-shown',
    controlClass: 'pratchett-control',
    controlBookAttr: 'view',
    controlVarAttr: 'var'
  };

  $$$modules$card$$card.init = function (config) {
    var _this4 = this;

    this.$ = config.element;
    this.close = this.$.querySelector('[data-close]');

    this.close.addEventListener('click', function () {
      return _this4.hideCard();
    });
    document.addEventListener('click', function (e) {
      if (_this4.isOpen && !_this4.$.contains(e.target)) {
        _this4.hideCard();
      }
    });

    this.$bookCard = this.$.querySelector(config.bookCard);
    this.bookCard.init({
      element: this.$bookCard
    });

    this.seria = this.$.querySelector(config.seria);
    this.tagText = config.tagText || this.tagText;

    var controls = this.$.querySelector(config.controls);

    this.controls = controls.querySelector('[data-slides]');
    this.controlsSlider.init({
      viewed: 4,
      center: 1,
      element: controls,
      onChange: function onChange(data) {
        return _this4.controlChange(data);
      },
      attr: this.controlBookAttr
    });
  };

  $$$modules$card$$card.update = function (data) {
    this.setSeria(data.cycleName);
    this.$.setAttribute('data-cycle', data.cycle);
    this.controlsSlider.moveOff();
    if (!this.sets[data.cycle]) {
      this.createSet(data.slides, data.cycle);
    }
    this.restoreSet(data.cycle);
    this.activateElement(data.cycle, data.index, 0);
    this.showCard();
    this.controlsSlider.moveOn();
  };

  $$$modules$card$$card.setSeria = function (seria) {
    if (seria) this.$.setAttribute('data-seria', seria);else this.$.removeAttribute('data-seria');
    this.seria.textContent = seria ? '\u0446\u0438\u043A\u043B\u0430 \xAB' + seria + '\xBB' : "Терри Пратчетта";
  };

  $$$modules$card$$card.createSet = function (data, setName) {
    var controlsData = this.createControls(data);

    this.sets[setName] = {
      items: data,
      $controls: controlsData.fragment,
      controls: controlsData.items
    };
  };

  $$$modules$card$$card.createControls = function (data) {
    var _this5 = this;

    var fr = document.createDocumentFragment();
    var items = [];

    console.log('controls', data);

    var _loop = function _loop(i, count) {
      var els = data[i];
      els.forEach(function (el, ind) {
        var control = _this5.createControl(el, i, ind);
        items.push(control);
        fr.appendChild(control);
      });
    };

    for (var i = 0, count = data.length; i < count; i++) {
      _loop(i, count);
    }

    return {
      fragment: fr,
      items: items
    };
  };

  $$$modules$card$$card.createControl = function (data, i, ind) {
    var el = document.createElement('div');
    el.classList.add(this.controlClass);
    el.setAttribute("data-" + this.controlBookAttr, i);
    el.setAttribute("data-" + this.controlVarAttr, ind);
    var img = document.createElement('div');
    img.classList.add(this.controlClass + '__img');
    img.innerHTML = '<img src=' + data.img + '><div class="tag" data-index data-cycle-bg>' + this.tagText + '</div>';
    var title = document.createElement('div');
    title.innerHTML = data.title;
    title.classList.add(this.controlClass + '__title');
    el.appendChild(img);
    el.appendChild(title);
    return el;
  };

  $$$modules$card$$card.restoreSet = function (setName) {
    this.currentSet = setName;
    var setData = this.sets[setName];
    var clone = setData.$controls.cloneNode(true);
    this.setControls(clone);
  };

  $$$modules$card$$card.setControls = function (html) {
    this.controls.innerHTML = "";
    this.controls.appendChild(html);
    this.controlsSlider.update();
  };

  $$$modules$card$$card.controlChange = function (data) {
    console.log('card', data);
    this.updateCard(this.currentSet, data[this.controlBookAttr], data[this.controlVarAttr]);
  };

  $$$modules$card$$card.activateElement = function (cycle, index, book) {
    this.updateCard(cycle, index, book);
    this.controlsSlider.setActive(index, this.controlAttr);
  };

  $$$modules$card$$card.updateCard = function (cycle, index, book) {
    console.log('update card', index, book);
    book = book || 0;
    var data = this.sets[cycle].items[index][book];
    this.bookCard.setData(data);
  };

  $$$modules$card$$card.showCard = function () {
    if (this.isOpen) return;
    this.$.setAttribute(this.showAttr, '');
    this.isOpen = true;
  };

  $$$modules$card$$card.hideCard = function () {
    if (!this.isOpen) return;
    this.$.removeAttribute(this.showAttr);
    this.isOpen = false;
  };

  var $$$modules$card$$default = $$$modules$card$$card;
  var $$$modules$cycles$$turtle = document.querySelector('.turtle');
  var $$$modules$cycles$$scheme = document.querySelector('.pratchett-scheme');
  var $$$modules$cycles$$data = {};
  var $$$modules$cycles$$errorCode = -1;

  var $$$modules$cycles$$currentLabel = void 0;

  var $$$modules$cycles$$showLabel = function $$$modules$cycles$$showLabel(cycle, index) {
    $$$modules$cycles$$hideLabel();
    if (!$$$modules$cycles$$data[cycle]) $$$modules$cycles$$data[cycle] = {};
    if (!$$$modules$cycles$$data[cycle][index]) {
      var element = $$$modules$cycles$$scheme.querySelector('.book[data-cycle="' + cycle + '"][data-index="' + index + '"]');
      $$$modules$cycles$$data[cycle][index] = element ? element.cloneNode(true) : $$$modules$cycles$$errorCode;
    }
    if ($$$modules$cycles$$data[cycle][index] == $$$modules$cycles$$errorCode) return;
    $$$modules$cycles$$currentLabel = $$$modules$cycles$$data[cycle][index];
    $$$modules$cycles$$turtle.appendChild($$$modules$cycles$$currentLabel);
  };

  var $$$modules$cycles$$hideLabel = function $$$modules$cycles$$hideLabel() {
    if (!$$$modules$cycles$$currentLabel) return;
    $$$modules$cycles$$turtle.removeChild($$$modules$cycles$$currentLabel);
    $$$modules$cycles$$currentLabel = null;
  };

  var $$$modules$cycles$$default = {
    show: $$$modules$cycles$$showLabel,
    hide: $$$modules$cycles$$hideLabel
  };

  var $$$modules$smoothScroll$$speedRatio = {
    'slow': 20,
    'normal': 50,
    'fast': 100
  };

  var $$$modules$smoothScroll$$stepDiff = 10;

  function $$$modules$smoothScroll$$currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop) return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
  }

  function $$$modules$smoothScroll$$elmYPosition(eID) {
    var elm = document.getElementById(eID);
    var y = elm.offsetTop;
    var node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
      node = node.offsetParent;
      y += node.offsetTop;
    }return y;
  }

  function $$$modules$smoothScroll$$smoothScroll(eID, ratio) {
    var startY = $$$modules$smoothScroll$$currentYPosition();
    var stopY = $$$modules$smoothScroll$$elmYPosition(eID);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
      scrollTo(0, stopY);return;
    }
    ratio = ratio || 'normal';
    var ratioVal = $$$modules$smoothScroll$$speedRatio[ratio] || 20;
    var speed = Math.round(distance / ratioVal);
    var step = Math.round(distance / $$$modules$smoothScroll$$stepDiff);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
      for (var i = startY; i < stopY; i += step) {
        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);

        leapY += step;
        if (leapY > stopY) leapY = stopY;timer++;
      }return;
    }
    for (var i = startY; i > stopY; i -= step) {
      setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
      leapY -= step;
      if (leapY < stopY) leapY = stopY;timer++;
    }
  }
  var $$$modules$smoothScroll$$default = $$$modules$smoothScroll$$smoothScroll;

  var script$$data = window.pratchettData;

  window.add2Basket = function add2Basket(btn, callback) {
    btn.setAttribute('data-status', 'in-basket');
    btn.textContent = 'В корзине';
    callback ? callback() : null;
  };

  window.addEventListener('DOMContentLoaded', function () {
    $$$modules$map$$default('.pratchett-map');
    var turtle = document.querySelector('.turtle');
    var flags = turtle.querySelectorAll('.flag');
    var cycleItems = Array.prototype.slice.call(document.querySelectorAll('[data-cycle-item]'), this);

    /* Label */
    window.label = $$$modules$cycles$$default;

    for (var i = 0, len = flags.length; i < len; i++) {
      flags[i].addEventListener('mouseenter', function (e) {
        var cycle = this.dataset.cycle;
        var index = this.dataset.index;
        $$$modules$cycles$$default.show(cycle, index);
      });
      flags[i].addEventListener('mouseleave', function (e) {
        $$$modules$cycles$$default.hide();
      });
    }
    /* end Label */

    /* Book card */
    $$$modules$card$$default.init({
      element: document.querySelector('.pratchett-card'),
      bookCard: '.book-card',
      controls: '[data-slider="pratchett"]',
      seria: '.seria',
      tagText: ''
    });

    cycleItems.forEach(function (item, ind) {
      item.addEventListener('click', function (e) {
        e.stopPropagation();
        var el = item;
        var cycle = el.dataset.cycle;
        var index = el.dataset.index - 1;
        var slides = script$$data[cycle].items;
        var cycleName = script$$data[cycle].name;
        $$$modules$card$$default.update({
          slides: slides,
          cycle: cycle,
          cycleName: cycleName,
          index: index
        });
      });
    });
    /* end Book card */

    /* Compass scroll */
    var compass = document.querySelector('.compass');
    var schemeID = 'scheme-scroll';
    compass.addEventListener('click', function () {
      $$$modules$smoothScroll$$default(schemeID, 'slow');
    });
    /* end Compass scroll */
  });
}).call(undefined);