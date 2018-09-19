$(document).ready(function () {

    // логин
    $("#btnLogin").click(function () {
        var nickName = $("#txtUserName").val();
        if (nickName) {
            // ссылка с параметрами
            var href = "/Home?user=" + encodeURIComponent(nickName);
            href = href + "&logOn=true";
            $("#LoginButton").attr("href", href).click();

            // поле с ником
            $("#Username").text(nickName);
        }
    });
});


function LoginOnSuccess(result) {

    Scroll();
    ShowLastRefresh();

    // обновление
    setTimeout("Refresh();", 5000);

    // отправка на Ентер
    $('#txtMessage').keydown(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            $("#btnMessage").click();
        }
    });

    // установка обработчика нажатия кнопки 
    $("#btnMessage").click(function () {
        var text = $("#txtMessage").val();
        if (text) {

            // передаем параметр "chatMessage"
            var href = "/Home?user=" + encodeURIComponent($("#Username").text());
            href = href + "&chatMessage=" + encodeURIComponent(text);
            $("#ActionLink").attr("href", href).click();
            $("#txtMessage").empty();
        }
    });

    // выход из чата
    $("#btnLogOff").click(function () {

        // передаем параметр "logOff"
        var href = "/Home?user=" + encodeURIComponent($("#Username").text());
        href = href + "&logOff=true";
        $("#ActionLink").attr("href", href).click();

        document.location.href = "Home";
    });

}

// ошибка при логине
function LoginOnFailure(result) {
    $("#Username").val("");
    $("#Error").text(result.responseText);
    setTimeout("$('#Error').empty();", 2000);
}

// обновление поля чата
function Refresh() {
    var href = "/Home?user=" + encodeURIComponent($("#Username").text());

    $("#ActionLink").attr("href", href).click();
    setTimeout("Refresh();", 5000);
}


function ChatOnFailure(result) {
    $("#Error").text(result.responseText);
    setTimeout("$('#Error').empty();", 2000);
}


function ChatOnSuccess(result) {
    Scroll();
    ShowLastRefresh();
}

//скролл к низу окна
function Scroll() {
    var win = $('#Messages');
    var height = win[0].scrollHeight;
    win.scrollTop(height);
}

//отображение времени последнего обновления чата
function ShowLastRefresh() {
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
    $("#LastRefresh").text("Последнее обновление было в " + time);
}
