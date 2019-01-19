let xslide = (function() {
    var updatePeriod = 5; // update period - 5ms
    var defaultSpeed = 400; // default animation speed - 400ms

    var getHeight = function(el) {
        var height = el.offsetHeight;
        if (!height) {
        el.style.visibility = 'hidden';
        el.style.position = 'absolute';
        el.style.display = 'block';
        height = el.offsetHeight;
        el.style.display = '';
        el.style.position = '';
        el.style.visibility = '';
        }
        return height;
    };

    var getDiff = function(height, time) {
        time = time || defaultSpeed;
        return height / time * updatePeriod;
    };

    // queue foo has finished
    var free = function(el) {
        el.queue.splice(0, 1);
        next(el);
    };

    // next queue foo start
    var next = function(el) {
        if (el.queue.length) {
        var isFree = false;
        el.queue[0]();
        }
    };

    // add foo to queue
    var add = function(foo, el, ms, callback) {
        el.queue.push(function() {
            foo(el, ms, callback);
        });
        if (el.queue.length == 1) next(el);
    };

    var slideDown = function slideDown(el, ms, callback) {
        
        var height = getHeight(el);

        el.style.height = 0;
        var overflow = el.style.overflow;
        el.style.overflow = 'hidden';    
        el.style.display = 'block';    

        var diff = getDiff(height, ms);

        var counter = 0;

        var timer = setInterval(function() {
        var currentHeight = ++counter * diff;
        el.style.height = currentHeight + 'px';

        if (currentHeight >= height) {
            clearInterval(timer);
            el.style.height = '';
            el.style.overflow = '';
            callback ? callback(el) : null;
            el.removeAttribute('data-slide-closed');
            free(el);
        }
        }, updatePeriod);

        return el;
    };

    var slideUp = function slideUp(el, ms, callback) {
        el.setAttribute('data-slide-closed', true);
        var height = getHeight(el);

        var style = getComputedStyle(el);
        var paddingTop = parseFloat(style.paddingTop) || 0;
        var paddingBottom = parseFloat(style.paddingBottom) || 0;

        el.style.overflow = 'hidden';
        el.style.height = height;
        el.style.minHeight = '';
        
        var diff = getDiff(height, ms);
        var paddingTopDiff = getDiff(paddingTop, ms);
        var paddingBottomDiff = getDiff(paddingBottom, ms);

        var counter = 0;

        var timer = setInterval(function() {
        var currentHeight = height - counter * diff;
        el.style.height = currentHeight + 'px';
        el.style.paddingTop = paddingTop - counter * paddingTopDiff + 'px';
        
        el.style.paddingBottom = paddingBottom - counter * paddingBottomDiff + 'px';
        
        counter++;

        if (currentHeight <= 0) {
            clearInterval(timer);
            
            el.style.display = 'none';
            el.style.height = '';
            el.style.overflow = '';
            el.style.paddingTop = '';
            el.style.paddingBottom = '';
            callback ? callback(el) : null;
            free(el);
        }

        }, updatePeriod)
        return el;
    };

    var wrap = function(el) {
        el.queue = [];
        el.slideDown = function(ms, callback) {
            add(slideDown, el, ms, callback);
            return el;
        };
        el.slideUp = function(ms, callback) {
            add(slideUp, el, ms, callback);
            return el;
        };
        
        return el;
    };

    var togglers = Array.prototype.slice.call(document.querySelectorAll('[data-slide-toggler]'));
    togglers.forEach(function(toggler) {
        var targetSelector = toggler.getAttribute('data-slide-toggler');
        var targets = Array.prototype.slice.call(document.querySelectorAll(targetSelector));
        targets = targets.map(function(target) {
            return wrap(target);
        });
        var toggleAction = toggler.getAttribute('data-slide-action') || 'click';
        toggler.addEventListener(toggleAction, function() {
            if (toggler.hasAttribute('data-slide-opened')) {
                toggler.removeAttribute('data-slide-opened');
                targets.forEach(function(target) {
                    target.slideUp();
                })
            } else {
                toggler.setAttribute('data-slide-opened', true);
                targets.forEach(function(target) {
                    target.slideDown();
                })
            }
        })
    });
    

    return wrap;
})();