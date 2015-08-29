var $tab = $('.tab__item');
var $items = $('.portfolio__item');
var $showItems = $items;
var $loadProjectsButton = $('#loadMoreProjects');
var n = 0;

var filter = (function () {
    return {
        /**
         * Фильтрует объекты
         */
        run: function () {
            var $this = $(this),
                id = $this.attr('id').split('-'),
                dataValue = id.pop(),
                dataType = id.join('-');
            n = 0;

            if (dataValue == 'all') {
                $showItems = $items;
            } else {
                $showItems = $items.filter('[data-' + dataType + '="' + dataValue + '"]');
            }

            filter.addActiveClass($this);
            projects.showMoreProjects($showItems);
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


var projects = (function () {

    return {
        showMoreProjects: function (a) {
            n += 4;

            $items.css('display', 'none');
            a.slice(0, n).css('display', 'inline-block');
            //$itemsToShow.slice(4);
            console.log('n', n);
            console.log('$items.length', $items.length);
            console.log('$showItems.length', a.length);


            if (a.length <= n) {
                projects.hideButton();
            } else {
                projects.showButton();
            }

        },
        hideButton: function () {
            $loadProjectsButton.hide();
        },
        showButton: function () {
            $loadProjectsButton.show();
        },

        subscribe: function () {
            $loadProjectsButton.on('click', function () {
                projects.showMoreProjects($showItems)
            });
        }
    }

})();

projects.subscribe();
projects.showMoreProjects($items);
