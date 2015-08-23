var $window = $(window),
    $header = $(".header__container"),
    headerState = false,
    $slides = $('.slide');


$window.on('scroll', function () {

    var scrollTop = $window.scrollTop(),
        viewportHeight = $window.height(),
        changeHeader = viewportHeight- 77;

    Header.setHeaderState(scrollTop, changeHeader);
    Content.showSlideContentOnScroll(scrollTop, viewportHeight);
});


var Header = {

    /**
     * Make header slim on scroll
     * @param scrollTop
     * @param changeHeader
     */
    setHeaderState: function (scrollTop, changeHeader) {
        if (scrollTop >= changeHeader && !headerState) {
            $header.addClass("header__container_slim");
            headerState = true;

        } else if (scrollTop < changeHeader && headerState) {
            $header.removeClass("header__container_slim");
            headerState = false;
        }
    }
};

var Content = {

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

    }
};

$(function () {
    Content.showSlideContentOnScroll(0, 0);
});
