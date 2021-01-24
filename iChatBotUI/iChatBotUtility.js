// Function for string parsing with arguments 
$(function () {
    String.prototype.format = function () {
        var formatted = this;
        for (var i = 0; i < arguments.length; i++) {
            var regexp = new RegExp('\\{' + i + '\\}', 'gi');
            formatted = formatted.replace(regexp, arguments[i]);
        }
        return formatted;
    };
});

// iChatbot Library
var iChatBotUtility = (function () {

    var _gConfig = null;
    var _gDataset = null;
    var _userEvent = null;
    var _userSelections = new Array();

    var isNullOrEmpty = function isNullOrEmptyFun(value) {
        return (!value || value == undefined || value == "" || value.length == 0);
    }

    var intializeFun = function Initialize() {

        _gConfig = iChatBotConfig;
        _gDataset = iChatBotDataset;
        //_gDataset = JSON.parse(loadDataSetFun(_gConfig));

        renderHTMLTemplateFun();
        registerEventsFun();
        loadQueryFun(_gConfig.IntialQueryID);
    }

    // Function to render ichatbot html tempalte into user created #ichatbot div  
    var renderHTMLTemplateFun = function RenderHTMLTemplate() {

        // Main chatbot height, width and background color
        var ichatbotstyle = "style='height:" + _gConfig.iChatBotHeight + ";width:" + _gConfig.iChatBotWidth +
            ";background-color:" + _gConfig.iChatBotBackgroundColor + ";' ";

        var floatingIcon = "";
        var resetIcon = "";
        var closeIcon = "";

        // Floating icon
        if (!isNullOrEmpty(_gConfig.FloatingIconFAClass)) {
            floatingIcon = " <i class='" + _gConfig.FloatingIconFAClass + "'></i> ";;
        }
        else if (!isNullOrEmpty(_gConfig.FloatingIconImagePath)) {
            var cssClass = (!isNullOrEmpty(_gConfig.FloatingIconCSSClass)) ? "class='" + _gConfig.FloatingIconCSSClass + "'" : "";
            floatingIcon = "<img src='" + _gConfig.FloatingIconImagePath + "' " + cssClass + "></img>";
        }

        // Reset icon
        if (!isNullOrEmpty(_gConfig.ResetFAClass)) {
            resetIcon = "<i class='" + _gConfig.ResetFAClass + "' title='Reset'></i> ";
        }
        else if (!isNullOrEmpty(_gConfig.ResetImagePath)) {
            var cssClass = (!isNullOrEmpty(_gConfig.ResetCSSClass)) ? "class='" + _gConfig.ResetCSSClass + "'" : "";
            resetIcon = "<img src='" + _gConfig.ResetImagePath + "' " + cssClass + "></img>";
        }

        // Close icon
        if (!isNullOrEmpty(_gConfig.CloseFAClass)) {
            closeIcon = " <i class='" + _gConfig.CloseFAClass + "' title='Close'></i> ";;
        }
        else if (!isNullOrEmpty(_gConfig.CloseImagePath)) {
            var cssClass = (!isNullOrEmpty(_gConfig.CloseCSSClass)) ? "class='" + _gConfig.CloseCSSClass + "'" : "";
            closeIcon = "<img src='" + _gConfig.CloseImagePath + "' " + cssClass + "></img>";
        }

        // Chatbot template along with floating icon
        var htmlTemplate =
            "<div class='ichatbot' " + ichatbotstyle + "id='ichatbot'>" +
            "<div class='ichatbot-header'>" +
            "<div class='float-start'>" +
            "<span id='ichatbot-title-head'>" + _gConfig.Title + "</span>" +
            "</div>" +
            "<div class='float-end' id='header-right-icons'>" +
            "<a href='#' id='ichatbot-reset'>" + resetIcon + "</a>" +
            "<a href='#' id='ichatbot-close'>" + closeIcon + "</a>" +
            "</div>" +
            "</div>" +
            "<div id='ichatbot-container' class='container ichatbot-container'>" +
            "<div id='ichatbot-chat' class='ichatbot-chat'>" +
            "<div id='ichatbot-messages' style='background-color:" + _gConfig.MessagesBackgroundColor + "' class='ichatbot-messages'>" + "<div></div>" +
            "<div id='ichatbot-message-loading' class='d-flex justify-content-center'>" +
            "<div class='spinner-border' role='status'>" +
            "<span class='sr-only'>Loading...</span>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "<div class='ichatbot-footer'>" +
            "<div id='ichatbot-char-count' class='ichatbot-char-count float-end'>" +
            "0/" + _gConfig.UserMsgMaxLen + "</div>" +
            "<input id='ichatbot-message' type='text' class='float-start form-control' disabled " +
            "minlength='" + _gConfig.UserMsgMinLen + "' maxlength='" + _gConfig.UserMsgMaxLen + "' " +
            "autocomplete='off'>" +
            "</div>" +
            "</div>" +
            " <a href='#' id='ichatbot-floating-Icon' class='ichatbot-floating-icon'>" + floatingIcon + "</a>";

        document.getElementById("ichatbot-container").innerHTML = htmlTemplate;
    }

    // Function to registering close, events configurations from iChatBotConfig.js
    var registerEventsFun = function registerEvents() {

        $("#ichatbot-floating-Icon").click(function () {
            $('#ichatbot').addClass('ichatbot-show');
        });

        $("#ichatbot-close").click(function () {
            $('#ichatbot').removeClass('ichatbot-show');
        });

        $("#ichatbot-reset").click(function () {
            iChatBotUtility.ResetChat();
        });

        // Event for handling user message ENTER 
        $("#ichatbot-message").keydown(function (e) {
            if (e.code === "Enter" || e.code === "NumpadEnter") {
                var input = e.target.value;
                var charCount = e.target.value.length;
                var minLength = e.target.minLength;

                if (charCount >= minLength) {
                    // Creating chat template
                    userResponseDisplayFun(input);
                    // Passing the user response to subscribed event
                    fireUserEventFun(e.target.value);

                    e.target.disabled = true;
                    e.target.value = "";
                }
                $("#ichatbot-char-count").text('0/' + e.target.maxLength);
                document.getElementById("ichatbot-char-count").innerHTML = "0/" + e.target.maxLength;
            }
        });

        // Event for handling the character count
        $("#ichatbot-message").keyup(function (e) {
            var charCount = e.target.value.length;
            var minLength = e.target.minLength;

            if (charCount < minLength) {
                $(this).addClass('ichatbot-message-error');
            }
            else {
                $(this).removeClass('ichatbot-message-error');
            }

            console.log(e.target.maxLength);

            $("#ichatbot-char-count").text(charCount + '/' + e.target.maxLength);
        });

        // Event for handling user selected option 
        $('#ichatbot').on('click', '#ichatbot-options', function (e) {
            var SelectedID = e.target.attributes.id.value
            var response = _gDataset.Responses.find((x) => x.ID == SelectedID);

            if (response != null && response.FireSubscribedEvent != null && response.FireSubscribedEvent == "TRUE") {
                fireUserEventFun(response);
            }
        });
    }

    // Function that loads our Query, processes it from Dataset.
    var loadQueryFun = function LoadQuery(id) {
        document.getElementById("ichatbot-message-loading").style.visibility = "visible";

        if (document.getElementById("ichatbot-options") != null) {
            document.getElementById("ichatbot-options").classList.add("disabled-options");
        }

        var query = _gDataset.Queries.find(x => x.ID == id);
        var queryText = query.Query;

        // Taking care of input container to be set on and off.
        if (query.Enabletext == "TRUE") {
            document.getElementById("ichatbot-message").disabled = false;
        }
        else {
            document.getElementById("ichatbot-message").disabled = true;
        }

        // The templates that generates Options, Link
        var optionTemplate = "<span id='{0}' onclick='iChatBotUtility.LoadQuery({1})' class='badge rounded-pill bg-info text-dark' type='button'>{2}</span>";
        var linkTemplate = "<a href='{0}' target='_blank'>link to click</a>";

        var templateGenerated = '';

        // Are being sent to a format function, to be parsed correctly. 
        if (query.Response != null) {

            var responseIDS = query.Response.split(',');

            responseIDS.forEach(element => {
                var response = _gDataset.Responses.find(x => x.ID == element);
                if (response.Type == "Option") {
                    templateGenerated += optionTemplate.format(element, response.Query, response.Response);
                }
                else if (response.Type == "Link") {
                    templateGenerated += linkTemplate.format(element, response.Response);
                }
            });
        }

        var chatQueryIcon;

        // Picks either the FA user icon, or Image user icon for chat messages. 
        if (!isNullOrEmpty(_gConfig.ChatQueryIconFAClass)) {
            chatQueryIcon = "<i class='" + _gConfig.ChatQueryIconFAClass + "'></i>";
        }
        else if (!isNullOrEmpty(_gConfig.ChatQueryIconImagePath)) {
            var cssClass = (!isNullOrEmpty(_gConfig.ChatQueryIconCSSClass)) ? "class='" + _gConfig.ChatQueryIconCSSClass + "'" : "";
            chatQueryIcon = "<img decoding  src='" + _gConfig.ChatQueryIconImagePath + "' class='" + cssClass + "'></img>  ";
        }

        // Template for Chat message
        var chatTemplate = "<div class='ichatbot-message-template'>" +
            "<div class='d-flex justify-content-start'>" +
            chatQueryIcon +
            "<span id='{0}' class='ichatbot-message-text {1}'>{2}</span>" +
            "</div>" +
            "<div id='ichatbot-options' class='ichatbot-options'>{3}</div>" +
            "</div>";

        var boldClass = query.Bold == "TRUE" ? " font-bold-true " : "";

        setTimeout(() => {
            document.getElementById("ichatbot-message-loading").style.visibility = "hidden";
            document.getElementById("ichatbot-messages").getElementsByTagName("div")[0].innerHTML +=
                chatTemplate.format(query.ID, boldClass, queryText, templateGenerated);
            document.getElementById("ichatbot-message-loading").scrollIntoView();
        }, 600);
    }

    // Function that handles work after User Responds. 
    var userResponseDisplayFun = function UserResponseDisplay(userInput) {
        var parsedInput = parseUserInput(userInput);
        var chatResponseIcon = "";

        // Picks either the FA user icon, or Image user icon for chat messages. 
        if (!isNullOrEmpty(_gConfig.ChatResponseIconFAClass)) {
            chatResponseIcon = "<i class='" + _gConfig.ChatResponseIconFAClass + "'></i>";
        }
        else if (!isNullOrEmpty(_gConfig.ChatResponseIconImagePath)) {
            var cssClass = (!isNullOrEmpty(_gConfig.ChatResponseIconCSSClass)) ? "class='" + _gConfig.ChatResponseIconCSSClass + "'" : "";
            chatResponseIcon = "<img decoding  src='" + _gConfig.ChatResponseIconImagePath + "' class='" + cssClass + "'></img>  ";
        }

        var userResponseTemplate = "<div class='ichatbot-message-template'>" +
            "<div class='d-flex justify-content-end'>" +
            "<span class='ichatbot-message-text mar-right-5px'>{0}</span>" +
            chatResponseIcon +
            "</div>";

        document.getElementById("ichatbot-messages").getElementsByTagName("div")[0].innerHTML +=
            userResponseTemplate.format(parsedInput);
        document.getElementById("ichatbot-message-loading").scrollIntoView();
    }

    // Function that Resets chat
    var resetChatFun = function ResetChat() {
        document.getElementById("ichatbot-messages").getElementsByTagName("div")[0].innerHTML = "";
        loadQueryFun(_gConfig.IntialQueryID);
    }

    // Loading the dataset
    var loadDataSetFun = function LoadDataset(iChatBotConfig) {
        var result;

        if (isNullOrEmpty(_gConfig.DataSetFilePath)) {
            $.ajax({
                url: iChatBotConfig.DataSetFilePath,
                async: false,
                success: function (data) {
                    result = data;
                }
            });
        }
        else if (isNullOrEmpty(_gConfig.DataSetURL)) {
            //TODO : user to call API
            // _gDataset = ;
        }

        return result;
    }

    //Small utility function that takes care of long inputs by user, for display purpose in chatbox.
    var parseUserInput = function ParseUserInput(userInput) {
        var result = "";
        var maxLength = 25;
        var numOfLines = Math.floor(userInput.length / maxLength);
        for (var i = 0; i < numOfLines + 1; i++) {
            result += userInput.substr(i * maxLength, maxLength);
            if (i !== numOfLines) { result += "\n"; }
        }
        return result;
    }


    var SubscribeEventFun = function subscribeEvent(func) {
        _userEvent = func;
    }

    var fireUserEventFun = function FireUserEvent(data) {
        _userSelections.push(object);
        _userEvent(_userSelections);
    }

    return {
        Initialize: intializeFun,
        LoadDataset: loadDataSetFun,
        LoadQuery: loadQueryFun,
        ResetChat: resetChatFun,
        UserResponseDisplay: userResponseDisplayFun,
        subscribeEvent: SubscribeEventFun,
        FireUserEvent: fireUserEventFun
    }

})();