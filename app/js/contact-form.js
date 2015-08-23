//Форма обратной связи
//var $form = $('#massage-form'),
//    $sucsessMessage = $form.find('.form__sucsess-message');
//
//
//$form.on('submit', function (e) {
//    e.preventDefault();
//    var form_data = $(this).serialize(); //собераем все данные из формы
//
//    $.ajax({
//        type: "POST", //Метод отправки
//        url: "php/send.php", //путь до php фаила отправителя
//        data: form_data,
//        success: function () {
//            $sucsessMessage.slideDown('slow'); //Показываем сообщение об успешной отправке письма
//            $form.find(':input').val(''); //Очищаем инпуты
//            setTimeout(function () {
//                $sucsessMessage.slideUp('slow');
//            }, 4000); // Через 4 секунды скрваем сообщение об успешной отправке письма
//        }
//    });
//});


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

form.subscribe();

//
//var form = {
//    formId: '#massage-form',
//    successMessageClass: '.form__sucsess-message',
//
//    init: function () {
//        this.$form = $(this.formId);
//        this.$successMessage = $(this.successMessageClass);
//    },
//    send: function () {
//        e.preventDefault();
//        var form_data = this.serialize(); //собераем все данные из формы
//
//        $.ajax({
//            type: "POST", //Метод отправки
//            url: "php/send.php", //путь до php фаила отправителя
//            data: form_data,
//            success: form.success
//        })
//    },
//
//    success: function () {
//        this.$sucsessMessage.slideDown('slow'); //Показываем сообщение об успешной отправке письма
//        $form.find(':input').val(''); //Очищаем инпуты
//        setTimeout(function () {
//            $sucsessMessage.slideUp('slow');
//        }, 4000); // Через 4 секунды скрваем сообщение об успешной отправке письма
//    },
//
//    eventListner: function () {
//        this.$form.on('submit', this.send)
//    }
//};
//
//form.init();
