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
    function IsNullOrEmpty(value) {
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
    function ShowLoader(timeOut) {
        document.getElementById("ichatbot-loader").style.visibility = "visible";

        if (timeOut != "") {
            setTimeout(() => {
                document.getElementById("ichatbot-loader").style.visibility = "hidden";
                document.getElementById("ichatbot-loader").scrollIntoView();
            }, timeOut);
        }
    }

    // Hides the loader
    function HideLoader() {
        document.getElementById("ichatbot-loader").style.visibility = "hidden";
        document.getElementById("ichatbot-loader").scrollIntoView();
    }

    // Display error message
    function ShowErrorMsg(msg) {
        document.getElementById("ichatbot-error-msg").innerHTML = msg;
    }

    // Formats long user text inputs, break down words by 25 characters
    function ParseUserTextInput(userInput) {
        var result = "";
        var maxLength = 25;
        var numOfLines = Math.floor(userInput.length / maxLength);
        for (var i = 0; i < numOfLines + 1; i++) {
            result += userInput.substr(i * maxLength, maxLength);
            if (i !== numOfLines) { result += "\n"; }
        }
        return result;
    }

    // Validates user input aganst min length/regex expression
    function ValidateUserTextInput(e) {
        var minLength = e.target.minLength;
        var charCount = e.target.value.length;

        if (!IsNullOrEmpty(_regexPattern)) {
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
    function Initialize(config, dataset, intialQueryID) {
        _gConfig = config;
        _gDataset = dataset;

        ValidateConfiguration();

        RenderHTMLTemplate();
        RegisterEvents();

        if (!IsNullOrEmpty(intialQueryID)) {
            LoadQuery(intialQueryID);
        }
        else if (!IsNullOrEmpty(_gConfig.IntialQueryID)) {
            LoadQuery(_gConfig.IntialQueryID);
        }
    }

    // Validates all the required and optional configurations
    function ValidateConfiguration() {

        // Errors : essential configurations
        if (IsNullOrEmpty(_gConfig)) {
            console.error("iChatBot : configuration file/object not found");
        }
        if (IsNullOrEmpty(_gDataset)) {
            console.error("iChatBot : dataset file/object not found");
        }
        if (IsNullOrEmpty(_gConfig.FloatingIconFAClass) && IsNullOrEmpty(_gConfig.FloatingIconImagePath)) {
            console.error("iChatBot : Set either FloatingIconFAClass or FloatingIconImagePath property");
        }
        if (IsNullOrEmpty(_gConfig.ResetFAClass) && IsNullOrEmpty(_gConfig.ResetImagePath)) {
            console.error("iChatBot : Set either ResetFAClass or ResetImagePath property");
        }
        if (IsNullOrEmpty(_gConfig.CloseFAClass) && IsNullOrEmpty(_gConfig.CloseImagePath)) {
            console.error("iChatBot : Set either CloseFAClass or CloseImagePath property");
        }
        if (IsNullOrEmpty(_gConfig.LoaderCSSClass)) {
            console.error("iChatBot : LoaderCSSClass property cannot be null/undefined");
        }

        // Warnings : optional configuarations
        if (IsNullOrEmpty(_gConfig.IntialQueryID)) {
            console.warn("iChatBot : IntialQueryID property is not set in config.");
        }
        if (IsNullOrEmpty(_gConfig.ChatQueryIconFAClass) && IsNullOrEmpty(_gConfig.ChatQueryIconImagePath)) {
            console.warn("iChatBot : Set either ChatQueryIconFAClass or ChatQueryIconImagePath property");
        }
        if (IsNullOrEmpty(_gConfig.ChatUserInputIconFAClass) && IsNullOrEmpty(_gConfig.ChatUserInputIconImagePath)) {
            console.warn("iChatBot : Set either ChatUserInputIconFAClass or ChatResponseIconImagePath property");
        }
        if (IsNullOrEmpty(_gConfig.UserInputMinLen)) {
            console.warn("iChatBot : UserInputMinLen property is undefined or null");
        }
        if (IsNullOrEmpty(_gConfig.UserInputMaxLen)) {
            console.warn("iChatBot : UserInputMaxLen property is undefined or null");
        }
        if (IsNullOrEmpty(_gConfig.Title)) {
            console.warn("iChatBot : Title property is undefined or null");
        }
        if (IsNullOrEmpty(_gConfig.DisableSelectedButton)) {
            console.warn("iChatBot : DisableSelectedButton property is undefined or null");
        }
        if (IsNullOrEmpty(_gConfig.iChatBotHeight)) {
            console.warn("iChatBot : iChatBotHeight property is undefined or null");
        }
        if (IsNullOrEmpty(_gConfig.iChatBotWidth)) {
            console.warn("iChatBot : iChatBotWidth property is undefined or null");
        }
        if (IsNullOrEmpty(_gConfig.iChatBotBackgroundColor)) {
            console.warn("iChatBot : iChatBotBackgroundColor property is undefined or null");
        }
        if (IsNullOrEmpty(_gConfig.MessagesBackgroundColor)) {
            console.warn("iChatBot : MessagesBackgroundColor property is undefined or null");
        }
        if (IsNullOrEmpty(_gConfig.ButtonCSSClass)) {
            console.warn("iChatBot : ButtonCSSClass property is undefined or null");
        }
        if (IsNullOrEmpty(_gConfig.LinkCSSClass)) {
            console.warn("iChatBot : LinkCSSClass property is undefined or null");
        }
        if (IsNullOrEmpty(_gConfig.FloatingIconImageCSSClass)) {
            console.warn("iChatBot : FloatingIconImageCSSClass property is undefined or null");
        }
        if (IsNullOrEmpty(_gConfig.ResetCSSClass)) {
            console.warn("iChatBot : ResetCSSClass property is undefined or null");
        }
        if (IsNullOrEmpty(_gConfig.CloseCSSClass)) {
            console.warn("iChatBot : CloseCSSClass property is undefined or null");
        }
        if (IsNullOrEmpty(_gConfig.ChatQueryIconCSSClass)) {
            console.warn("iChatBot : ChatQueryIconCSSClass property is undefined or null");
        }
        if (IsNullOrEmpty(_gConfig.ChatQueryCSSClass)) {
            console.warn("iChatBot : ChatQueryCSSClass property is undefined or null");
        }
        if (IsNullOrEmpty(_gConfig.ChatUserInputIconCSSClass)) {
            console.warn("iChatBot : ChatUserInputIconCSSClass property is undefined or null");
        }
        if (IsNullOrEmpty(_gConfig.ChatUserInputCSSClass)) {
            console.warn("iChatBot : ChatUserInputCSSClass property is undefined or null");
        }
        if (IsNullOrEmpty(_gConfig.LoaderTimeout)) {
            console.warn("iChatBot : LoaderTimeout property is undefined or null, default will be set to 600");
        }
        if (IsNullOrEmpty(_gConfig.SearchNotFoundMsg)) {
            console.warn("iChatBot : SearchNotFoundMsg property is undefined or null, default will be set to 'Keyword Not Found!!'");
        }
        if (IsNullOrEmpty(_gConfig.ResetChatHistoryOnReset)) {
            console.warn("iChatBot : ResetChatHistoryOnReset property is undefined or null, default will be set to false");
        }
        if (IsNullOrEmpty(_gConfig.ResetChatHistoryOnClose)) {
            console.warn("iChatBot : ResetChatHistoryOnClose property is undefined or null, default will be set to false");
        }
        if (IsNullOrEmpty(_gConfig.FloatingIconCSSClass)) {
            console.warn("iChatBot : FloatingIconCSSClass property is undefined or null");
        }
        if (IsNullOrEmpty(_gConfig.TitleIconFAClass) && IsNullOrEmpty(_gConfig.TitleImagePath)) {
            console.warn("iChatBot : Set either TitleIconFAClass or TitleImagePath property");
        }
    }

    // Returns query template html
    function CreateQueryTemplate() {
        var chatQueryIcon;

        // Picks either the FA user icon, or Image user icon for chat messages. 
        if (!IsNullOrEmpty(_gConfig.ChatQueryIconFAClass)) {
            chatQueryIcon = "<i class='" + _gConfig.ChatQueryIconFAClass + "'></i>";
        }
        else if (!IsNullOrEmpty(_gConfig.ChatQueryIconImagePath)) {
            var cssClass = (!IsNullOrEmpty(_gConfig.ChatQueryIconCSSClass)) ? "class='" + _gConfig.ChatQueryIconCSSClass + "'" : "";
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
    function RenderHTMLTemplate() {

        // chatbot height, width and background color
        var ichatbotStyle = "style='background-color:" + _gConfig.iChatBotBackgroundColor + ";' ";
        var ichatbotMessageStyle = "style='background-color:" + _gConfig.MessagesBackgroundColor + " ;height:" +
            _gConfig.iChatBotHeight + ";width:" + _gConfig.iChatBotWidth + ";' ";

        var floatingIcon = "";
        var resetIcon = "";
        var closeIcon = "";
        var titleIcon = "";

        // Floating icon
        if (!IsNullOrEmpty(_gConfig.FloatingIconFAClass)) {
            floatingIcon = " <i onclick ='iChatBotUtility.OpenChatBot(true)' class='" + _gConfig.FloatingIconFAClass + "'></i> ";;
        }
        else if (!IsNullOrEmpty(_gConfig.FloatingIconImagePath)) {
            var cssClass = (!IsNullOrEmpty(_gConfig.FloatingIconImageCSSClass)) ? "class='" + _gConfig.FloatingIconImageCSSClass + "'" : "";
            floatingIcon = "<img onclick ='iChatBotUtility.OpenChatBot(true)' src='" + _gConfig.FloatingIconImagePath + "' " + cssClass + "></img>";
        }

        // Reset icon
        if (!IsNullOrEmpty(_gConfig.ResetFAClass)) {
            resetIcon = "<i onclick ='iChatBotUtility.ResetChat()' class='" + _gConfig.ResetFAClass + "' title='Reset'></i> ";
        }
        else if (!IsNullOrEmpty(_gConfig.ResetImagePath)) {
            var cssClass = (!IsNullOrEmpty(_gConfig.ResetCSSClass)) ? "class='" + _gConfig.ResetCSSClass + "'" : "";
            resetIcon = "<img onclick='iChatBotUtility.ResetChat()' src='" + _gConfig.ResetImagePath + "' " + cssClass + "></img>";
        }

        // Close icon
        if (!IsNullOrEmpty(_gConfig.CloseFAClass)) {
            closeIcon = " <i onclick ='iChatBotUtility.CloseChatBot()' class='" + _gConfig.CloseFAClass + "' title='Close'></i> ";;
        }
        else if (!IsNullOrEmpty(_gConfig.CloseImagePath)) {
            var cssClass = (!IsNullOrEmpty(_gConfig.CloseCSSClass)) ? "class='" + _gConfig.CloseCSSClass + "'" : "";
            closeIcon = "<img onclick ='iChatBotUtility.CloseChatBot()' src='" + _gConfig.CloseImagePath + "' " + cssClass + "></img>";
        }

        // title icon
        if (!IsNullOrEmpty(_gConfig.TitleIconFAClass)) {
            titleIcon = " <i class='" + _gConfig.TitleIconFAClass + "'></i> ";;
        }
        else if (!IsNullOrEmpty(_gConfig.TitleImagePath)) {
            var cssClass = (!IsNullOrEmpty(_gConfig.TitleImageCSSClass)) ? "class='" + _gConfig.TitleImageCSSClass + "'" : "";
            titleIcon = "<img src='" + _gConfig.TitleImagePath + "' " + cssClass + "></img>";
        }

        // Chatbot template along with floating icon
        var htmlTemplate =
            "<div id='ichatbot' class='ichatbot' " + ichatbotStyle + ">" +
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
            "<span id='ichatbot-error-msg' class='float-start " + _gConfig.ErrorMessageCSSClass + "'></span>" +
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
    function RegisterEvents() {

        // Event for handling user text input on enter/numpad enter keys
        document.getElementById("ichatbot-userinput")
            .addEventListener("keydown", function (e) {

                if (e.code === "Enter" || e.code === "NumpadEnter") {

                    //Retriving queryID from _ChatSession
                    var queryID = "";

                    for (var i = _gChatSession.length - 1; i >= 0; i--) {
                        if (!IsNullOrEmpty(_gChatSession[i].Query)) {
                            if (!IsNullOrEmpty(_gChatSession[i].Query.ID)) {
                                queryID = _gChatSession[i].Query.ID;
                                break;
                            }
                        }
                    }

                    var query = _gDataset.Queries.find(x => x.ID == queryID);

                    //Checking if the input type is textbox
                    if (e.target.type.toLowerCase() == "text") {

                        if (ValidateUserTextInput(e)) {
                            var input = e.target.value;
                            var charCount = e.target.value.length;
                            var minLength = e.target.minLength;

                            e.target.disabled = true;
                            e.target.value = "";

                            e.target.classList.remove('ichatbot-userinput-error');

                            UserTextInputDisplay(input);
                            _gChatSession.push({ "UserTextInput": input });

                            if (query.SearchInQueries == false) {
                                LoadQuery(query.QueryID);
                            }
                            else {
                                isQueryFound = false;

                                for (var i = 0; i <= _gDataset.Queries.length - 1; i++) {

                                    if (!IsNullOrEmpty(_gDataset.Queries[i].SearchKeywords)) {
                                        if (_gDataset.Queries[i].SearchKeywords.toLowerCase().search(input.toLowerCase()) == 0) {
                                            LoadQuery(_gDataset.Queries[i].ID);
                                            isQueryFound = true;
                                            break;
                                        }
                                    }
                                }

                                if (!isQueryFound) {
                                    if (!IsNullOrEmpty(query.QueryID)) {
                                        LoadQuery(query.QueryID);
                                    }
                                    else {
                                        LoadQuery(SimpleQuery(IsNullOrEmpty(_gConfig.SearchNotFoundMsg) ? "Keyword not found!!" : _gConfig.SearchNotFoundMsg));
                                        LoadQuery(query.ID);
                                    }
                                }
                            }

                            // Makes sure events are fired only when FireSubscribedEvent propert is true. 
                            if (query.FireSubscribedEvent == true) {
                                FireUserTextEvent();
                            }

                            document.getElementById("ichatbot-char-count").innerHTML = "0/" + e.target.maxLength;
                        }
                    }

                    //Checking if the input type is file
                    if (e.target.type.toLowerCase() == "file") {
                        if (e.target.files.length > 0) {

                            var fileNames = "";
                            for (var i = 0; i < e.target.files.length; i++) {
                                fileNames += e.target.files[i].name + ',';
                            }

                            _gChatSession.push({ "files Uploaded": fileNames.slice(0, -1) });

                            // Makes sure events are fired only when FireSubscribedEvent propert is true. 
                            if (query.FireSubscribedEvent == true) {
                                FireFileUploadEvent(e.target.files);
                            }

                            // e.target.type = "text";
                            // e.target.disabled = true;
                            // e.target.value = "";
                        }
                    }
                }
            });

        // Event for handling the character count
        document.getElementById("ichatbot-userinput")
            .addEventListener("keyup", function (e) {

                if (e.target.type.toLowerCase() == "text") {
                    ValidateUserTextInput(e);

                    document.getElementById("ichatbot-char-count").innerHTML = e.target.value.length + '/' + e.target.maxLength;
                }
            });

        // Event for handling user selected button
        document.getElementById("ichatbot")
            .addEventListener("click", function (e) {

                document.getElementById("ichatbot-userinput").focus();

                if (e.target.classList.contains('ichatbotbtn')) {

                    if (!IsNullOrEmpty(e.target.attributes.id)) {

                        var SelectedID = e.target.attributes.id.value;
                        var option = _gDataset.Options.find((x) => x.ID == SelectedID);

                        _gChatSession.push({ "Selected Option": option });

                        if (!IsNullOrEmpty(option.Query)) {
                            LoadQuery(option.Query)
                        }

                        // Makes sure events are fired only when FireSubscribedEvent propert is true
                        if (option != null && !IsNullOrEmpty(option.FireSubscribedEvent) && option.FireSubscribedEvent == true) {
                            FireUserButtonClickEvent();
                        }
                    }
                }
            });
    }

    // Loads a query with options and add to chatbot
    function LoadQuery(id) {

        if (IsNullOrEmpty(id)) {
            return;
        }

        document.getElementById("ichatbot-loader").style.visibility = "visible";

        // Disabling the selected clickable buttons
        if (!IsNullOrEmpty(_gConfig.DisableSelectedButton)) {
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

        if (query.Type.toLowerCase() == "text") {
            document.getElementById("ichatbot-userinput").disabled = false;
            _regexPattern = !IsNullOrEmpty(query.Regex) ? new RegExp(query.Regex) : "";
        }
        else if (query.Type.toLowerCase() == "file" || query.Type.toLowerCase() == "multiplefiles") {
            document.getElementById("ichatbot-userinput").disabled = false;
            document.getElementById("ichatbot-userinput").type = "file";

            if (query.Type.toLowerCase() == "multiplefiles") {
                document.getElementById("ichatbot-userinput").multiple = true;
            }
        }

        // The templates that generates Buttons, Link.
        var buttonTemplate = "<span id='{0}' class='" + _gConfig.ButtonCSSClass + " ichatbotbtn' type='button'>{1}</span>";
        var linkTemplate = "<a href='{0}' target='_blank' class='" + _gConfig.LinkCSSClass + "'>{1}</a>";

        var templateGenerated = '';

        // Are being sent to a format function, to be parsed correctly. 
        if (!IsNullOrEmpty(query.Options)) {

            var optionIDS = query.Options.split(',');

            //This block here checks for Query 'type', the Button and Link types.
            optionIDS.forEach(element => {
                var option = _gDataset.Options.find(x => x.ID == element);
                if (option.Type.toLowerCase() == "button") {
                    templateGenerated += buttonTemplate.format(element, option.Text);
                }
                else if (option.Type.toLowerCase() == "link") {
                    templateGenerated += linkTemplate.format(option.URL, !IsNullOrEmpty(option.Text) ? option.Text : "link");
                }
            });
        }

        // Template for Chat query
        var chatTemplate = CreateQueryTemplate();

        setTimeout(() => {
            document.getElementById("ichatbot-loader").style.visibility = "hidden";
            document.getElementById("ichatbot-chat-inner-div").getElementsByTagName("div")[0].innerHTML +=
                chatTemplate.format(query.ID, _gConfig.ChatQueryCSSClass, queryText, templateGenerated);
            document.getElementById("ichatbot-loader").scrollIntoView();
        }, IsNullOrEmpty(_gConfig.LoaderTimeout) ? 600 : _gConfig.LoaderTimeout);

        // Loading next query in recursive way
        if (!IsNullOrEmpty(query.QueryID)) {
            if (query.QueryID != "") {
                if (query.SearchInQueries == false && query.Type == "") {
                    LoadQuery(query.QueryID);
                }
            }
        }
    }

    // This function will add a query will message, it will not have any options
    // This function can be called by user code for displaying custom messages to end user
    function SimpleQuery(message) {
        document.getElementById("ichatbot-loader").style.visibility = "visible";

        // Template for Chat query
        var chatTemplate = CreateQueryTemplate();

        setTimeout(() => {
            document.getElementById("ichatbot-loader").style.visibility = "hidden";
            document.getElementById("ichatbot-chat-inner-div").getElementsByTagName("div")[0].innerHTML +=
                chatTemplate.format(null, _gConfig.ChatQueryCSSClass, message, "");
            document.getElementById("ichatbot-loader").scrollIntoView();
        }, IsNullOrEmpty(_gConfig.LoaderTimeout) ? 600 : _gConfig.LoaderTimeout);

        _gChatSession.push({ "SimpleQuery": message });
    }

    // Function for creating UserText input template and adding it to chat
    function UserTextInputDisplay(userInput) {
        var parsedInput = ParseUserTextInput(userInput);
        var chatUserInputIcon = "";

        // Picks either the FA icon, or Image for chat user text input template
        if (!IsNullOrEmpty(_gConfig.ChatUserInputIconFAClass)) {
            chatUserInputIcon = "<i class='" + _gConfig.ChatUserInputIconFAClass + "'></i>";
        }
        else if (!IsNullOrEmpty(_gConfig.ChatUserInputIconImagePath)) {
            var cssClass = (!IsNullOrEmpty(_gConfig.ChatUserInputIconCSSClass)) ? "class='" + _gConfig.ChatUserInputCSSClass + "'" : "";
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
    function ResetChat() {
        _regexPattern = "";
        document.getElementById("ichatbot-chat-inner-div").getElementsByTagName("div")[0].innerHTML = "";
        document.getElementById("ichatbot-char-count").innerHTML = "0/" + _gConfig.UserInputMaxLen;
        document.getElementById("ichatbot-error-msg").innerHTML = "";
        document.getElementById("ichatbot-userinput").value = '';
        document.getElementById("ichatbot-userinput").classList.remove('ichatbot-userinput-error');

        _gChatSession.push({ "Reset": "UserReset" });

        // Clearing chatsession if ResetChatHistoryOnReset is true
        if (!IsNullOrEmpty(_gConfig.ResetChatHistoryOnReset)) {
            if (_gConfig.ResetChatHistoryOnReset == true) {
                _gChatSession = [];
            }
        }

        LoadQuery(_gConfig.IntialQueryID);
        FireChatResetEvent();
    }

    // Function that closes chat
    function CloseChatBot() {
        document.getElementById('ichatbot').classList.remove("ichatbot-show");

        _gChatSession.push({ "Close": "UserClose" });

        // Clearing chatsession if ResetChatHistoryOnClose is true
        if (!IsNullOrEmpty(_gConfig.ResetChatHistoryOnClose)) {
            if (_gConfig.ResetChatHistoryOnClose == true) {
                _regexPattern = "";
                document.getElementById("ichatbot-chat-inner-div").getElementsByTagName("div")[0].innerHTML = "";
                document.getElementById("ichatbot-error-msg").innerHTML = "";
                document.getElementById("ichatbot-char-count").innerHTML = "0/" + _gConfig.UserInputMaxLen;;
                document.getElementById("ichatbot-userinput").value = '';
                document.getElementById("ichatbot-userinput").classList.remove('ichatbot-userinput-error');

                _gChatSession = [];

                LoadQuery(_gConfig.IntialQueryID);
            }
        }

        FireChatCloseEvent();
    }

    // Function that open and close chat without user clicking the floating icon
    function OpenChatBot() {
        document.getElementById('ichatbot').classList.add("ichatbot-show");
    }

    // Setting the user passedd functions to event handlers
    function SubscribeEvent(userTextEvent, buttonClickEvent, chatResetEvent, chatCloseEvent, fileUploadEvent) {
        _userTextEvent = userTextEvent;
        _chatButtonClickEvent = buttonClickEvent;
        _chatResetEvent = chatResetEvent;
        _chatCloseEvent = chatCloseEvent;
        _fileUploadEvent = fileUploadEvent;
    }

    function FireUserTextEvent() {
        if (!IsNullOrEmpty(_userTextEvent)) {
            _userTextEvent(_gChatSession);
        }
    }

    function FireChatResetEvent() {
        if (!IsNullOrEmpty(_chatResetEvent)) {
            _chatResetEvent(_gChatSession);
        }
    }

    function FireChatCloseEvent() {
        if (!IsNullOrEmpty(_chatCloseEvent)) {
            _chatCloseEvent(_gChatSession);
        }
    }

    function FireUserButtonClickEvent() {
        if (!IsNullOrEmpty(_chatButtonClickEvent)) {
            _chatButtonClickEvent(_gChatSession);
        }
    }

    function FireFileUploadEvent(e) {
        if (!IsNullOrEmpty(_fileUploadEvent)) {
            _fileUploadEvent(e, _gChatSession);
        }
    }

    function GetChatSession() {
        return _gChatSession;
    }

    return {
        Initialize: Initialize,
        LoadQuery: LoadQuery,
        OpenChatBot: OpenChatBot,
        ResetChat: ResetChat,
        CloseChatBot: CloseChatBot,
        SubscribeEvent: SubscribeEvent,
        SimpleQuery: SimpleQuery,
        GetChatSession: GetChatSession,
        ShowLoader: ShowLoader,
        HideLoader: HideLoader,
        ShowErrorMsg: ShowErrorMsg
    }
})();