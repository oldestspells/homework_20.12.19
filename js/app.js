'use strict';

// условие - пустой ли LocalStorage
function forLocalStorage(data, value) {
    if (localStorage.getItem(data) === null) {
        localStorage.setItem(data, JSON.stringify(value))
    }
    return JSON.parse(localStorage.getItem(data));
}


let users = [];

//обращение с файлу с логинами
let promise = fetch("data.json")
    .then((response) => {
        return response.json()
    }).then((response) => {
        users = response;
    });

//конструктор юзера
function userConstr (login, pass){
    this.login = name;
    this.pass = pass;
}

loginBtnLisener();

//обработчки для кнопки логин
function loginBtnLisener(){
    $(".login").click(function () {
        if ($(".modal-singup").hasClass("hide")) {
            $(".modal-singup").removeClass('hide').fadeIn(1000);
        } else {
            $('.form-inline')
                .html('<label for="login-input">Login: </label>' +
                    '<input type="text" id="login-input" placeholder="login">' +
                    '<label for="pass-input">Password: </label>' +
                    '<input type="password" id="pass-input" placeholder="passworld">' +
                    '<input type="button" id="submitBtn" value="sing in">' +
                    '<a class="registration">Registration</a>');
        }
        singInBtnLisener();
        registrationBtnLisener();
    });
}


//обработчик для кнопки регристации (добаляет новых юзеров в локал сторедж)
function registrationBtnLisener(){
    $('.registration').click(function () {
        $('.form-inline').html('<label for="login-input-reg">Registration Username:</label>' +
            '<input type="text" id="login-input-reg" placeholder="username">' +
            '<label for="pass-input-reg">Password: </label>' +
            '<input type="password" id="pass-input-reg" placeholder="passwor">' +
            '<input type="button" id="submitBtnReg" value="registration">');
        // '<a class="login">  return</a>');
        $('#submitBtnReg').click(function () {
            let obj = new userConstr($('#login-input-reg').val(),
                $('#pass-input-reg').val()
            );
            users.push(obj);
            forLocalStorage('data', users);  //-----------------------записть новых юзеров тольков локал сторедж.
        });
        singInBtnLisener();
    });
}


//обработчки кнопки sing in
function singInBtnLisener(){
    $('#submitBtn').click(function () {
        users.forEach(function (login, index) {
            if ($('#login-input').val() === users[index].login && $('#pass-input').val() === users[index].pass) {
                $('#pass-input').removeClass('warning');
                $('#login-input').removeClass('warning');
                console.log('good');
                $(".login").text(users[index].login);
            } else {
                $('#pass-input').addClass('warning');
                $('#login-input').addClass('warning');
                $('.form-inline').append('<div class="warning-message">Wrong login or password</div>');
            }
        });
    });
}

// отображение \ скрытие модалки Lorem Ipsum
$('.modalBtn').click(function(){
   $('.modal-lorem').removeClass('displaynone');
});

$('.modal-close').click(function(){
    $('.modal-lorem').addClass('displaynone');
});



//чужой готовый слайдер
$('.slider').slick({
    draggable: true,
    arrows: false,
    dots: true,
    fade: true,
    speed: 900,
    infinite: true,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    touchThreshold: 100
})