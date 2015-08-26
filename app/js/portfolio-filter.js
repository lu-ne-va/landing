var filter = (function () {
    var $tab = $('.tab__item'),
        $items = $('.portfolio__item');

    return {
        /**
         * Фильтрует объекты
         */
        run: function () {
            var $this = $(this),
                id = $this.attr('id').split('-'),
                dataValue = id.pop(),
                dataType = id.join('-');

            if (dataValue == 'all') {
                $items.show(0);

                filter.addActiveClass($this);


            } else {
                var $showItems = $items.filter('[data-' + dataType + '="' + dataValue + '"]');

                $showItems.show(0);
                $items.not($showItems).hide(0);

                filter.addActiveClass($this);
            }
        },

        /**
         * Добавляет табу активный класс
         * @param $tab
         */
        addActiveClass: function ($tab) {
            $tab.addClass('active').siblings().removeClass('active');
        },

        /**
         * Подписчик на события
         */
        subscribe: function () {
            $tab.on('click', this.run)
        }
    }

})();

filter.subscribe();