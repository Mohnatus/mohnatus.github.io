'use strict';

(function () {
  "use strict";

  function $$$modules$closeIcon$$closeIcon(prevent) {
    var icons = Array.prototype.slice.call(document.querySelectorAll('[data-close]'));

    icons.forEach(function (icon) {
      var parentSelector = icon.getAttribute('data-close');
      var parent = document.querySelector(parentSelector);
      icon.addEventListener("click", function () {
        parent.setAttribute('data-hidden', '');
        var count = parseInt(document.body.getAttribute('data-popup-open')) || 1;
        document.body.setAttribute('data-popup-open', --count);
      });
    });
  }
  var $$$modules$closeIcon$$default = $$$modules$closeIcon$$closeIcon;
  function $$$modules$xInput$$xInput(input) {
    var _this = this;

    this.$ = input;
    this.input = this.$.querySelector('input, textarea');
    this.label = this.$.querySelector('label');

    this.input.addEventListener('input', function () {
      _this.onInput ? _this.onInput(_this.input.value) : null;
    });

    this.input.addEventListener('focus', function () {
      _this.$.setAttribute('data-focus', '');
      _this.onFocus ? _this.onFocus() : null;
    });

    this.input.addEventListener('blur', function () {
      if (!_this.input.value) _this.$.removeAttribute('data-focus');
      _this.onBlur ? _this.onBlur() : null;
    });
  }

  $$$modules$xInput$$xInput.init = function () {
    Array.prototype.slice.call(document.querySelectorAll('.x-input')).forEach(function (el) {
      new $$$modules$xInput$$xInput(el);
    });
  };

  var $$$modules$xInput$$default = $$$modules$xInput$$xInput;
  function $$$modules$validator$$validator(data) {
    var _this2 = this;

    this.form = data.form;
    var fields = Array.prototype.slice.call(this.form.querySelectorAll(data.fields));
    this.rules = data.rules || {};
    this.passed = {};
    this.errors = {};
    this.fields = [];
    this.onSubmit = data.onSubmit;
    this.onReady = data.onReady;
    this.onUnready = data.onUnready;

    this.ready = false;

    data.trigger.addEventListener('click', this.validate.bind(this));

    fields.forEach(function (field) {
      var type = field.getAttribute('data-validate') || 'text';
      var inputs = Array.prototype.slice.call(field.querySelectorAll('input, textarea'));
      var name = inputs[0].getAttribute('name');
      var error = field.querySelector('.message');

      var fieldObj = {
        $: field,
        name: name,
        type: type,
        inputs: inputs,
        validated: false,
        valid: false,
        error: error
      };

      inputs.forEach(function (input) {
        if (input.type == "radio" || input.type == "checkbox") {
          input.addEventListener("change", function () {
            //if (!fieldObj.validated) return;
            _this2.validateField(fieldObj);
          });
        } else {
          input.addEventListener("input", function () {
            //if (!fieldObj.validated) return;
            _this2.validateField(fieldObj);
          });
        }
      });

      _this2.fields.push(fieldObj);
      _this2.passed[name] = false;
    });

    this.validated = false;
  }

  $$$modules$validator$$validator.messages = {
    required: function required() {
      return "Поле обязательно для заполнения";
    },
    minLength: function minLength(len) {
      return "Минимальная длина - " + len + " символов";
    },
    maxLength: function maxLength(len) {
      return "Максимальная длина - " + len + " символов";
    },
    length: function length(len) {
      return "Длина - " + len + " символов";
    },
    default: function _default(len) {
      return "Неправильно заполнено поле";
    }
  };

  $$$modules$validator$$validator.prototype.validate = function () {
    var _this3 = this;

    this.errors = {};
    var counter = 0;
    this.fields.forEach(function (field) {
      var result = _this3.validateField(field);
      if (result.error) {
        _this3.errors[field.name] = result.error;
        counter++;
      }
    });
    this.validated = true;
    if (!counter) this.onSubmit ? this.onSubmit() : null;
  };

  $$$modules$validator$$validator.prototype.checkAllFields = function () {
    for (var name in this.passed) {
      if (!this.passed[name]) {
        this.unreadyHandler();
        return;
      }
    }
    this.readyHandler();
  };

  $$$modules$validator$$validator.prototype.validateField = function (field) {
    var rules = this.rules[field.name];

    var result = {};

    for (var rule in rules) {
      var ruleData = rules[rule];
      if (!ruleData.value) continue;
      var value = void 0;

      switch (rule) {
        case "required":
          value = this.checkRequired(field);
          break;
        case "custom":
          value = ruleData.value(field);
          break;
      }

      if (!value) {
        result.error = ruleData.message || $$$modules$validator$$validator.messages[rule](ruleData.value) || $$$modules$validator$$validator.messages.default();
        break;
      }
    }

    field.validated = true;
    field.valid = !result.error;

    result.error ? this.setInvalid(field, result.error) : this.setValid(field);

    this.passed[field.name] = field.valid;
    this.checkAllFields();

    return result;
  };

  $$$modules$validator$$validator.prototype.checkRequired = function (field) {
    switch (field.type) {
      case "text":
        return !!field.inputs[0].value;
      case "radio":
      case "checkbox":
        return field.inputs.some(function (input) {
          return input.checked;
        });
    }
    return false;
  };

  $$$modules$validator$$validator.prototype.setInvalid = function (field, msg) {
    field.$.removeAttribute('data-valid');
    field.$.setAttribute('data-invalid', '');
    field.error.innerHTML = msg;
  };

  $$$modules$validator$$validator.prototype.setValid = function (field) {
    field.$.removeAttribute('data-invalid');
    field.$.setAttribute('data-valid', '');
    field.error.innerHTML = "";
  };

  $$$modules$validator$$validator.prototype.readyHandler = function () {
    if (!this.ready) {
      this.form.setAttribute('data-ready', '');
      this.ready = true;
      this.onReady ? this.onReady() : null;
    }
  };

  $$$modules$validator$$validator.prototype.unreadyHandler = function () {
    if (this.ready) {
      this.form.removeAttribute('data-ready');
      this.ready = false;
      this.onUnready ? this.onUnready() : null;
    }
  };

  var $$$modules$validator$$default = $$$modules$validator$$validator;

  $(document).ready(function () {

    autosize($('textarea'));

    $$$modules$closeIcon$$default();

    $$$modules$xInput$$default.init();

    var $agentForm = document.querySelector('.agent-form');

    var submitForm = function submitForm() {
      var formData = new FormData($agentForm);
      console.log(formData.getAll('agent-parent'));
      console.log(formData.getAll('agent-child'));
      console.log(formData.getAll('agent-age'));
      console.log(formData.getAll('agent-book'));

      // $.ajax({
      //   url: 'https://www.chitai-gorod.ru',
      //   data: formData,
      //   success: function(data) {
      //     console.log(data);
      //   },
      //   error: function(err) {
      //     console.log('error');
      //   }
      // })

      $('.agents-join .container').addClass('info').html("<div class='info-message'><h2>Ваша заявка принята!</h2>Пост отправлен на модерацию: мы должны убедиться, что он соответствует правилам конкурса.<br>Такая проверка занимает <b>1 рабочий день</b>, по окончании модерации вы получите письмо.</div>");
    };

    var agentForm = new $$$modules$validator$$default({
      form: $agentForm,
      fields: '[data-validate]',
      rules: {
        'agent-parent': { required: { value: true } },
        'agent-child': { required: { value: true } },
        'agent-book': { required: { value: true } },
        'agent-age': { required: { value: true } },
        'agent-post': { required: { value: true } },
        'agent-confirm': { required: { value: true } }
      },
      trigger: document.querySelector('.agent-form__send'),
      onSubmit: submitForm,
      onReady: function onReady() {
        $('.agents-join').attr('data-ready', '');
      },
      onUnready: function onUnready() {
        $('.agents-join').removeAttr('data-ready');
      }
    });

    $('[data-action="take-part"]').on('click', function () {
      var popups = parseInt($('body').attr('data-popup-open', '')) || 0;
      $('body').attr('data-popup-open', ++popups);
      $('.chg-agents__join').removeAttr('data-hidden');
    });
  });
}).call(undefined);