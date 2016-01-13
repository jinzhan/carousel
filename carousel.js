/*
 * @file:carousel.js
 * @description: 基于jquery的水平轮播轮播，支持百分比自适应宽度
 * @author: steinitz@qq.com
 * @date: 15-12-29 下午5:46
 * @param {String} el  HTML Selector
 * @param {Object} option
 *        {Number}  option.width 每一屏幕的宽度
 *        {String}  option.unit 宽度单位
 *        {Number}  option.animationSpeed 动画速度
 *        {Number}  option.duration 动画播放间隔时间
 *        {Boolean} option.autoPlay 是否自动播放
 * */
// var $ = require(jQuery);

var Carousel = function(el, option){
    this.$el = $(el);
    this.$body = $(el).children('.carousel-wrapper');
    this.$nav = $(el).children('.carousel-nav');
    this.size = $(el).find('.item').length;
    this.currentIndex = 0;
    this.option = $.extend({
        width: 100,
        unit: '%',
        animationSpeed: 500,
        duration: 3000,
        autoPlay: 1
    }, option);
    this.init();
};

Carousel.prototype = {
    init: function () {
        this.bind();
        this.option.autoPlay && this.autoPlay();
    },
    bind: function () {
        // 绑定箭头事件
        this.$el.on('click', '.arr-left', $.proxy(this.move, this, 'prev'))
            .on('click', '.arr-right', $.proxy(this.move, this, 'next'));

        // 绑定小点点事件
        var me = this;
        this.$nav.on('click', 'span', function () {
            if ($(this).hasClass('current')) {
                return;
            }
            var index = $(this).index();
            var currentIndex = me.currentIndex;
            me.animate(index > currentIndex ? 'next' : 'prev', index);
        });
    },
    next: function () {
        this.currentIndex = this.currentIndex < this.size - 1 ? this.currentIndex + 1 : 0;
    },

    prev: function () {
        this.currentIndex = !this.currentIndex ? this.size - 1 : this.currentIndex - 1;
    },

    move: function (type) {
        if (this.animatingFlag) {
            return;
        }
        this[type === 'next' ? 'next' : 'prev']();
        this.animate(type);
    },

    autoPlay: function () {
        this.timer = setTimeout($.proxy(this.move, this, 'next'), this.option.duration);
    },

    animate: function (type, currentIndex) {
        if (this.animatingFlag) {
            return;
        }

        if (currentIndex !== undefined) {
            this.currentIndex = currentIndex;
        }

        var me = this;
        var autoPlay = this.option.autoPlay;
        me.animatingFlag = 1;
        autoPlay && clearTimeout(this.timer);
        
        this.$nav.children('span').eq(this.currentIndex).addClass('current').siblings().removeClass('current');

        if (type === 'next' && !this.currentIndex) {
            // 顺序切换到第1张
            this.$body.children('.item').eq(0).css('left', '100%');
            this.$body.animate({
                left: -this.size * this.option.width + this.option.unit
            }, {
                duration: this.animationSpeed,
                complete: function () {
                    $(this).css('left', 0).children('.item').eq(0).css('left', 0);
                    me.animatingFlag = 0;
                    autoPlay && me.autoPlay();
                }
            });
        } else if (type === 'prev' && !~(this.currentIndex - this.size)) {
            // 倒序切换到最后1张
            var currentIndex = this.currentIndex;
            this.$body.children('.item').eq(currentIndex).css('left', '-100%');
            this.$body.animate({
                left: this.option.width + this.option.unit
            }, {
                duration: this.animationSpeed,
                complete: function () {
                    $(this).css('left', -currentIndex * me.option.width + me.option.unit).children('.item').eq(currentIndex).css('left', 0);
                    me.animatingFlag = 0;
                    autoPlay && me.autoPlay();
                }
            });
        } else {
            this.$body.animate({
                left: -this.currentIndex * this.option.width + this.option.unit
            }, {
                duration: this.animationSpeed,
                complete: function () {
                    me.animatingFlag = 0;
                    autoPlay && me.autoPlay();
                }
            });
        }
    }
};

module.exports = Carousel;