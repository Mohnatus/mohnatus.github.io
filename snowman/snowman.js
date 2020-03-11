function Snowman(config) {
    this.$ = config.element;

    this.$places = config.places;
    this.$backgroundSet = config.backgroundSet;

    this.$inventory = config.inventory;

    this.items = config.items || {"head": [], "body": [], "hands": []};
    this.active = config.active || {"head": false, "body": false, "hands": false};

    console.log(this.items, this.active)

    this.day = config.day;

    this.onDressUp = config.onDressUp;

    this.bg;

    this.init();
}

Snowman.prototype.init = function() {
    this.fillInventory();
    this.dressSnowman();
}

Snowman.prototype.fillInventory = function() {
    var that = this;
    for (var place in this.items) {
        for (var i = 0; i < this.items[place].length; i++) {
            var type = this.items[place][i];
            this.$inventory
                .find("[data-type='" + type + "'][data-place='" + place + "']")
                .prop('active', true)
                .prop('inventory-type', type)
                .prop('inventory-place', place)
                .on('click', that.changeView.bind(that))
                .addClass('active');
        }  
    }

    for (var item in this.active) {
        this.$inventory.find("[data-type='" + this.active[item] + "'][data-place='" + item + "']").addClass('selected');
    }

    this.$inventory.find("[data-day=" + this.day + "]").addClass('current');
}

Snowman.prototype.dressSnowman = function() {
    for (var place in this.active) {
        var itemType = this.active[place];
        if (this.items[place].indexOf(itemType) == -1) itemType = 'nude';
        this.dressItem(place, itemType);
        this.setBackground(this.checkFullSet());
    }
}

Snowman.prototype.dressItem = function(place, type) {
    type = type || 'nude';
    this.$places[place].attr('data-type', type);
}

Snowman.prototype.changeView = function(e) {
    var item = $(e.target),
        type = item.prop('inventory-type'),
        place = item.prop('inventory-place');
    $(e.target).toggleClass('selected').siblings().removeClass('selected');

    if (this.items[place].indexOf(type) == -1) return;
    if (this.active[place] == type) type = false;
    this.active[place] = type;
    this.dressItem(place, type);
    this.setBackground(this.checkFullSet());
    this.onDressUp(this.active);
}

Snowman.prototype.checkFullSet = function() {
    var value = null;
    for (var place in this.active) {
        if (value == null) {
            value = this.active[place];
            continue;
        }
        if (this.active[place] == value)  continue;
        else return false; 
    }
    return value;
}

Snowman.prototype.setBackground = function(bg) {
    bg = bg || 'nude';
    if (bg == this.bg) return;
    this.bg = bg;
    this.$backgroundSet.attr('data-type', bg);
}


function Subscribe(config) {
    this.$ = config.form;
    this.$input = this.$.find('input');
    this.$button = this.$.find('button');
    this.mail;

    this.regexp = (/^[-._a-zA-Z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/);
    this.error = {
        text: config.errorText || 'Неправильно введен email',
        class: config.errorClass || 'error',
        status: false
    }
    this.onSubmit = config.onSubmit;
    this.init();
}

Subscribe.prototype.init = function() {
    var that = this;
    this.$button.click(function() {
        that.mail = that.$input.val();
        if (that.validate()) {
            that.hideError();
            that.$.removeClass('not-valid');
            that.onSubmit(that.mail);
        } else {
            that.$.addClass('not-valid');
            that.showError();
        }
    })
};

Subscribe.prototype.validate = function() {
    return this.regexp.test(this.mail);
};

Subscribe.prototype.showError = function() {
    if (!this.error.$) this.error.$ = this.createError();
    console.log(this.error.$)
    if (this.error.status) return;
    this.error.status = true;
    this.$.append(this.error.$);
}

Subscribe.prototype.createError = function() {
    return $(document.createElement('div')).addClass(this.error.class).text(this.error.text);
}

Subscribe.prototype.hideError = function() {
    if (!this.error.status) return;
    this.error.status = false;
    this.error.$.detach();
}

$(document).ready(function() {
    $('[data-scroll]').click(function(e) {
        var scrollTo = $($(this).attr('data-scroll')).offset().top;
        console.log(scrollTo)
        $("html, body").animate({scrollTop: scrollTo }, 500);
        return false;
    });
    $('.toggle-rules').click(function(e) {
        $('.rules').slideToggle(800);
        if ($(this).prop('state') == 'open') {
            $(this).prop('state', 'close').text('Полные правила');
        } else {
            $(this).prop('state', 'open').text('Скрыть');
        }
        return false;
    });


});

