var filter = (function () {
    var $tab = $('.tab__item'),
        $items = $('.portfolio__item');

    return {
        run: function () {
            var id = $(this).attr('id').split('-');
            var dataValue = id.pop();
            var dataType = id.join('-');

            if (dataValue == 'all') {
                $items.show(0);

            } else {
                var $showItems = $items.filter('[data-' + dataType + '="'+dataValue+'"]');
                $showItems.show(0);
                $items.not($showItems).hide(0);
            }
        },

        subscribe: function () {
            $tab.on('click', this.run)
        }
    }

})();

filter.subscribe();