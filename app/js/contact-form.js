//Форма обратной связи

var form = (function () {

    var $form = $('#massage-form'),
        $sucsessMessage = $form.find('.form__sucsess-message');


    return {
        send: function (e) {
            e.preventDefault();
            //var form_data = $form.serialize(); //собераем все данные из формы

            $.ajax({
                type: "POST", //Метод отправки
                url: "php/send.php", //путь до php фаила отправителя
                data: $form.serialize(), //собераем все данные из формы
                success: this.success
            });
        },
        success: function () {
            $sucsessMessage.slideDown('slow'); //Показываем сообщение об успешной отправке письма
            $form.find(':input').val(''); //Очищаем инпуты
            setTimeout(function () {
                $sucsessMessage.slideUp('slow');
            }, 4000); // Через 4 секунды скрваем сообщение об успешной отправке письма
        },
        subscribe: function () {
            $form.on('submit', this.send.bind(this))
        }
    }
})();

$(function () {
    form.subscribe();
});
