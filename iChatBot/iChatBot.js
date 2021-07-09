"use strict";

// iChatbot Utility
var iChatBot = (function () {

    // Global variables
    var _gConfig = null;
    var _gDataset = null;
    var _gChatSession = null;
    var _gRecentQuery = null;

    // Event handlers
    var _userTextEvent = null;
    var _chatCloseEvent = null;
    var _chatResetEvent = null;
    var _chatButtonClickEvent = null;
    var _fileUploadEvent = null;

    var _stopEventExecution = false;

    // event for text input search failed 
    var stopEventExecutionFun = {
        searchFailed: false,
        stop: function () {
            _stopEventExecution = true;
        }
    };

    // Checks if the variable is undefine/null/empty
    function isNullOrEmpty(value) {
        return (value == undefined || value == "" || value.length == 0 || value == null);
    }

    // String parsing with arguments, replaces the argments within the string
    String.prototype.format = function () {
        var formatted = this;
        for (var i = 0; i < arguments.length; i++) {
            var regexp = new RegExp('\\{' + i + '\\}', 'gi');
            formatted = formatted.replace(regexp, arguments[i]);
        }
        return formatted;
    };

    // Shows the loader, also can set timeout
    function showLoader(timeOut) {
        document.getElementById("ichatbot-loader").style.visibility = "visible";

        if (timeOut != "") {
            setTimeout(() => {
                document.getElementById("ichatbot-loader").style.visibility = "hidden";
                document.getElementById("ichatbot-loader").scrollIntoView();
            }, timeOut);
        }
    }

    // Hides the loader
    function hideLoader() {
        document.getElementById("ichatbot-loader").style.visibility = "hidden";
        document.getElementById("ichatbot-loader").scrollIntoView();
    }

    // Display error message
    function showErrorMsg(msg) {
        document.getElementById("ichatbot-error-msg").innerHTML = msg;
    }

    // Formats long user text inputs, break down words by 25 characters
    function parseUserTextInput(userInput) {
        var result = "";
        var maxLength = 25;
        var numOfLines = Math.floor(userInput.length / maxLength);
        for (var i = 0; i < numOfLines + 1; i++) {
            result += userInput.substr(i * maxLength, maxLength);
            if (i !== numOfLines) { result += "\n"; }
        }
        return result;
    }

    // Initialize function is the starting point. Setting dataset, configurations and rendering popup template.
    function initialize(config, dataset, intialQueryID) {
        _gChatSession = new Array();
        _gConfig = config;
        _gDataset = dataset;

        validateConfiguration();

        renderHTMLTemplate();
        registerEvents();

        if (!isNullOrEmpty(intialQueryID)) {
            loadQuery(intialQueryID);
        }
        else if (!isNullOrEmpty(_gConfig.IntialQueryID)) {
            loadQuery(_gConfig.IntialQueryID);
        }
    }

    // Validates all the required and optional configurations
    function validateConfiguration() {

        // Errors : essential configurations
        if (isNullOrEmpty(_gConfig)) {
            console.error("iChatBot : configuration file/object not found");
        }
        if (isNullOrEmpty(_gDataset)) {
            console.error("iChatBot : dataset file/object not found");
        }
        if (isNullOrEmpty(_gConfig.FloatingIconFAClass) && isNullOrEmpty(_gConfig.FloatingIconImagePath)) {
            console.error("iChatBot : Set either FloatingIconFAClass or FloatingIconImagePath property");
        }
        if (isNullOrEmpty(_gConfig.ResetFAClass) && isNullOrEmpty(_gConfig.ResetImagePath)) {
            console.error("iChatBot : Set either ResetFAClass or ResetImagePath property");
        }
        if (isNullOrEmpty(_gConfig.CloseFAClass) && isNullOrEmpty(_gConfig.CloseImagePath)) {
            console.error("iChatBot : Set either CloseFAClass or CloseImagePath property");
        }
        if (isNullOrEmpty(_gConfig.LoaderCSSClass)) {
            console.error("iChatBot : LoaderCSSClass property cannot be null/undefined");
        }

        // Warnings : optional configuarations
        if (isNullOrEmpty(_gConfig.IntialQueryID)) {
            console.warn("iChatBot : IntialQueryID property is not set in config.");
        }
        if (isNullOrEmpty(_gConfig.ChatQueryIconFAClass) && isNullOrEmpty(_gConfig.ChatQueryIconImagePath)) {
            console.warn("iChatBot : Set either ChatQueryIconFAClass or ChatQueryIconImagePath property");
        }
        if (isNullOrEmpty(_gConfig.ChatUserInputIconFAClass) && isNullOrEmpty(_gConfig.ChatUserInputIconImagePath)) {
            console.warn("iChatBot : Set either ChatUserInputIconFAClass or ChatResponseIconImagePath property");
        }
        if (isNullOrEmpty(_gConfig.UserInputMinLen)) {
            console.warn("iChatBot : UserInputMinLen property is undefined or null");
        }
        if (isNullOrEmpty(_gConfig.UserInputMaxLen)) {
            console.warn("iChatBot : UserInputMaxLen property is undefined or null");
        }
        if (isNullOrEmpty(_gConfig.IChatBotCSSClass)) {
            console.warn("iChatBot : IChatBotCSSClass property is undefined or null");
        }
        if (isNullOrEmpty(_gConfig.Title)) {
            console.warn("iChatBot : Title property is undefined or null");
        }
        if (isNullOrEmpty(_gConfig.DisableSelectedButton)) {
            console.warn("iChatBot : DisableSelectedButton property is undefined or null");
        }
        if (isNullOrEmpty(_gConfig.iChatBotHeight)) {
            console.warn("iChatBot : iChatBotHeight property is undefined or null");
        }
        if (isNullOrEmpty(_gConfig.iChatBotWidth)) {
            console.warn("iChatBot : iChatBotWidth property is undefined or null");
        }
        if (isNullOrEmpty(_gConfig.iChatBotBackgroundColor)) {
            console.warn("iChatBot : iChatBotBackgroundColor property is undefined or null");
        }
        if (isNullOrEmpty(_gConfig.MessagesBackgroundColor)) {
            console.warn("iChatBot : MessagesBackgroundColor property is undefined or null");
        }
        if (isNullOrEmpty(_gConfig.ButtonCSSClass)) {
            console.warn("iChatBot : ButtonCSSClass property is undefined or null");
        }
        if (isNullOrEmpty(_gConfig.LinkCSSClass)) {
            console.warn("iChatBot : LinkCSSClass property is undefined or null");
        }
        if (isNullOrEmpty(_gConfig.FloatingIconImageCSSClass)) {
            console.warn("iChatBot : FloatingIconImageCSSClass property is undefined or null");
        }
        if (isNullOrEmpty(_gConfig.ResetCSSClass)) {
            console.warn("iChatBot : ResetCSSClass property is undefined or null");
        }
        if (isNullOrEmpty(_gConfig.CloseCSSClass)) {
            console.warn("iChatBot : CloseCSSClass property is undefined or null");
        }
        if (isNullOrEmpty(_gConfig.ChatQueryIconCSSClass)) {
            console.warn("iChatBot : ChatQueryIconCSSClass property is undefined or null");
        }
        if (isNullOrEmpty(_gConfig.ChatQueryCSSClass)) {
            console.warn("iChatBot : ChatQueryCSSClass property is undefined or null");
        }
        if (isNullOrEmpty(_gConfig.ChatUserInputIconCSSClass)) {
            console.warn("iChatBot : ChatUserInputIconCSSClass property is undefined or null");
        }
        if (isNullOrEmpty(_gConfig.ChatUserInputCSSClass)) {
            console.warn("iChatBot : ChatUserInputCSSClass property is undefined or null");
        }
        if (isNullOrEmpty(_gConfig.LoaderTimeout)) {
            console.warn("iChatBot : LoaderTimeout property is undefined or null, default will be set to 600");
        }
        if (isNullOrEmpty(_gConfig.SearchNotFoundMsg)) {
            console.warn("iChatBot : SearchNotFoundMsg property is undefined or null, default will be set to 'Keyword Not Found!!'");
        }
        if (isNullOrEmpty(_gConfig.resetChatHistoryOnReset)) {
            console.warn("iChatBot : resetChatHistoryOnReset property is undefined or null, default will be set to false");
        }
        if (isNullOrEmpty(_gConfig.resetChatHistoryOnClose)) {
            console.warn("iChatBot : resetChatHistoryOnClose property is undefined or null, default will be set to false");
        }
        if (isNullOrEmpty(_gConfig.FloatingIconCSSClass)) {
            console.warn("iChatBot : FloatingIconCSSClass property is undefined or null");
        }
        if (isNullOrEmpty(_gConfig.TitleIconFAClass) && isNullOrEmpty(_gConfig.TitleImagePath)) {
            console.warn("iChatBot : Set either TitleIconFAClass or TitleImagePath property");
        }
    }

    // Returns query template html
    function createQueryTemplate() {
        var chatQueryIcon;

        // Picks either the FA user icon, or Image user icon for chat messages. 
        if (!isNullOrEmpty(_gConfig.ChatQueryIconFAClass)) {
            chatQueryIcon = "<i class='" + _gConfig.ChatQueryIconFAClass + "'></i>";
        }
        else if (!isNullOrEmpty(_gConfig.ChatQueryIconImagePath)) {
            var cssClass = (!isNullOrEmpty(_gConfig.ChatQueryIconCSSClass)) ? "class='" + _gConfig.ChatQueryIconCSSClass + "'" : "";
            chatQueryIcon = "<img decoding  src='" + _gConfig.ChatQueryIconImagePath + "' " + cssClass + "></img>  ";
        }

        return "<div class='d-flex justify-content-start mar-top-bottom-5px'>" +
            chatQueryIcon +
            "<span id='{0}' class='{1}'>{2}</span>" +
            "</div>" +
            "<div id='ichatbot-options' class='ichatbot-options'>{3}</div>" +
            "</div>";
    }

    // Renders ichatbot html template into user created element #ichatbot-div  
    function renderHTMLTemplate() {

        // chatbot height, width and background color
        var ichatbotStyle = "style='background-color:" + _gConfig.iChatBotBackgroundColor + ";' ";
        var ichatbotMessageStyle = "style='background-color:" + _gConfig.MessagesBackgroundColor + " ;height:" +
            _gConfig.iChatBotHeight + ";width:" + _gConfig.iChatBotWidth + ";' ";

        var floatingIcon = "";
        var resetIcon = "";
        var closeIcon = "";
        var titleIcon = "";

        // Floating icon
        if (!isNullOrEmpty(_gConfig.FloatingIconFAClass)) {
            floatingIcon = " <i onclick ='iChatBot.openChatBot(true)' class='" + _gConfig.FloatingIconFAClass + "'></i> ";;
        }
        else if (!isNullOrEmpty(_gConfig.FloatingIconImagePath)) {
            var cssClass = (!isNullOrEmpty(_gConfig.FloatingIconImageCSSClass)) ? "class='" + _gConfig.FloatingIconImageCSSClass + "'" : "";
            floatingIcon = "<img onclick ='iChatBot.openChatBot(true)' src='" + _gConfig.FloatingIconImagePath + "' " + cssClass + "></img>";
        }

        // Reset icon
        if (!isNullOrEmpty(_gConfig.ResetFAClass)) {
            resetIcon = "<i onclick ='iChatBot.resetChat()' class='" + _gConfig.ResetFAClass + "' title='Reset'></i> ";
        }
        else if (!isNullOrEmpty(_gConfig.ResetImagePath)) {
            var cssClass = (!isNullOrEmpty(_gConfig.ResetCSSClass)) ? "class='" + _gConfig.ResetCSSClass + "'" : "";
            resetIcon = "<img onclick='iChatBot.resetChat()' src='" + _gConfig.ResetImagePath + "' " + cssClass + "></img>";
        }

        // Close icon
        if (!isNullOrEmpty(_gConfig.CloseFAClass)) {
            closeIcon = " <i onclick ='iChatBot.closeChatBot()' class='" + _gConfig.CloseFAClass + "' title='Close'></i> ";;
        }
        else if (!isNullOrEmpty(_gConfig.CloseImagePath)) {
            var cssClass = (!isNullOrEmpty(_gConfig.CloseCSSClass)) ? "class='" + _gConfig.CloseCSSClass + "'" : "";
            closeIcon = "<img onclick ='iChatBot.closeChatBot()' src='" + _gConfig.CloseImagePath + "' " + cssClass + "></img>";
        }

        // title icon
        if (!isNullOrEmpty(_gConfig.TitleIconFAClass)) {
            titleIcon = " <i class='" + _gConfig.TitleIconFAClass + "'></i> ";;
        }
        else if (!isNullOrEmpty(_gConfig.TitleImagePath)) {
            var cssClass = (!isNullOrEmpty(_gConfig.TitleImageCSSClass)) ? "class='" + _gConfig.TitleImageCSSClass + "'" : "";
            titleIcon = "<img src='" + _gConfig.TitleImagePath + "' " + cssClass + "></img>";
        }

        // Chatbot template along with floating icon
        var htmlTemplate =
            "<div id='ichatbot' class='ichatbot " + _gConfig.IChatBotCSSClass + "' " + ichatbotStyle + ">" +
            "<div class='ichatbot-header'>" +
            "<div class='float-start'>" +
            titleIcon +
            "<span id='ichatbot-title-head' class='" + _gConfig.TitleCSSClass + "'>" + _gConfig.Title + "</span>" +
            "</div>" +
            "<div class='float-end' id='header-right-icons'>" +
            "<a href='#' id='ichatbot-reset'>" + resetIcon + "</a>" +
            "<a href='#' id='ichatbot-close'>" + closeIcon + "</a>" +
            "</div>" +
            "</div>" +
            "<div class='ichatbot-container'>" +
            "<div id='ichatbot-chat' class='ichatbot-chat'>" +
            "<div id='ichatbot-chat-inner-div' " + ichatbotMessageStyle + " class='ichatbot-chat-inner-div'>" + "<div></div>" +
            "<div id='ichatbot-loader' class='d-flex justify-content-center' style='visibility: hidden;'>" +
            "<div class='" + _gConfig.LoaderCSSClass + "'></div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "<div class='ichatbot-footer'>" +
            "<span id='ichatbot-error-msg' class='float-start display-contents " + _gConfig.ErrorMessageCSSClass + "'></span>" +
            "<div id='ichatbot-char-count' class='ichatbot-char-count float-end'>" +
            "0/" + _gConfig.UserInputMaxLen + "</div>" +
            "<input id='ichatbot-userinput' type='text' class='ichatbot-userinput' disabled " +
            "minlength='" + _gConfig.UserInputMinLen + "' maxlength='" + _gConfig.UserInputMaxLen + "' " +
            "autocomplete='off'> " +
            "</div>" +
            "</div>" +
            "<a href='#' id='ichatbot-floating-Icon' class='ichatbot-floating-icon " + _gConfig.FloatingIconCSSClass + "'>" + floatingIcon + "</a>";

        document.getElementById("ichatbot-div").innerHTML = htmlTemplate;
    }

    // Handling user text input and user option button click events
    function registerEvents() {

        document.getElementById("ichatbot-userinput")
            .addEventListener("keydown", function (e) {

                // This will prevent opening on file upload on enter
                if (e.code === "Enter" || e.code === "NumpadEnter") {
                    e.preventDefault();
                }
            });

        // Event for handling user text input on enter/numpad enter keys
        document.getElementById("ichatbot-userinput")
            .addEventListener("keyup", function (e) {

                var minLength = e.target.minLength;
                var charCount = e.target.value.length;

                // Validation check
                e.target.classList.remove('ichatbot-userinput-error');
                showErrorMsg("");

                if (e.target.type.toLowerCase() == "text") {

                    document.getElementById("ichatbot-char-count").innerHTML = e.target.value.length + '/' + e.target.maxLength;

                    if (!isNullOrEmpty(_gRecentQuery.Validation)) {
                        if (!new RegExp(_gRecentQuery.Validation).test(e.target.value)) {
                            e.target.classList.add('ichatbot-userinput-error');
                            showErrorMsg(_gRecentQuery.ValidationErrorMsg);
                            return;
                        }
                    }
                    else if (charCount < minLength) {
                        e.target.classList.add('ichatbot-userinput-error');
                        return;
                    }
                }

                if (e.code === "Enter" || e.code === "NumpadEnter") {

                    console.log(e.keyCode);

                    //Checking if the input type is textbox
                    if (e.target.type.toLowerCase() == "text") {

                        var input = e.target.value;
                        e.target.disabled = true;
                        e.target.value = "";

                        document.getElementById("ichatbot-char-count").innerHTML = "0/" + e.target.maxLength;

                        userTextInputDisplay(input);
                        _gChatSession.push({ "UserTextInput": input });

                        if (_gRecentQuery.SearchInQueries == false) {

                            if (_gRecentQuery.FireSubscribedEvent == true) {
                                fireUserTextEvent();
                            }
                            if (!isNullOrEmpty(_gRecentQuery.QueryID)) {
                                loadQuery(_gRecentQuery.QueryID);
                            }
                        }
                        else {
                            stopEventExecutionFun.searchFailed = true;
                            _stopEventExecution = false;

                            for (var i = 0; i <= _gDataset.Queries.length - 1; i++) {
                                if (!isNullOrEmpty(_gDataset.Queries[i].SearchKeywords)) {
                                    if (_gDataset.Queries[i].SearchKeywords.toLowerCase().search(input.toLowerCase()) == 0) {
                                        if (_gRecentQuery.FireSubscribedEvent == true) {
                                            stopEventExecutionFun.searchFailed = false;
                                            fireUserTextEvent();
                                        }
                                        loadQuery(_gDataset.Queries[i].ID);
                                        break;
                                    }
                                }
                            }

                            // if keyword not found as part of search in queries
                            if (stopEventExecutionFun.searchFailed) {

                                if (_gRecentQuery.FireSubscribedEvent == true) {
                                    fireUserTextEvent();
                                }

                                if (_stopEventExecution) {
                                    return;
                                }

                                loadQuery(simpleQuery(isNullOrEmpty(_gConfig.SearchNotFoundMsg) ? "Keyword not found!!" : _gConfig.SearchNotFoundMsg));
                                document.getElementById("ichatbot-userinput").focus();

                                if (!isNullOrEmpty(_gRecentQuery.QueryID)) {
                                    loadQuery(_gRecentQuery.QueryID);
                                }
                                else {
                                    loadQuery(_gRecentQuery.ID);
                                }
                            }
                        }
                    }

                    //Checking if the input type is file
                    if (e.target.type.toLowerCase() == "file") {
                        if (e.target.files.length > 0) {

                            var fileNames = "";
                            for (var i = 0; i < e.target.files.length; i++) {
                                fileNames += e.target.files[i].name + ',';

                                // Validating file extension
                                if (!isNullOrEmpty(_gRecentQuery.Validation)) {
                                    if (_gRecentQuery.Validation.toLowerCase().search(e.target.files[i].name.split('.').pop().toLowerCase()) == -1) {
                                        showErrorMsg(!isNullOrEmpty(_gRecentQuery.ValidationErrorMsg) ? _gRecentQuery.ValidationErrorMsg : _gRecentQuery.Validation + " are allowed");
                                        return;
                                    }
                                }
                            }

                            _gChatSession.push({ "files Uploaded": fileNames.slice(0, -1) });

                            // Makes sure events are fired only when FireSubscribedEvent propert is true. 
                            if (_gRecentQuery.FireSubscribedEvent == true) {
                                fireFileUploadEvent(e.target.files);
                            }

                            e.target.type = "text";
                            e.target.disabled = true;
                            e.target.value = "";
                        }
                    }
                }
            });

        // Event for handling user selected button
        document.getElementById("ichatbot")
            .addEventListener("click", function (e) {

                // This is for file upload enter key to work
                document.getElementById("ichatbot-userinput").focus();

                if (e.target.classList.contains('ichatbotbtn')) {

                    if (!isNullOrEmpty(e.target.attributes.id)) {

                        var SelectedID = e.target.attributes.id.value;
                        var option = _gDataset.Options.find((x) => x.ID == SelectedID);

                        _gChatSession.push({ "Selected Option": option });

                        // Makes sure events are fired only when FireSubscribedEvent propert is true
                        if (option != null && !isNullOrEmpty(option.FireSubscribedEvent) && option.FireSubscribedEvent == true) {
                            fireUserButtonClickEvent();
                        }

                        if (!isNullOrEmpty(option.Query)) {
                            loadQuery(option.Query)
                        }
                    }
                }
            });
    }

    // Loads a query with options and add to chatbot
    function loadQuery(id) {

        if (isNullOrEmpty(id)) {
            return;
        }

        document.getElementById("ichatbot-loader").style.visibility = "visible";

        // Disabling the selected clickable buttons
        if (!isNullOrEmpty(_gConfig.DisableSelectedButton)) {
            if (_gConfig.DisableSelectedButton == true) {

                var clickableButtons = document.getElementsByClassName("ichatbotbtn");

                if (clickableButtons != null) {
                    for (var i = 0; i < clickableButtons.length; i++) {
                        clickableButtons[i].classList.add("ichatbot-disabled-buttons");
                    }
                }
            }
        }

        var query = _gDataset.Queries.find(x => x.ID == id);
        var queryText = query.Query;

        _gChatSession.push({ "Query": query });

        document.getElementById("ichatbot-userinput").disabled = true;
        document.getElementById("ichatbot-userinput").multiple = false;
        document.getElementById("ichatbot-userinput").type = "text";

        if (query.Type.toLowerCase() == "text") {
            document.getElementById("ichatbot-userinput").disabled = false;
            document.getElementById("ichatbot-userinput").focus();
        }
        else if (query.Type.toLowerCase() == "file" || query.Type.toLowerCase() == "multiplefiles") {
            document.getElementById("ichatbot-userinput").focus();
            document.getElementById("ichatbot-userinput").disabled = false;
            document.getElementById("ichatbot-userinput").type = "file";
            document.getElementById("ichatbot-userinput").accept = !isNullOrEmpty(query.Validation) ? query.Validation : "";

            if (query.Type.toLowerCase() == "multiplefiles") {
                document.getElementById("ichatbot-userinput").multiple = true;
            }
        }

        // The templates that generates Buttons, Link.
        var buttonTemplate = "<span id='{0}' class='" + _gConfig.ButtonCSSClass + " ichatbotbtn' type='button'>{1}</span>";
        var linkTemplate = "<a href='{0}' target='_blank' class='" + _gConfig.LinkCSSClass + "'>{1}</a>";

        var templateGenerated = '';

        // Are being sent to a format function, to be parsed correctly. 
        if (!isNullOrEmpty(query.Options)) {

            var optionIDS = query.Options.split(',');

            //This block here checks for Query 'type', the Button and Link types.
            optionIDS.forEach(element => {
                var option = _gDataset.Options.find(x => x.ID == element);
                if (option.Type.toLowerCase() == "button") {
                    templateGenerated += buttonTemplate.format(element, option.Text);
                }
                else if (option.Type.toLowerCase() == "link") {
                    templateGenerated += linkTemplate.format(option.URL, !isNullOrEmpty(option.Text) ? option.Text : "link");
                }
            });
        }

        // Template for Chat query
        var chatTemplate = createQueryTemplate();

        setTimeout(() => {
            document.getElementById("ichatbot-loader").style.visibility = "hidden";
            document.getElementById("ichatbot-chat-inner-div").getElementsByTagName("div")[0].innerHTML +=
                chatTemplate.format(query.ID, _gConfig.ChatQueryCSSClass, queryText, templateGenerated);
            document.getElementById("ichatbot-loader").scrollIntoView();
        }, isNullOrEmpty(_gConfig.LoaderTimeout) ? 600 : _gConfig.LoaderTimeout);

        _gRecentQuery = query;

        // Loading next query in recursive way
        if (!isNullOrEmpty(query.QueryID)) {
            if (query.SearchInQueries == false && query.Type == "") {
                loadQuery(query.QueryID);
            }
        }
    }

    // This function will add a query will message, it will not have any options
    // This function can be called by user code for displaying custom messages to end user
    function simpleQuery(message) {
        document.getElementById("ichatbot-loader").style.visibility = "visible";

        // Template for Chat query
        var chatTemplate = createQueryTemplate();

        setTimeout(() => {
            document.getElementById("ichatbot-loader").style.visibility = "hidden";
            document.getElementById("ichatbot-chat-inner-div").getElementsByTagName("div")[0].innerHTML +=
                chatTemplate.format(null, _gConfig.ChatQueryCSSClass, message, "");
            document.getElementById("ichatbot-loader").scrollIntoView();
        }, isNullOrEmpty(_gConfig.LoaderTimeout) ? 600 : _gConfig.LoaderTimeout);

        _gChatSession.push({ "simpleQuery": message });
    }

    // Function for creating UserText input template and adding it to chat
    function userTextInputDisplay(userInput) {
        var parsedInput = parseUserTextInput(userInput);
        var chatUserInputIcon = "";

        // Picks either the FA icon, or Image for chat user text input template
        if (!isNullOrEmpty(_gConfig.ChatUserInputIconFAClass)) {
            chatUserInputIcon = "<i class='" + _gConfig.ChatUserInputIconFAClass + "'></i>";
        }
        else if (!isNullOrEmpty(_gConfig.ChatUserInputIconImagePath)) {
            var cssClass = (!isNullOrEmpty(_gConfig.ChatUserInputIconCSSClass)) ? "class='" + _gConfig.ChatUserInputIconCSSClass + "'" : "";
            chatUserInputIcon = "<img decoding  src='" + _gConfig.ChatUserInputIconImagePath + "' " + cssClass + "></img>  ";
        }

        // Template for user input
        var userInputTemplate = "<div class='ichatbot-userinput-template mar-top-bottom-5px'>" +
            "<div class='d-flex justify-content-end'>" +
            "<span class='" + _gConfig.ChatUserInputCSSClass + "'>{0}</span>" +
            chatUserInputIcon +
            "</div>";

        document.getElementById("ichatbot-chat-inner-div").getElementsByTagName("div")[0].innerHTML +=
            userInputTemplate.format(parsedInput);
        document.getElementById("ichatbot-loader").scrollIntoView();
    }

    // Function that Resets chat
    function resetChat() {
        document.getElementById("ichatbot-chat-inner-div").getElementsByTagName("div")[0].innerHTML = "";
        document.getElementById("ichatbot-char-count").innerHTML = "0/" + _gConfig.UserInputMaxLen;
        document.getElementById("ichatbot-error-msg").innerHTML = "";
        document.getElementById("ichatbot-userinput").value = '';
        document.getElementById("ichatbot-userinput").classList.remove('ichatbot-userinput-error');

        _gChatSession.push({ "Reset": "UserReset" });

        // Clearing chatsession if resetChatHistoryOnReset is true
        if (!isNullOrEmpty(_gConfig.resetChatHistoryOnReset)) {
            if (_gConfig.resetChatHistoryOnReset == true) {
                _gChatSession = [];
            }
        }

        loadQuery(_gConfig.IntialQueryID);
        fireChatResetEvent();
    }

    // Function that closes chat
    function closeChatBot() {
        document.getElementById('ichatbot').classList.remove("ichatbot-show");

        _gChatSession.push({ "Close": "UserClose" });

        // Clearing chatsession if resetChatHistoryOnClose is true
        if (!isNullOrEmpty(_gConfig.resetChatHistoryOnClose)) {
            if (_gConfig.resetChatHistoryOnClose == true) {
                document.getElementById("ichatbot-chat-inner-div").getElementsByTagName("div")[0].innerHTML = "";
                document.getElementById("ichatbot-error-msg").innerHTML = "";
                document.getElementById("ichatbot-char-count").innerHTML = "0/" + _gConfig.UserInputMaxLen;;
                document.getElementById("ichatbot-userinput").value = '';
                document.getElementById("ichatbot-userinput").classList.remove('ichatbot-userinput-error');

                _gChatSession = [];

                loadQuery(_gConfig.IntialQueryID);
            }
        }

        fireChatCloseEvent();
    }

    // Function that open and close chat without user clicking the floating icon
    function openChatBot() {
        document.getElementById('ichatbot').classList.add("ichatbot-show");
    }

    // Setting the user passedd functions to event handlers
    function subscribeEvent(userTextEvent, buttonClickEvent, chatResetEvent, chatCloseEvent, fileUploadEvent) {
        _userTextEvent = userTextEvent;
        _chatButtonClickEvent = buttonClickEvent;
        _chatResetEvent = chatResetEvent;
        _chatCloseEvent = chatCloseEvent;
        _fileUploadEvent = fileUploadEvent;
    }

    function fireUserTextEvent() {
        if (!isNullOrEmpty(_userTextEvent)) {
            _userTextEvent(_gChatSession, stopEventExecutionFun);
        }
    }

    function fireChatResetEvent() {
        if (!isNullOrEmpty(_chatResetEvent)) {
            _chatResetEvent(_gChatSession);
        }
    }

    function fireChatCloseEvent() {
        if (!isNullOrEmpty(_chatCloseEvent)) {
            _chatCloseEvent(_gChatSession);
        }
    }

    function fireUserButtonClickEvent() {
        if (!isNullOrEmpty(_chatButtonClickEvent)) {
            _chatButtonClickEvent(_gChatSession);
        }
    }

    function fireFileUploadEvent(e) {
        if (!isNullOrEmpty(_fileUploadEvent)) {
            _fileUploadEvent(e, _gChatSession);
        }
    }

    function getChatSession() {
        return _gChatSession;
    }

    return {
        initialize: initialize,
        loadQuery: loadQuery,
        openChatBot: openChatBot,
        resetChat: resetChat,
        closeChatBot: closeChatBot,
        subscribeEvent: subscribeEvent,
        simpleQuery: simpleQuery,
        getChatSession: getChatSession,
        showLoader: showLoader,
        hideLoader: hideLoader,
        showErrorMsg: showErrorMsg
    }
})();