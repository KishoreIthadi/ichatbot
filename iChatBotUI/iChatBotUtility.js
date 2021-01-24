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

    String.isNullOrEmpty = function (value) {
        return (!value || value == undefined || value == "" || value.length == 0);
    }

    // Placed for Testing , Trash code , Remove. 
    //    // Event for handling user selected option 
    //    $("#ichatbot-options > span").click(function (e) {
    //     console.log("chatbot buttons reached")
    //     console.log(e);
    //     var responseID = null;
    //     var response = _gDataset.Responses.find((x) => x.Query == responseID);
    //     if (response != null && response.FireSubscribedEvent != null && response.FireSubscribedEvent == "TRUE") {
    //         fireUserEvent(response);
    //     }
    // });

});

// iChatbot Library
var iChatBotUtility = (function () {

    var _gConfig = null;
    var _gDataset = null;
    var _userEvent = null;
    var _userSelections = new Array();

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

         // Exception handling for intital configurations which are important as well. 
         if( String.isNullOrEmpty( _gConfig.IntialQueryID) )
         {
             throw 'An essential configuration - InitialQueryID is missing! Without passing this, no functions start';
         }
         if( String.isNullOrEmpty( _gConfig.Title) )
         {
             throw 'An essential configuration - Title is missing!';
         }
 
         if( String.isNullOrEmpty( _gConfig.iChatBotHeight) )
         {
             throw 'An essential configuration - ChatBotHeight is missing!';
         }
         
         if( String.isNullOrEmpty( _gConfig.iChatBotWidth) )
         {
             throw 'An essential configuration - ChatBotHeight is missing!';
         }
         
         if( String.isNullOrEmpty( _gConfig.UserMsgMinLen) )
         {
             throw 'An essential configuration - Minimum message length for input is missing!';
         }
         
         if( String.isNullOrEmpty( _gConfig.UserMsgMaxLen) )
         {
             throw 'An essential configuration - Maximum message length for input is missing!';
         }

        // Main chatbot height, width and background color
        var ichatbotstyle = "style='height:" + _gConfig.iChatBotHeight + ";width:" + _gConfig.iChatBotWidth +
            ";background-color:" + _gConfig.iChatBotBackgroundColor + ";' ";

        var floatingIcon = "";
        var resetIcon = "";
        var closeIcon = "";

        // Floating icon
        if (_gConfig.FloatingIconFAClass != null && _gConfig.FloatingIconFAClass != "") 
        {
            floatingIcon = " <i class='" + _gConfig.FloatingIconFAClass + "'></i> ";;
        }
        else if (_gConfig.FloatingIconImagePath != null && _gConfig.FloatingIconImagePath != "") 
        {
            var cssClass = (_gConfig.FloatingIconCSSClass != null && _gConfig.FloatingIconCSSClass != "")
                ? "class='" + _gConfig.FloatingIconCSSClass + "'" : "";
            floatingIcon = "<img src='" + _gConfig.FloatingIconImagePath + "' " + cssClass + "></img>";
        }
        else
        {
            throw 'One of the essential configurations - Floating Icon has not been configured';
        }

        // Reset icon
        if (_gConfig.ResetFAClass != null && _gConfig.ResetFAClass != "") {
            resetIcon = "<i class='" + _gConfig.ResetFAClass + "' title='Reset'></i> ";
        }
        else if (_gConfig.ResetImagePath != null && _gConfig.ResetImagePath != "") {
            var cssClass = (_gConfig.ResetCSSClass != null && _gConfig.ResetCSSClass != "")
                ? "class='" + _gConfig.ResetCSSClass + "'" : "";
            resetIcon = "<img src='" + _gConfig.ResetImagePath + "' " + cssClass + "></img>";
        }
        else
        {
            throw 'One of the essential configurations - Reset Icon has not been configured';
        }

        // Close icon
        if (_gConfig.CloseFAClass != null && _gConfig.CloseFAClass != "") {
            closeIcon = " <i class='" + _gConfig.CloseFAClass + "' title='Close'></i> ";;
        }
        else if (_gConfig.CloseImagePath != null && _gConfig.CloseImagePath != "") {
            var cssClass = (_gConfig.CloseCSSClass != null && _gConfig.CloseCSSClass != "")
                ? "class='" + _gConfig.CloseCSSClass + "'" : "";
            closeIcon = "<img src='" + _gConfig.CloseImagePath + "' " + cssClass + "></img>";
        }
        else
        {
            throw 'One of the essential configurations - Close Icon has not been configured';
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
            "minlength=" + _gConfig.UserMsgMinLen + "maxlength=" + _gConfig.UserMsgMaxLen + " " +
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
                document.getElementById("ichatbot-char-count").innerHTML = "0/" + e.target.maxLength;
            }
        });

        // Event for handling the character count
        $("#ichatbot-message").keyup(function (e) {
            var charCount = e.target.value.length;
            var minLength = e.target.minLength;
            $("#ichatbot-char-count").text(charCount + '/' + e.target.maxLength);
            if (charCount < minLength) {
                $(this).addClass('ichatbot-message-error');
            }
            else {
                $(this).removeClass('ichatbot-message-error');
            }
        });


        // Click yet to be tested, yet to be done. 
        // Event for handling user selected option 
        $("#ichatbot-options > span").click(function (e) {
           
        });

        $('#ichatbot').on('click', '#ichatbot-options', function (e) {
            console.log('111');
            console.log("chatbot buttons reached")
            console.log(e);
            var responseID = null;
            var response = _gDataset.Responses.find((x) => x.Query == responseID);
            if (response != null && response.FireSubscribedEvent != null && response.FireSubscribedEvent == "TRUE") {
                fireUserEvent(response);
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

        // Template for Chat message
        var chatTemplate;

        var boldClass = query.Bold == "TRUE" ? " font-bold-true " : "";
        var ChatBotUserIconPicker;

        // Picks either the FA user icon, or Image user icon for chat messages. If neither, error. 
        if ( !String.isNullOrEmpty(_gConfig.ChatBotUserIconFA) ) {
            ChatBotUserIconPicker = _gConfig.ChatBotUserIconFA;
            chatTemplate = "<div class='ichatbot-message-template'>" +
            "<div class='d-flex justify-content-start'>" +
            "<i class='fa {0} fa-2x {1}' aria-hidden='true'></i>" +
            "<span id='{2}' class='ichatbot-message-text {3}'> {4} </span>" +
            "</div>" +
            "<div id='ichatbot-options' class='ichatbot-options'> {5} </div>" +
            "</div>";
        }
        else if( !String.isNullOrEmpty(_gConfig.ChatBotUserIconImage) )
        {
            ChatBotUserIconPicker = _gConfig.ChatBotUserIconImage;
            chatTemplate = "<div class='ichatbot-message-template'>" +
            "<div class='d-flex justify-content-start'>" +
            " <img decoding = 'async' src='{0}' class='sizing-image-icon {1}'>  </img>  " +
            "<span id='{2}' class='ichatbot-message-text {3}'> {4} </span>" +
            "</div>" +
            "<div id='ichatbot-options' class='ichatbot-options'> {5} </div>" +
            "</div>";
        }
        else
        {
            throw 'One of the Essential configurations : ChatBotUserIcon  hasnt been defined!';
        }
        var ChatBotIconCSS = (_gConfig.ChatBotIconCSSClass != null && _gConfig.ChatBotIconCSSClass != "")?
                                     "class='" + _gConfig.ChatBotIconCSSClass + "'" : "";
        
        setTimeout(() => {
            document.getElementById("ichatbot-message-loading").style.visibility = "hidden";
            document.getElementById("ichatbot-messages").getElementsByTagName("div")[0].innerHTML +=
                chatTemplate.format(ChatBotUserIconPicker, ChatBotIconCSS, query.ID, boldClass,
                                     queryText, templateGenerated);
            document.getElementById("ichatbot-message-loading").scrollIntoView();
        }, 600);
    }

    // Function that Resets chat
    var resetChatFun = function ResetChat() {
        document.getElementById("ichatbot-messages").getElementsByTagName("div")[0].innerHTML = "";
        loadQueryFun(_gConfig.IntialQueryID);
    }

    // Loading the dataset
    var loadDataSetFun = function LoadDataset(iChatBotConfig) {
        var result;

        if (!String.isNullOrEmpty(_gConfig.DataSetFilePath )) {
            $.ajax({
                url: iChatBotConfig.DataSetFilePath,
                async: false,
                success: function (data) {
                    result = data;
                }
            });
        }

        else if (!String.isNullOrEmpty( _gConfig.DataSetURL )) {
            //TODO : user to call API
            // _gDataset = ;
        }

        else
        {
            throw 'No Dataset Sources (Path Or URL) have been given';
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

    // Function that handles work after User Responds. 
    var userResponseDisplayFun = function UserResponseDisplay(userInput) {

        var parsedInput = parseUserInput(userInput);
      
        var userResponseTemplate;

        var UserResponseIconCSS = (_gConfig.UserResponseIconCSSClass != null && _gConfig.UserResponseIconCSSClass != "")?
        "class='" + _gConfig.UserResponseIconCSSClass + "'" : "";

        if ( !String.isNullOrEmpty(_gConfig.UserResponseIcon) ) {
            console.log(!String.isNullOrEmpty(_gConfig.UserResponseIcon))

            userResponseTemplate = "<div class='ichatbot-message-template'>" +
            "<div class='d-flex justify-content-end'>" +
            "<span class='ichatbot-message-text mar-right-5px '> {0} </span>" +
            "<i class='fa {1} fa-2x {2} ' aria-hidden='true'></i>" +
            "</div>";
            document.getElementById("ichatbot-messages").getElementsByTagName("div")[0].innerHTML +=
            userResponseTemplate.format(parsedInput, _gConfig.UserResponseIcon, UserResponseIconCSS);
        }
        else if( !String.isNullOrEmpty(_gConfig.UserResponseIconImage) )
        {

            userResponseTemplate = "<div class='ichatbot-message-template'>" +
            "<div class='d-flex justify-content-end'>" +
            "<span class='ichatbot-message-text mar-right-5px '> {0} </span>" +
            "<img decoding = 'async'  src='{1}' class='sizing-image-icon {2}'>  </img>";  +
            "</div>";

            document.getElementById("ichatbot-messages").getElementsByTagName("div")[0].innerHTML +=
            userResponseTemplate.format(parsedInput, _gConfig.UserResponseIconImage, UserResponseIconCSS);
        }
        else
        {
            throw 'One of the Essential configurations : UserResponseIcon hasnt been defined!';
        }

    
        document.getElementById("ichatbot-message-loading").scrollIntoView();
    }

    var SubscribeEventFun = function subscribeEvent(func) {
        _userEvent = func;
    }

    var fireUserEventFun = function FireUserEvent(data) {
        _userSelections.push(data);
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