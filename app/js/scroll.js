var $window = $(window),
    $header = $('.header__container'),
    $slides = $('.slide'),
    headerHeight = 77,
    $menuLinks = $('.menu__link');

/**
 * Here is all what's happens on scroll
 * @type {{init, setHeaderState, showSlideContentOnScroll, changeActiveMenuItemOnScroll, subscribe}}
 */

var scroll = (function () {
    var isHeaderStateSlim = false,
        $activeSlide = $slides.filter('#home');


    return {
        init: function () {
            var scrollTop = $window.scrollTop(),
                viewportHeight = $window.height(),
                changeHeader = viewportHeight - headerHeight;

            scroll.setHeaderState(scrollTop, changeHeader);
            scroll.showSlideContentOnScroll(scrollTop, viewportHeight);
            scroll.changeActiveMenuItemOnScroll(scrollTop);
        },

        /**
         * Make header slim on scroll
         * @param scrollTop
         * @param changeHeader
         */
        setHeaderState: function (scrollTop, changeHeader) {
            if (scrollTop >= changeHeader && !isHeaderStateSlim) {
                $header.addClass('header__container_slim');
                isHeaderStateSlim = true;

            } else if (scrollTop < changeHeader && isHeaderStateSlim) {
                $header.removeClass('header__container_slim');
                isHeaderStateSlim = false;
            }
        },

        /**
         * Show content inside slide on scroll
         * @param scrollTop
         * @param viewportHeight
         */
        showSlideContentOnScroll: function (scrollTop, viewportHeight) {
            $slides.each(function () {

                if (scrollTop >= ($(this).offset().top - viewportHeight / 2) && !$(this).hasClass('show')) {
                    $(this).addClass('show');
                }
            });

        },

        /**
         * On page scroll change active nav-item in header
         * @param scrollTop
         */
        changeActiveMenuItemOnScroll: function (scrollTop) {
            var $currentSlide; //Save current slide

            /**
             * Check if current slide not actual any more
             */
            $slides.each(function () {
                var $slide = $(this);

                if (scrollTop >= ($slide.offset().top - headerHeight)) {
                    $currentSlide = $slide; //Save new current slide
                } else {
                    return false;
                }
            });

            /**
             * Get id of current slide and if we have nav-item with the same value of href-attribute, make it active
             */
            if ($currentSlide && $currentSlide.get(0) !== $activeSlide.get(0)) {
                var menuId = $currentSlide.attr('id'),
                    $menuLink = $menuLinks.filter('[href = #' + menuId + ']');

                if ($menuLink.length) {
                    $activeSlide = $currentSlide; //Save new active slide
                    navigation.changeActiveClass($menuLink);
                }
            }
        },

        subscribe: function () {
            $window.on('scroll', this.init);
        }
    }
})();


scroll.subscribe();

/**
 * On load document show content of first slide
 */
$(function () {
    scroll.showSlideContentOnScroll(0, 0);
});

/**
 * All what happens in nav-bar
 * @type {{scroll, changeActiveClass, subscribe}}
 */
var navigation = (function () {

    return {
        /**
         * Animate scroll to slide, which was selected in nav-bar
         * @param e
         */
        scroll: function (e) {

            e.preventDefault();

            var $menuLink = $(this),
                menuId = $menuLink.attr('href'),
                $slide = $slides.filter(menuId);

            $('body').animate({
                scrollTop: $slide.offset().top
            }, 1000);
            navigation.changeActiveClass($menuLink);
        },


        /**
         * Add active class to actual nav-item, remove from all others
         * @param $menuLink
         */
        changeActiveClass: function ($menuLink) {
            $('.menu__link_active').removeClass('menu__link_active');
            $menuLink.addClass('menu__link_active');

        },
        subscribe: function () {
            $menuLinks.on('click', this.scroll);
        }
    }
})();


navigation.subscribe();
