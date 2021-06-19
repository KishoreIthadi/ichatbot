// iChatbot Library
var iChatBotUtility = (function () {

    var _gConfig = null;
    var _gDataset = null;

    var _userTextEvent = null;
    var _chatCloseEvent = null;
    var _chatResetEvent = null;
    var _chatButtonClickEvent = null;

    var _chatSession = new Array();

    var isNullOrEmptyFun = function IsNullOrEmpty(value) {
        return (value == undefined || value == "" || value.length == 0);
    }

    // Function for string parsing with arguments 
    String.prototype.format = function () {
        var formatted = this;
        for (var i = 0; i < arguments.length; i++) {
            var regexp = new RegExp('\\{' + i + '\\}', 'gi');
            formatted = formatted.replace(regexp, arguments[i]);
        }
        return formatted;
    };

    // Initialize function is the start point, takes care of dataset loads, configurations, rendering template.
    var intializeFun = function Initialize(config, dataset) {

        _gConfig = config;
        _gDataset = dataset;

        validateConfigFun();

        renderHTMLTemplateFun();
        registerEventsFun();
        loadQueryFun(_gConfig.IntialQueryID);
    }

    var validateConfigFun = function ValidateConfiguration() {

        if (isNullOrEmptyFun(_gConfig)) {
            console.error("iChatBot : configuration file/object not found");
        }
        if (isNullOrEmptyFun(_gDataset)) {
            console.error("iChatBot : dataset file/object not found");
        }

        // Checks the Configuration js file for essential properties to be defined.
        if (isNullOrEmptyFun(_gConfig.IntialQueryID)) {
            console.error("iChatBot : IntialQueryID property cannot be null/undefined");
        }

        // Console warnings if any of CSS attributes miss, such as heights, colors. 
        if (isNullOrEmptyFun(_gConfig.UserMsgMinLen)) {
            console.warn("iChatBot : UserMsgMinLen property is undefined or null");
        } if (isNullOrEmptyFun(_gConfig.UserMsgMaxLen)) {
            console.warn("iChatBot : UserMsgMaxLen property is undefined or null");
        } if (isNullOrEmptyFun(_gConfig.Title)) {
            console.warn("iChatBot : Title property is undefined or null");
        } if (isNullOrEmptyFun(_gConfig.iChatBotHeight)) {
            console.warn("iChatBot : iChatBotHeight property is undefined or null");
        } if (isNullOrEmptyFun(_gConfig.iChatBotWidth)) {
            console.warn("iChatBot : iChatBotWidth property is undefined or null");
        } if (isNullOrEmptyFun(_gConfig.iChatBotBackgroundColor)) {
            console.warn("iChatBot : iChatBotBackgroundColor property is undefined or null");
        } if (isNullOrEmptyFun(_gConfig.MessagesBackgroundColor)) {
            console.warn("iChatBot : MessagesBackgroundColor property is undefined or null");
        }

        // Float icon - essential for logic
        if (isNullOrEmptyFun(_gConfig.FloatingIconFAClass) && isNullOrEmptyFun(_gConfig.FloatingIconImagePath)) {
            console.error("iChatBot : Set either FloatingIconFAClass or FloatingIconImagePath property");
        }

        // Reset icon - essential for reset chat
        if (isNullOrEmptyFun(_gConfig.ResetFAClass) && isNullOrEmptyFun(_gConfig.ResetImagePath)) {
            console.error("iChatBot : Set either ResetFAClass or ResetImagePath property");
        }

        // Close icon - essential to close pop up box
        if (isNullOrEmptyFun(_gConfig.CloseFAClass) && isNullOrEmptyFun(_gConfig.CloseImagePath)) {
            console.error("iChatBot : Set either CloseFAClass or CloseImagePath property");
        }

        // Chat query icons, in message template
        if (isNullOrEmptyFun(_gConfig.ChatQueryIconFAClass) && isNullOrEmptyFun(_gConfig.ChatQueryIconImagePath)) {
            console.error("iChatBot : Set either ChatQueryIconFAClass or ChatQueryIconImagePath property");
        }

        // Chat response icons, in message template
        if (isNullOrEmptyFun(_gConfig.ChatResponseIconFAClass) && isNullOrEmptyFun(_gConfig.ChatResponseIconImagePath)) {
            console.error("iChatBot : Set either ChatResponseIconFAClass or ChatResponseIconImagePath property");
        }

        // if (_gConfig.textSearchMessageInvalid == undefined) {
        //     warningMessage += "textSearchMessageInvalid ";
        // }

        // if (_gConfig.textSearchMessageUnmatched == undefined) {
        //     warningMessage += "textSearchMessageUnmatched ";
        // }
        // if (_gConfig.flowControlForInvalid == undefined) {
        //     warningMessage += "flowControlForInvalid ";
        // }
    }

    // Function to render ichatbot html tempalte into user created #ichatbot div  
    var renderHTMLTemplateFun = function RenderHTMLTemplate() {

        // Main chatbot height, width and background color
        var ichatbotStyle = "style='background-color:" + _gConfig.iChatBotBackgroundColor + ";' ";
        var ichatbotMessageStyle = "style='background-color:" + _gConfig.MessagesBackgroundColor + " ;height:" +
            _gConfig.iChatBotHeight + ";width:" + _gConfig.iChatBotWidth + ";' ";

        var floatingIcon = "";
        var resetIcon = "";
        var closeIcon = "";

        // Floating icon
        if (!isNullOrEmptyFun(_gConfig.FloatingIconFAClass)) {
            floatingIcon = " <i onclick ='iChatBotUtility.ShowChat()' class='" + _gConfig.FloatingIconFAClass + "'></i> ";;
        }
        else if (!isNullOrEmptyFun(_gConfig.FloatingIconImagePath)) {
            var cssClass = (!isNullOrEmptyFun(_gConfig.FloatingIconCSSClass)) ? "class='" + _gConfig.FloatingIconCSSClass + "'" : "";
            floatingIcon = "<img onclick ='iChatBotUtility.ShowChat()' src='" + _gConfig.FloatingIconImagePath + "' " + cssClass + "></img>";
        }

        // Reset icon
        if (!isNullOrEmptyFun(_gConfig.ResetFAClass)) {
            resetIcon = "<i onclick ='iChatBotUtility.ResetChat()' class='" + _gConfig.ResetFAClass + "' title='Reset'></i> ";
        }
        else if (!isNullOrEmptyFun(_gConfig.ResetImagePath)) {
            var cssClass = (!isNullOrEmptyFun(_gConfig.ResetCSSClass)) ? "class='" + _gConfig.ResetCSSClass + "'" : "";
            resetIcon = "<img onclick='iChatBotUtility.ResetChat()' src='" + _gConfig.ResetImagePath + "' " + cssClass + "></img>";
        }

        // Close icon
        if (!isNullOrEmptyFun(_gConfig.CloseFAClass)) {
            closeIcon = " <i onclick ='iChatBotUtility.CloseChat()' class='" + _gConfig.CloseFAClass + "' title='Close'></i> ";;
        }
        else if (!isNullOrEmptyFun(_gConfig.CloseImagePath)) {
            var cssClass = (!isNullOrEmptyFun(_gConfig.CloseCSSClass)) ? "class='" + _gConfig.CloseCSSClass + "'" : "";
            closeIcon = "<img onclick ='iChatBotUtility.CloseChat()' src='" + _gConfig.CloseImagePath + "' " + cssClass + "></img>";
        }

        // Chatbot template along with floating icon
        var htmlTemplate =
            "<div class='ichatbot' " + ichatbotStyle + "id='ichatbot'>" +
            "<div class='ichatbot-header'>" +
            "<div class='float-start'>" +
            "<span id='ichatbot-title-head' class='" + _gConfig.TitleCSSClass + "'>" + _gConfig.Title + "</span>" +
            "</div>" +
            "<div class='float-end' id='header-right-icons'>" +
            "<a href='#' id='ichatbot-reset'>" + resetIcon + "</a>" +
            "<a href='#' id='ichatbot-close'>" + closeIcon + "</a>" +
            "</div>" +
            "</div>" +
            "<div id='ichatbot-container' class='container ichatbot-container'>" +
            "<div id='ichatbot-chat' class='ichatbot-chat'>" +
            "<div id='ichatbot-messages' " + ichatbotMessageStyle + " class='ichatbot-messages'>" + "<div></div>" +
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

    var registerEventsFun = function RegisterEvents() {

        document.getElementById("ichatbot-message")
            .addEventListener("keydown", function (e) {

                if (e.code === "Enter" || e.code === "NumpadEnter") {
                    var input = e.target.value;
                    var charCount = e.target.value.length;
                    var minLength = e.target.minLength;

                    if (charCount >= minLength) {

                        e.target.disabled = true;
                        e.target.value = "";

                        userResponseDisplayFun(input);
                        _chatSession.push({ "UserTextInput": input });

                        var queryID = "";

                        for (var i = _chatSession.length - 1; i >= 0; i--) {
                            if (!isNullOrEmptyFun(_chatSession[i].Query)) {
                                if (!isNullOrEmptyFun(_chatSession[i].Query.ID)) {
                                    queryID = _chatSession[i].Query.ID;
                                    break;
                                }
                            }
                        }

                        var query = _gDataset.Queries.find(x => x.ID == queryID);

                        if (query.SearchInQueries == false) {
                            loadQueryFun(query.QueryID);
                        }
                        else {
                            isQueryFound = false;

                            for (var i = 0; i <= _gDataset.Queries.length - 1; i++) {

                                if (!isNullOrEmptyFun(_gDataset.Queries[i].SearchKeywords)) {
                                    if (_gDataset.Queries[i].SearchKeywords.toLowerCase().search(input.toLowerCase()) == 0) {
                                        loadQueryFun(_gDataset.Queries[i].ID);
                                        isQueryFound = true;
                                        break;
                                    }
                                }
                            }

                            if (!isQueryFound) {
                                if (!isNullOrEmptyFun(query.QueryID)) {
                                    loadQueryFun(query.QueryID);
                                }
                                else {

                                    //TODO : check test already exists
                                    var ichatBotErrorMsg = {
                                        "ID": "IchatBotErrorMsg",
                                        "Query": _gConfig.SearchNotFoundMsg,
                                        "Response": "",
                                        "Enabletext": false,
                                        "QueryID": "",
                                        "SearchInQueries": false,
                                        "SearchKeywords": "",
                                        "FireTextChangeEvent": false,
                                    }

                                    if (!_gDataset.Queries.find(x => x.ID == "IchatBotErrorMsg")) {
                                        _gDataset.Queries.push(ichatBotErrorMsg);
                                    }

                                    loadQueryFun("IchatBotErrorMsg");
                                    loadQueryFun(query.ID);
                                }
                            }
                        }

                        if (query.FireSubscribedEvent == true) {
                            fireUserTextEventFun();
                        }

                        document.getElementById("ichatbot-char-count").innerHTML = "0/" + e.target.maxLength;
                    }
                }
            });

        // Event for handling the character count
        document.getElementById("ichatbot-message")
            .addEventListener("keyup", function (e) {
                var charCount = e.target.value.length;
                var minLength = e.target.minLength;

                if (charCount < minLength) {
                    e.target.classList.add('ichatbot-message-error');
                }
                else {
                    e.target.classList.remove('ichatbot-message-error');
                }

                document.getElementById("ichatbot-char-count").innerHTML = charCount + '/' + e.target.maxLength;
            });

        // Event for handling user selected button.
        document.getElementById("ichatbot")
            .addEventListener("click", function (e) {

                if (e.target.classList.contains('ichatbotbtn')) {

                    if (!isNullOrEmptyFun(e.target.attributes.id)) {

                        var SelectedID = e.target.attributes.id.value;
                        var response = _gDataset.Responses.find((x) => x.ID == SelectedID);

                        _chatSession.push({ "Response": response });

                        if (!isNullOrEmptyFun(response.Query)) {
                            loadQueryFun(response.Query)
                        }

                        // Makes sure that Subscribed events are fired only when it's relative check is true. 
                        if (response != null && !isNullOrEmptyFun(response.FireSubscribedEvent) && response.FireSubscribedEvent == true) {
                            fireUserButtonClickEventFun();
                        }
                    }
                }
            });
    }

    // Function that loads our Query, processes it from Dataset.
    var loadQueryFun = function LoadQuery(id) {
        if (isNullOrEmptyFun(id)) {
            return;
        }

        document.getElementById("ichatbot-message-loading").style.visibility = "visible";

        // Disabling the selected clickable buttons
        if (!isNullOrEmptyFun(_gConfig.DisableSelectedButton)) {
            if (_gConfig.DisableSelectedButton == true) {

                var clickableButtons = document.getElementsByClassName("ichatbotbtn");

                if (clickableButtons != null) {
                    for (var i = 0; i < clickableButtons.length; i++) {
                        clickableButtons[i].classList.add("disabled-buttons");
                    }
                }
            }
        }

        var query = _gDataset.Queries.find(x => x.ID == id);
        var queryText = query.Query;

        _chatSession.push({ "Query": query });

        // Taking care of input container to be set on and off.
        if (query.Enabletext == true) {
            document.getElementById("ichatbot-message").disabled = false;
        }
        else {
            document.getElementById("ichatbot-message").disabled = true;
        }

        // The templates that generates Buttons, Link.
        var buttonTemplate = "<span id='{0}' class='" + _gConfig.ButtonCSSClass + " ichatbotbtn' type='button'>{1}</span>";
        var linkTemplate = "<a href='{0}' target='_blank' class='" + _gConfig.LinkCSSClass + "'>{1}</a>";

        var templateGenerated = '';

        // Are being sent to a format function, to be parsed correctly. 
        if (!isNullOrEmptyFun(query.Response)) {

            var responseIDS = query.Response.split(',');

            //This block here checks for Query 'type', the Button and Link types.
            responseIDS.forEach(element => {
                var response = _gDataset.Responses.find(x => x.ID == element);
                if (response.Type == "Button") {
                    templateGenerated += buttonTemplate.format(element, response.Response);
                }
                else if (response.Type == "Link") {
                    templateGenerated += linkTemplate.format(response.Response, !isNullOrEmptyFun(response.LinkTitle) ? response.LinkTitle : "link");
                }
            });
        }

        var chatQueryIcon;

        // Picks either the FA user icon, or Image user icon for chat messages. 
        if (!isNullOrEmptyFun(_gConfig.ChatQueryIconFAClass)) {
            chatQueryIcon = "<i class='" + _gConfig.ChatQueryIconFAClass + "'></i>";
        }
        else if (!isNullOrEmptyFun(_gConfig.ChatQueryIconImagePath)) {
            var cssClass = (!isNullOrEmptyFun(_gConfig.ChatQueryIconCSSClass)) ? "class='" + _gConfig.ChatQueryIconCSSClass + "'" : "";
            chatQueryIcon = "<img decoding  src='" + _gConfig.ChatQueryIconImagePath + "' class='" + cssClass + "'></img>  ";
        }
        // Template for Chat message
        var chatTemplate = "<div class='ichatbot-message-template'>" +
            "<div class='d-flex justify-content-start'>" +
            chatQueryIcon +
            "<span id='{0}' class='{1}'>{2}</span>" +
            "</div>" +
            "<div id='ichatbot-options' class='ichatbot-options'>{3}</div>" +
            "</div>";

        setTimeout(() => {
            document.getElementById("ichatbot-message-loading").style.visibility = "hidden";
            document.getElementById("ichatbot-messages").getElementsByTagName("div")[0].innerHTML +=
                chatTemplate.format(query.ID, _gConfig.ChatMessageCSSClass, queryText, templateGenerated);
            document.getElementById("ichatbot-message-loading").scrollIntoView();
        }, 600);

        if (!isNullOrEmptyFun(query.QueryID)) {
            if (query.QueryID != "") {
                if (query.SearchInQueries == false && query.Enabletext == false) {
                    loadQueryFun(query.QueryID);
                }
            }
        }
    }

    // Function that handles work after User Responds. 
    var userResponseDisplayFun = function UserResponseDisplay(userInput) {
        var parsedInput = parseUserInputFun(userInput);
        var chatResponseIcon = "";

        // Picks either the FA user icon, or Image user icon for chat messages. 
        if (!isNullOrEmptyFun(_gConfig.ChatResponseIconFAClass)) {
            chatResponseIcon = "<i class='" + _gConfig.ChatResponseIconFAClass + "'></i>";
        }
        else if (!isNullOrEmptyFun(_gConfig.ChatResponseIconImagePath)) {
            var cssClass = (!isNullOrEmptyFun(_gConfig.ChatResponseIconCSSClass)) ? "class='" + _gConfig.ChatResponseIconCSSClass + "'" : "";
            chatResponseIcon = "<img decoding  src='" + _gConfig.ChatResponseIconImagePath + "' class='" + cssClass + "'></img>  ";
        }

        // The template for user response
        var userResponseTemplate = "<div class='ichatbot-message-template'>" +
            "<div class='d-flex justify-content-end'>" +
            "<span class='" + _gConfig.ChatResponseCSSClass + "'>{0}</span>" +
            chatResponseIcon +
            "</div>";

        document.getElementById("ichatbot-messages").getElementsByTagName("div")[0].innerHTML +=
            userResponseTemplate.format(parsedInput);
        document.getElementById("ichatbot-message-loading").scrollIntoView();
    }

    // Function that Resets chat
    var resetChatFun = function ResetChat() {
        document.getElementById("ichatbot-messages").getElementsByTagName("div")[0].innerHTML = "";
        document.getElementById("ichatbot-char-count").innerHTML = "0/" + _gConfig.UserMsgMaxLen;
        document.getElementById("ichatbot-message").value = '';
        document.getElementById("ichatbot-message").classList.remove('ichatbot-message-error');

        _chatSession.push({ "Reset": "UserReset" });

        if (_gConfig.ResetChatHistoryOnReset == true) {
            _chatSession = [];
        }

        loadQueryFun(_gConfig.IntialQueryID);
        fireChatResetEventFun();
    }

    // Function that closes chat
    var closeChatFun = function CLoseChat() {
        document.getElementById('ichatbot').classList.remove("ichatbot-show");

        _chatSession.push({ "Close": "UserClose" });

        if (_gConfig.ResetChatHistoryOnClose == true) {
            document.getElementById("ichatbot-messages").getElementsByTagName("div")[0].innerHTML = "";
            document.getElementById("ichatbot-char-count").innerHTML = "0/" + _gConfig.UserMsgMaxLen;;
            document.getElementById("ichatbot-message").value = '';
            document.getElementById("ichatbot-message").classList.remove('ichatbot-message-error');

            _chatSession = [];
        }

        loadQueryFun(_gConfig.IntialQueryID);
        fireChatCloseEventFun();
    }

    // Function that opens chat
    var showChatFun = function showChat() {
        document.getElementById('ichatbot').classList.add("ichatbot-show");
    }

    //utility function that takes care of long inputs by user, for display purpose in chatbox.
    var parseUserInputFun = function ParseUserInput(userInput) {
        var result = "";
        var maxLength = 25;
        var numOfLines = Math.floor(userInput.length / maxLength);
        for (var i = 0; i < numOfLines + 1; i++) {
            result += userInput.substr(i * maxLength, maxLength);
            if (i !== numOfLines) { result += "\n"; }
        }
        return result;
    }

    var SubscribeEventFun = function subscribeEvent(userTextEvent, buttonClickEvent, chatResetEvent, chatCloseEvent) {
        _userTextEvent = userTextEvent;
        _chatButtonClickEvent = buttonClickEvent;
        _chatResetEvent = chatResetEvent;
        _chatCloseEvent = chatCloseEvent;
    }

    var fireUserTextEventFun = function FireUserTextEvent() {
        if (!isNullOrEmptyFun(_userTextEvent)) {
            _userTextEvent(_chatSession);
        }
    }

    var fireChatResetEventFun = function FireChatResetEvent() {
        if (!isNullOrEmptyFun(_chatResetEvent)) {
            _chatResetEvent(_chatSession);
        }
    }

    var fireChatCloseEventFun = function FireChatCloseEvent() {
        if (!isNullOrEmptyFun(_chatCloseEvent)) {
            _chatCloseEvent(_chatSession);
        }
    }

    var fireUserButtonClickEventFun = function FireUserButtonClickEvent() {
        if (!isNullOrEmptyFun(_chatButtonClickEvent)) {
            _chatButtonClickEvent(_chatSession);
        }
    }

    return {
        Initialize: intializeFun,
        LoadQuery: loadQueryFun,
        ResetChat: resetChatFun,
        CloseChat: closeChatFun,
        ShowChat: showChatFun,
        UserResponseDisplay: userResponseDisplayFun,
        subscribeEvent: SubscribeEventFun,
    }

})();