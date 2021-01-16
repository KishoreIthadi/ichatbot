$(function () {

    String.prototype.format = function () {
        var formatted = this;
        for (var i = 0; i < arguments.length; i++) {
            var regexp = new RegExp('\\{' + i + '\\}', 'gi');
            formatted = formatted.replace(regexp, arguments[i]);
        }
        return formatted;
    };

    $("#chat-floating-Icon").click(function (e) {
        $('#chat-box').addClass('chat-box-show');
    });

    $("#chat-box-close").click(function () {
        $('#chat-box').removeClass('chat-box-show');
    });

    $("#chat-box-reset").click(function () {
        iChatBotUtility.ResetChat();
    });

    $("#chat-box-message").keydown(function (e) {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            var input = e.target.value;
            e.target.disabled = true;
            e.target.value = "";

            //TODO fire user function
            //TODO append user input text to chatbox
        }
    });
});

"use strict";

var iChatBotUtility = (function () {

    var _globalDataset = null;
    var _globalConfig = iChatBotConfig;

    var intializeFun = function Initialize() {

        var dataset = loadDataSetFun(_globalConfig);
        loadQueryFun(_globalConfig.IntialQueryID);
    }

    var loadQueryFun = function LoadQuery(id) {

        document.getElementById("chat-box-message-loading").style.visibility = "visible";

        var query = _globalDataset.Queries.find(x => x.ID == id);
        var queryText = query.Query;
        var responseQueryID;

        if (query.Enabletext == "TRUE") {
            document.getElementById("chat-box-message").disabled = false;
        }
        else {
            document.getElementById("chat-box-message").disabled = true;
        }

        var optionTemplate = "<span id='{0}' onclick='iChatBotUtility.LoadQuery({1})' class='badge rounded-pill bg-info text-dark' type='button'>{2}</span>";
        var linkTemplate = "<a href='{0}' target='_blank'>link to click</a>";

        var templateGenerated = '';

        if (query.Response != null) {

            var responseIDS = query.Response.split(',');

            responseIDS.forEach(element => {
                var response = _globalDataset.Responses.find(x => x.ID == element);
                if (response.Type == "Option") {
                    templateGenerated += optionTemplate.format(element, response.Query, response.Response);
                }
                else if (response.Type == "Link") {
                    templateGenerated += linkTemplate.format(element, response.Response);
                    responseQueryID = response.Query;
                }
            });
        }

        var chatTemplate = "<div class='chat-box-message-template'>" +
            "<i class='fa fa-user-circle fa-2x float-start' aria-hidden='true'></i>" +
            "<span id='" + query.ID + "' class='chat-box-message-text'>" + queryText + "</span>" +
            "<br>" +
            "<div id='chat-box-options' class='chat-box-options'>" +
            templateGenerated +
            "</div>" +
            "</div>" +
            "</div>";

        setTimeout(() => {
            document.getElementById("chat-box-message-loading").style.visibility = "hidden";
            document.getElementById("chat-box-messages").getElementsByTagName("div")[0].innerHTML += chatTemplate;
            document.getElementById("chat-box-message-loading").scrollIntoView();
        }, 600);

        if (responseQueryID != null) {
            LoadQuery(responseQueryID);
        }
    }

    var resetChatFun = function ResetChat() {
        document.getElementById("chat-box-messages").getElementsByTagName("div")[0].innerHTML = "";
        loadQueryFun(_globalConfig.IntialQueryID);
    }

    var loadDataSetFun = function LoadDataset(iChatBotConfig) {

        if (iChatBotConfig.DataSetURL != null) {
            //TODO : user to call API
            // _globalDataset = ;
        }

        _globalDataset = iChatBotDataset;
    }

    return {
        LoadDataset: loadDataSetFun,
        LoadQuery: loadQueryFun,
        ResetChat: resetChatFun,
        Initialize: intializeFun
    }

})();