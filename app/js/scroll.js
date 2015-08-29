var $window = $(window),
    $header = $('.header__container'),
    $slides = $('.slide'),
    headerHeight = 77,
    $menuLinks = $('.menu__link');

var scroll = (function () {
    var headerState = false,
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
            if (scrollTop >= changeHeader && !headerState) {
                $header.addClass('header__container_slim');
                headerState = true;

            } else if (scrollTop < changeHeader && headerState) {
                $header.removeClass('header__container_slim');
                headerState = false;
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

        changeActiveMenuItemOnScroll: function (scrollTop) {
            var $currentSlide;
            $slides.each(function () {
                var $slide = $(this);

                if ( scrollTop >= ($slide.offset().top - headerHeight)) {
                    $currentSlide = $slide;
                } else {
                    return false;
                }
            });


            if ($currentSlide && $currentSlide.get(0) !== $activeSlide.get(0)) {
                var menuId = $currentSlide.attr('id'),
                    $menuLink = $menuLinks.filter('[href = #' + menuId + ']');

                if ($menuLink.length) {
                    $activeSlide = $currentSlide;
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

$(function () {
    scroll.showSlideContentOnScroll(0, 0);
});


var navigation = (function () {

    return {
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
