var loadMoreProjects = (function () {

    var $loadProjectsButton = $('#loadMoreProjects');

    return {
        load: function () {
            console.log('Нажатие на кнопку');
            $.ajax({
                url: "../more-projects.html",
                cache: false,
                success: function (html) {
                    console.log('Данные получены!');
                    debugger;
                    $( ".portfolio" ).append( $(html))
                }

        });

        },

        subscribe: function () {
            $loadProjectsButton.on('click', this.load)
        }
    }

})();

loadMoreProjects.subscribe();
