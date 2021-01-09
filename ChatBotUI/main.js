$(function () {
    $("#chat-floating-Icon").click(function (e) {
        $('#chat-box').addClass('chat-box-show');
    });

    $("#chat-box-close").click(function () {
        $('#chat-box').removeClass('chat-box-show');
    });

    LoadQuery(1, null, '');

    function LoadQuery(id, options, message) {

        var optionTemplate = "<span class='badge rounded-pill bg-info text-dark' type='button'>Option1</span>" +
            "<span class='badge rounded-pill bg-info text-dark' type='button'>Option2</span>" +
            "<span class='badge rounded-pill bg-info text-dark' type='button'>Option3</span>" +
            "<span class='badge rounded-pill bg-info text-dark' type='button'>Option4</span>" +
            "<span class='badge rounded-pill bg-info text-dark' type='button'>Option5</span>" +
            "<span class='badge rounded-pill bg-info text-dark' type='button'>Option6</span>";

        var linkTemplate = "<a href='https://google.com' target='_blank'>link to click</a>";

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
            optionTemplate +
            "</div>" +
            "</div>" +
            "</div>";

        document.getElementById("chat-box-messages").innerHTML += chatTemplate;

        document.getElementById("chat-box-messages").innerHTML += chatTemplate1;
    }
});