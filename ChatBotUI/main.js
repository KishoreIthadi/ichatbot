$(function () {
    $("#chat-floating-Icon").click(function (e) {
        $('#chat-box').addClass('chat-box-show');
    });

    $("#chat-box-close").click(function () {
        $('#chat-box').removeClass('chat-box-show');
    });

    LoadQuery(1);

    function LoadQuery(ID) {

        var OptionTemplate = "<span class='badge rounded-pill bg-info text-dark' type='button'>Info</span>";
        "<span class='badge rounded-pill bg-info text-dark' type='button'>Info</span>";
        "<span class='badge rounded-pill bg-info text-dark' type='button'>Info</span>";
        "<span class='badge rounded-pill bg-info text-dark' type='button'>Info</span>";
        "<span class='badge rounded-pill bg-info text-dark' type='button'>Info</span>";
        "<span class='badge rounded-pill bg-info text-dark' type='button'>Info</span>";

        var linkTemplate = "<a href='https://google.com'>link to click</a>";
        var textTemplate = "this is a message";

        var chatTemplate = "<div class='chat-box-message-template'>" +
            "<i class='fa fa-user-circle fa-2x float-start' aria-hidden='true'></i>" +
            "<span id='chat-box-message-text' class='chat-box-message-text'>Please select text Please select </span>" +
            "<br>" +
            "<div id='chat-box-options' class='chat-box-options'>" +
            linkTemplate +
            "</div>" +
            "</div>" +
            "</div>";

        var chatTemplate1 = "<div class='chat-box-message-template'>" +
            "<i class='fa fa-user-circle fa-2x float-start' aria-hidden='true'></i>" +
            "<span id='chat-box-message-text' class='chat-box-message-text'>Please select text </span>" +
            "<br>" +
            "<div id='chat-box-options' class='chat-box-options'>" +
            OptionTemplate +
            "</div>" +
            "</div>" +
            "</div>";

        var chatTemplate2 = "<div class='chat-box-message-template'>" +
            "<i class='fa fa-user-circle fa-2x float-start' aria-hidden='true'></i>" +
            "<span id='chat-box-message-text' class='chat-box-message-text'>Please select text </span>" +
            "<br>" +
            "<div id='chat-box-options' class='chat-box-options'>" +
            textTemplate +
            "</div>" +
            "</div>" +
            "</div>";


        document.getElementById("chat-box-messages").innerHTML += chatTemplate1;

        document.getElementById("chat-box-messages").innerHTML += chatTemplate2;

        document.getElementById("chat-box-messages").innerHTML += chatTemplate;
    }
});