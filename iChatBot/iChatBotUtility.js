// iChatbot Utility
var iChatBotUtility = (function () {

    // Global variables
    var _gConfig = null;
    var _gDataset = null;
    var _gChatSession = new Array();
    var _regexPattern = null;

    // Event handlers
    var _userTextEvent = null;
    var _chatCloseEvent = null;
    var _chatResetEvent = null;
    var _chatButtonClickEvent = null;
    var _fileUploadEvent = null;

    // Checks if the variable is undefine/null/empty
    var isNullOrEmptyFun = function IsNullOrEmpty(value) {
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
    var showLoaderFun = function showLoader(timeOut) {
        document.getElementById("ichatbot-loader").style.visibility = "visible";

        if (timeOut != "") {
            setTimeout(() => {
                document.getElementById("ichatbot-loader").style.visibility = "hidden";
                document.getElementById("ichatbot-loader").scrollIntoView();
            }, timeOut);
        }
    }

    // Hides the loader
    var hideLoaderFun = function hideLoader() {
        document.getElementById("ichatbot-loader").style.visibility = "hidden";
        document.getElementById("ichatbot-loader").scrollIntoView();
    }

    // Formats long user text inputs, break down words by 25 characters
    var parseUserTextInputFun = function ParseUserTextInput(userInput) {
        var result = "";
        var maxLength = 25;
        var numOfLines = Math.floor(userInput.length / maxLength);
        for (var i = 0; i < numOfLines + 1; i++) {
            result += userInput.substr(i * maxLength, maxLength);
            if (i !== numOfLines) { result += "\n"; }
        }
        return result;
    }

    var validateUserTextInputFun = function ValidateUserTextInput(e) {
        var minLength = e.target.minLength;
        var charCount = e.target.value.length;

        if (!isNullOrEmptyFun(_regexPattern)) {
            if (!_regexPattern.test(e.target.value)) {
                e.target.classList.add('ichatbot-userinput-error');
                return false;
            }
            else {
                e.target.classList.remove('ichatbot-userinput-error');
                return true;
            }
        }

        if (charCount < minLength) {
            e.target.classList.add('ichatbot-userinput-error');
            return false;
        }
        else {
            e.target.classList.remove('ichatbot-userinput-error');
            return true;
        }
    }

    // Initialize function is the starting point. Setting dataset, configurations and rendering popup template.
    var intializeFun = function Initialize(config, dataset) {
        _gConfig = config;
        _gDataset = dataset;

        validateConfigFun();

        renderHTMLTemplateFun();
        registerEventsFun();

        loadQueryFun(_gConfig.IntialQueryID);
    }

    // Validates all the required and optional configurations
    var validateConfigFun = function ValidateConfiguration() {

        // Errors : essential configurations
        if (isNullOrEmptyFun(_gConfig)) {
            console.error("iChatBot : configuration file/object not found");
        }
        if (isNullOrEmptyFun(_gDataset)) {
            console.error("iChatBot : dataset file/object not found");
        }
        if (isNullOrEmptyFun(_gConfig.IntialQueryID)) {
            console.error("iChatBot : IntialQueryID property cannot be null/undefined");
        }
        if (isNullOrEmptyFun(_gConfig.FloatingIconFAClass) && isNullOrEmptyFun(_gConfig.FloatingIconImagePath)) {
            console.error("iChatBot : Set either FloatingIconFAClass or FloatingIconImagePath property");
        }
        if (isNullOrEmptyFun(_gConfig.ResetFAClass) && isNullOrEmptyFun(_gConfig.ResetImagePath)) {
            console.error("iChatBot : Set either ResetFAClass or ResetImagePath property");
        }
        if (isNullOrEmptyFun(_gConfig.CloseFAClass) && isNullOrEmptyFun(_gConfig.CloseImagePath)) {
            console.error("iChatBot : Set either CloseFAClass or CloseImagePath property");
        }
        if (isNullOrEmptyFun(_gConfig.ChatQueryIconFAClass) && isNullOrEmptyFun(_gConfig.ChatQueryIconImagePath)) {
            console.error("iChatBot : Set either ChatQueryIconFAClass or ChatQueryIconImagePath property");
        }
        if (isNullOrEmptyFun(_gConfig.ChatUserInputIconFAClass) && isNullOrEmptyFun(_gConfig.ChatUserInputIconImagePath)) {
            console.error("iChatBot : Set either ChatUserInputIconFAClass or ChatResponseIconImagePath property");
        }
        if (isNullOrEmptyFun(_gConfig.LoaderCSSClass)) {
            console.error("iChatBot : LoaderCSSClass property cannot be null/undefined");
        }

        // Warnings : optional configuarations
        if (isNullOrEmptyFun(_gConfig.UserInputMinLen)) {
            console.warn("iChatBot : UserInputMinLen property is undefined or null");
        }
        if (isNullOrEmptyFun(_gConfig.UserInputMaxLen)) {
            console.warn("iChatBot : UserInputMaxLen property is undefined or null");
        }
        if (isNullOrEmptyFun(_gConfig.Title)) {
            console.warn("iChatBot : Title property is undefined or null");
        }
        if (isNullOrEmptyFun(_gConfig.DisableSelectedButton)) {
            console.warn("iChatBot : DisableSelectedButton property is undefined or null");
        }
        if (isNullOrEmptyFun(_gConfig.iChatBotHeight)) {
            console.warn("iChatBot : iChatBotHeight property is undefined or null");
        }
        if (isNullOrEmptyFun(_gConfig.iChatBotWidth)) {
            console.warn("iChatBot : iChatBotWidth property is undefined or null");
        }
        if (isNullOrEmptyFun(_gConfig.iChatBotBackgroundColor)) {
            console.warn("iChatBot : iChatBotBackgroundColor property is undefined or null");
        }
        if (isNullOrEmptyFun(_gConfig.MessagesBackgroundColor)) {
            console.warn("iChatBot : MessagesBackgroundColor property is undefined or null");
        }
        if (isNullOrEmptyFun(_gConfig.ButtonCSSClass)) {
            console.warn("iChatBot : ButtonCSSClass property is undefined or null");
        }
        if (isNullOrEmptyFun(_gConfig.LinkCSSClass)) {
            console.warn("iChatBot : LinkCSSClass property is undefined or null");
        }
        if (isNullOrEmptyFun(_gConfig.FloatingIconImageCSSClass)) {
            console.warn("iChatBot : FloatingIconImageCSSClass property is undefined or null");
        }
        if (isNullOrEmptyFun(_gConfig.ResetCSSClass)) {
            console.warn("iChatBot : ResetCSSClass property is undefined or null");
        }
        if (isNullOrEmptyFun(_gConfig.CloseCSSClass)) {
            console.warn("iChatBot : CloseCSSClass property is undefined or null");
        }
        if (isNullOrEmptyFun(_gConfig.ChatQueryIconCSSClass)) {
            console.warn("iChatBot : ChatQueryIconCSSClass property is undefined or null");
        }
        if (isNullOrEmptyFun(_gConfig.ChatQueryCSSClass)) {
            console.warn("iChatBot : ChatQueryCSSClass property is undefined or null");
        }
        if (isNullOrEmptyFun(_gConfig.ChatUserInputIconCSSClass)) {
            console.warn("iChatBot : ChatUserInputIconCSSClass property is undefined or null");
        }
        if (isNullOrEmptyFun(_gConfig.ChatUserInputCSSClass)) {
            console.warn("iChatBot : ChatUserInputCSSClass property is undefined or null");
        }
        if (isNullOrEmptyFun(_gConfig.LoaderTimeout)) {
            console.warn("iChatBot : LoaderTimeout property is undefined or null, default will be set to 600");
        }
        if (isNullOrEmptyFun(_gConfig.SearchNotFoundMsg)) {
            console.warn("iChatBot : SearchNotFoundMsg property is undefined or null, default will be set to 'Keyword Not Found!!'");
        }
        if (isNullOrEmptyFun(_gConfig.ResetChatHistoryOnReset)) {
            console.warn("iChatBot : ResetChatHistoryOnReset property is undefined or null, default will be set to false");
        }
        if (isNullOrEmptyFun(_gConfig.ResetChatHistoryOnClose)) {
            console.warn("iChatBot : ResetChatHistoryOnClose property is undefined or null, default will be set to false");
        }
        if (isNullOrEmptyFun(_gConfig.FloatingIconCSSClass)) {
            console.warn("iChatBot : FloatingIconCSSClass property is undefined or null");
        }
    }

    // Returns query template html
    var createQueryTemplateFun = function createQueryTemplate() {
        var chatQueryIcon;

        // Picks either the FA user icon, or Image user icon for chat messages. 
        if (!isNullOrEmptyFun(_gConfig.ChatQueryIconFAClass)) {
            chatQueryIcon = "<i class='" + _gConfig.ChatQueryIconFAClass + "'></i>";
        }
        else if (!isNullOrEmptyFun(_gConfig.ChatQueryIconImagePath)) {
            var cssClass = (!isNullOrEmptyFun(_gConfig.ChatQueryIconCSSClass)) ? "class='" + _gConfig.ChatQueryIconCSSClass + "'" : "";
            chatQueryIcon = "<img decoding  src='" + _gConfig.ChatQueryIconImagePath + "' class='" + cssClass + "'></img>  ";
        }

        return "<div class='d-flex justify-content-start mar-top-bottom-5px'>" +
            chatQueryIcon +
            "<span id='{0}' class='{1}'>{2}</span>" +
            "</div>" +
            "<div id='ichatbot-options' class='ichatbot-options'>{3}</div>" +
            "</div>";
    }

    // Renders ichatbot html template into user created element #ichatbot-div  
    var renderHTMLTemplateFun = function RenderHTMLTemplate() {

        // chatbot height, width and background color
        var ichatbotStyle = "style='background-color:" + _gConfig.iChatBotBackgroundColor + ";' ";
        var ichatbotMessageStyle = "style='background-color:" + _gConfig.MessagesBackgroundColor + " ;height:" +
            _gConfig.iChatBotHeight + ";width:" + _gConfig.iChatBotWidth + ";' ";

        var floatingIcon = "";
        var resetIcon = "";
        var closeIcon = "";

        // Floating icon
        if (!isNullOrEmptyFun(_gConfig.FloatingIconFAClass)) {
            floatingIcon = " <i onclick ='iChatBotUtility.ShowChat(true)' class='" + _gConfig.FloatingIconFAClass + "'></i> ";;
        }
        else if (!isNullOrEmptyFun(_gConfig.FloatingIconImagePath)) {
            var cssClass = (!isNullOrEmptyFun(_gConfig.FloatingIconImageCSSClass)) ? "class='" + _gConfig.FloatingIconImageCSSClass + "'" : "";
            floatingIcon = "<img onclick ='iChatBotUtility.ShowChat(true)' src='" + _gConfig.FloatingIconImagePath + "' " + cssClass + "></img>";
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
            "<div id='ichatbot' class='ichatbot' " + ichatbotStyle + ">" +
            "<div class='ichatbot-header'>" +
            "<div class='float-start'>" +
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
            "<div id='ichatbot-loader' class='d-flex justify-content-center'>" +
            "<div class='" + _gConfig.LoaderCSSClass + "'></div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "<div class='ichatbot-footer'>" +
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
    var registerEventsFun = function RegisterEvents() {

        // Event for handling user text input on enter/numpad enter keys
        document.getElementById("ichatbot-userinput")
            .addEventListener("keydown", function (e) {

                if (e.code === "Enter" || e.code === "NumpadEnter") {

                    //Retriving queryID from _ChatSession
                    var queryID = "";

                    for (var i = _gChatSession.length - 1; i >= 0; i--) {
                        if (!isNullOrEmptyFun(_gChatSession[i].Query)) {
                            if (!isNullOrEmptyFun(_gChatSession[i].Query.ID)) {
                                queryID = _gChatSession[i].Query.ID;
                                break;
                            }
                        }
                    }

                    var query = _gDataset.Queries.find(x => x.ID == queryID);

                    //Checking if the input type is textbox
                    if (e.target.type == "text") {

                        if (validateUserTextInputFun(e)) {
                            var input = e.target.value;
                            var charCount = e.target.value.length;
                            var minLength = e.target.minLength;

                            e.target.disabled = true;
                            e.target.value = "";

                            e.target.classList.remove('ichatbot-userinput-error');

                            userTextInputDisplayFun(input);
                            _gChatSession.push({ "UserTextInput": input });

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
                                        loadQueryFun(simpleQueryFun(isNullOrEmptyFun(_gConfig.SearchNotFoundMsg) ? "Keyword not found!!" : _gConfig.SearchNotFoundMsg));
                                        loadQueryFun(query.ID);
                                    }
                                }
                            }

                            // Makes sure events are fired only when FireSubscribedEvent propert is true. 
                            if (query.FireSubscribedEvent == true) {
                                fireUserTextEventFun();
                            }

                            document.getElementById("ichatbot-char-count").innerHTML = "0/" + e.target.maxLength;
                        }
                    }

                    //Checking if the input type is file
                    if (e.target.type == "file") {
                        if (e.target.files.length > 0) {
                            // Makes sure events are fired only when FireSubscribedEvent propert is true. 
                            if (query.FireSubscribedEvent == true) {
                                fireFileUploadEventFun(e.target.files);

                                var fileNames = "";
                                for (var i = 0; i < e.target.files.length; i++) {
                                    fileNames += e.target.files[i].name + ',';
                                }

                                _gChatSession.push({ "files Uploaded": fileNames.slice(0, -1) });

                                e.target.type = "text";
                                e.target.disabled = true;
                                e.target.value = "";
                            }
                        }
                    }
                }
            });

        // Event for handling the character count
        document.getElementById("ichatbot-userinput")
            .addEventListener("keyup", function (e) {

                if (e.target.type == "text") {
                    validateUserTextInputFun(e);

                    document.getElementById("ichatbot-char-count").innerHTML = e.target.value.length + '/' + e.target.maxLength;
                }
            });

        // Event for handling user selected button
        document.getElementById("ichatbot")
            .addEventListener("click", function (e) {

                document.getElementById("ichatbot-userinput").focus();

                if (e.target.classList.contains('ichatbotbtn')) {

                    if (!isNullOrEmptyFun(e.target.attributes.id)) {

                        var SelectedID = e.target.attributes.id.value;
                        var option = _gDataset.Options.find((x) => x.ID == SelectedID);

                        _gChatSession.push({ "Selected Option": option });

                        if (!isNullOrEmptyFun(option.Query)) {
                            loadQueryFun(option.Query)
                        }

                        // Makes sure events are fired only when FireSubscribedEvent propert is true
                        if (option != null && !isNullOrEmptyFun(option.FireSubscribedEvent) && option.FireSubscribedEvent == true) {
                            fireUserButtonClickEventFun();
                        }
                    }
                }
            });
    }

    // Loads a query with options and add to chatbot
    var loadQueryFun = function LoadQuery(id) {

        if (isNullOrEmptyFun(id)) {
            return;
        }

        document.getElementById("ichatbot-loader").style.visibility = "visible";

        // Disabling the selected clickable buttons
        if (!isNullOrEmptyFun(_gConfig.DisableSelectedButton)) {
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

        _regexPattern = "";

        if (query.Type == "Text") {
            document.getElementById("ichatbot-userinput").disabled = false;
            _regexPattern = !isNullOrEmptyFun(query.Regex) ? new RegExp(query.Regex) : "";
        }
        else if (query.Type == "File" || query.Type == "MultipleFiles") {
            document.getElementById("ichatbot-userinput").disabled = false;
            document.getElementById("ichatbot-userinput").type = "file";

            if (query.Type == "MultipleFiles") {
                document.getElementById("ichatbot-userinput").multiple = true;
            }
        }

        // The templates that generates Buttons, Link.
        var buttonTemplate = "<span id='{0}' class='" + _gConfig.ButtonCSSClass + " ichatbotbtn' type='button'>{1}</span>";
        var linkTemplate = "<a href='{0}' target='_blank' class='" + _gConfig.LinkCSSClass + "'>{1}</a>";

        var templateGenerated = '';

        // Are being sent to a format function, to be parsed correctly. 
        if (!isNullOrEmptyFun(query.Options)) {

            var optionIDS = query.Options.split(',');

            //This block here checks for Query 'type', the Button and Link types.
            optionIDS.forEach(element => {
                var option = _gDataset.Options.find(x => x.ID == element);
                if (option.Type == "Button") {
                    templateGenerated += buttonTemplate.format(element, option.Text);
                }
                else if (option.Type == "Link") {
                    templateGenerated += linkTemplate.format(option.URL, !isNullOrEmptyFun(option.Text) ? option.Text : "link");
                }
            });
        }

        // Template for Chat query
        var chatTemplate = createQueryTemplateFun();

        setTimeout(() => {
            document.getElementById("ichatbot-loader").style.visibility = "hidden";
            document.getElementById("ichatbot-chat-inner-div").getElementsByTagName("div")[0].innerHTML +=
                chatTemplate.format(query.ID, _gConfig.ChatQueryCSSClass, queryText, templateGenerated);
            document.getElementById("ichatbot-loader").scrollIntoView();
        }, isNullOrEmptyFun(_gConfig.LoaderTimeout) ? 600 : _gConfig.LoaderTimeout);

        // Loading next query in recursive way
        if (!isNullOrEmptyFun(query.QueryID)) {
            if (query.QueryID != "") {
                if (query.SearchInQueries == false && query.Type == "") {
                    loadQueryFun(query.QueryID);
                }
            }
        }
    }

    // This function will add a query will message, it will not have any options
    // This function can be called by user code for displaying custom messages to end user
    var simpleQueryFun = function simpleQuery(message) {
        document.getElementById("ichatbot-loader").style.visibility = "visible";

        // Template for Chat query
        var chatTemplate = createQueryTemplateFun();

        setTimeout(() => {
            document.getElementById("ichatbot-loader").style.visibility = "hidden";
            document.getElementById("ichatbot-chat-inner-div").getElementsByTagName("div")[0].innerHTML +=
                chatTemplate.format(null, _gConfig.ChatQueryCSSClass, message, "");
            document.getElementById("ichatbot-loader").scrollIntoView();
        }, isNullOrEmptyFun(_gConfig.LoaderTimeout) ? 600 : _gConfig.LoaderTimeout);

        _gChatSession.push({ "SimpleQuery": message });
    }

    // Function for creating UserText input template and adding it to chat
    var userTextInputDisplayFun = function UserTextInputDisplay(userInput) {
        var parsedInput = parseUserTextInputFun(userInput);
        var chatUserInputIcon = "";

        // Picks either the FA icon, or Image for chat user text input template
        if (!isNullOrEmptyFun(_gConfig.ChatUserInputIconFAClass)) {
            chatUserInputIcon = "<i class='" + _gConfig.ChatUserInputIconFAClass + "'></i>";
        }
        else if (!isNullOrEmptyFun(_gConfig.ChatUserInputIconImagePath)) {
            var cssClass = (!isNullOrEmptyFun(_gConfig.ChatUserInputIconCSSClass)) ? "class='" + _gConfig.ChatUserInputCSSClass + "'" : "";
            chatUserInputIcon = "<img decoding  src='" + _gConfig.ChatUserInputIconImagePath + "' class='" + cssClass + "'></img>  ";
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
    var resetChatFun = function ResetChat() {
        _regexPattern = "";
        document.getElementById("ichatbot-chat-inner-div").getElementsByTagName("div")[0].innerHTML = "";
        document.getElementById("ichatbot-char-count").innerHTML = "0/" + _gConfig.UserInputMaxLen;
        document.getElementById("ichatbot-userinput").value = '';
        document.getElementById("ichatbot-userinput").classList.remove('ichatbot-userinput-error');

        _gChatSession.push({ "Reset": "UserReset" });

        // Clearing chatsession if ResetChatHistoryOnReset is true
        if (!isNullOrEmptyFun(_gConfig.ResetChatHistoryOnReset)) {
            if (_gConfig.ResetChatHistoryOnReset == true) {
                _gChatSession = [];
            }
        }

        loadQueryFun(_gConfig.IntialQueryID);
        fireChatResetEventFun();
    }

    // Function that closes chat
    var closeChatFun = function CLoseChat() {
        document.getElementById('ichatbot').classList.remove("ichatbot-show");

        _gChatSession.push({ "Close": "UserClose" });

        // Clearing chatsession if ResetChatHistoryOnClose is true
        if (!isNullOrEmptyFun(_gConfig.ResetChatHistoryOnClose)) {
            if (_gConfig.ResetChatHistoryOnClose == true) {
                _regexPattern = "";
                document.getElementById("ichatbot-chat-inner-div").getElementsByTagName("div")[0].innerHTML = "";
                document.getElementById("ichatbot-char-count").innerHTML = "0/" + _gConfig.UserInputMaxLen;;
                document.getElementById("ichatbot-userinput").value = '';
                document.getElementById("ichatbot-userinput").classList.remove('ichatbot-userinput-error');

                _gChatSession = [];

                loadQueryFun(_gConfig.IntialQueryID);
            }
        }

        fireChatCloseEventFun();
    }

    // Function that open and close chat without user clicking the floating icon
    var showChatFun = function showChat(value) {
        if (value) {
            document.getElementById('ichatbot').classList.add("ichatbot-show");
        }
        else {
            document.getElementById('ichatbot').classList.remove("ichatbot-show");
        }
    }

    // Setting the user passedd functions to event handlers
    var subscribeEventFun = function subscribeEvent(userTextEvent, buttonClickEvent, chatResetEvent, chatCloseEvent, fileUploadEvent) {
        _userTextEvent = userTextEvent;
        _chatButtonClickEvent = buttonClickEvent;
        _chatResetEvent = chatResetEvent;
        _chatCloseEvent = chatCloseEvent;
        _fileUploadEvent = fileUploadEvent;
    }

    var fireUserTextEventFun = function fireUserTextEvent() {
        if (!isNullOrEmptyFun(_userTextEvent)) {
            _userTextEvent(_gChatSession);
        }
    }

    var fireChatResetEventFun = function fireChatResetEvent() {
        if (!isNullOrEmptyFun(_chatResetEvent)) {
            _chatResetEvent(_gChatSession);
        }
    }

    var fireChatCloseEventFun = function fireChatCloseEvent() {
        if (!isNullOrEmptyFun(_chatCloseEvent)) {
            _chatCloseEvent(_gChatSession);
        }
    }

    var fireUserButtonClickEventFun = function fireUserButtonClickEvent() {
        if (!isNullOrEmptyFun(_chatButtonClickEvent)) {
            _chatButtonClickEvent(_gChatSession);
        }
    }

    var fireFileUploadEventFun = function fileUploadEventFun(e) {
        if (!isNullOrEmptyFun(_fileUploadEvent)) {
            _fileUploadEvent(e, _gChatSession);
        }
    }

    var getChatSessionFun = function getChatSession() {
        return _gChatSession;
    }

    return {
        Initialize: intializeFun,
        LoadQuery: loadQueryFun,
        ResetChat: resetChatFun,
        CloseChat: closeChatFun,
        ShowChat: showChatFun,
        SubscribeEvent: subscribeEventFun,
        SimpleQuery: simpleQueryFun,
        GetChatSession: getChatSessionFun,
        ShowLoader: showLoaderFun,
        HideLoader: hideLoaderFun
    }

})();