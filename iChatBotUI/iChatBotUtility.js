// A string format function being used for parsing arguments. 
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

"use strict";
// The main utility function wrapper- with various functions 
var iChatBotUtility = (function () {

    var _globalDataset = null;
    var _globalConfig = iChatBotConfig;
    var _userEvent = null;
    var _globalRecord = new Array();

    var intializeFun = function Initialize() {


        // RUN this on live server. 
        //_globalDataset = JSON.parse(loadDataSetFun(_globalConfig));

        //TEMPORARY - setting globaldataset to iChatBotDataset
        _globalDataset = iChatBotDataset;   

        generateHTMLStructureFun().then(customizationFun)
       
        loadQueryFun(_globalConfig.IntialQueryID);
        //Testing--- loadQueryFun(5);
        //   eventCollectionFun();

        //--------------------------------------------------------
        // // WHEN jQuery syntax
        // $.when($.ajax(generateHTMLStructureFun())).then(function () {
        //     customizationFun();
        //     loadQueryFun(_globalConfig.IntialQueryID);
        // });
        //--------------------------------------------------------

        // // ONLOAD WORKING- BUT NO RESULT DISPLAY
        //  generateHTMLStructureFun();
        //     window.onload = (event) => {
        //         customizationFun(); 
        //         loadQueryFun(_globalConfig.IntialQueryID);
        //   };
        //--------------------------------------------------------

        // customizationFun();
        // $( function() {
        //     if(condition == 'true'){
        //         $.when(generateHTMLStructureFun()).then(customizationFun());
        //     }
        //     else {
        //         generateHTMLStructureFun();
        //        // doThis(someVariable);
        //       }
        // });
        //--------------------------------------------------------

    }

    // This function customizes the rendered HTML according to user's configs- colors, heights, icons, buttons, text
    var customizationFun = function Customization(  ){
        
        // CUSTOM title message, max - min chat message lengths
        document.getElementById("chat-box-title-head").innerHTML = _globalConfig.ChatBoxTitleMessage;
        document.getElementById("chat-box-message").minLength = _globalConfig.ChatMessageLengthMin;
        document.getElementById("chat-box-message").maxLength = _globalConfig.ChatMessageLengthMax;

        document.getElementById("chat-box-char-count").innerHTML = "0/" + _globalConfig.ChatMessageLengthMax;

        // CUSTOM heights, widths.
        var customHeight = _globalConfig.ChatBoxHeight ;
        var customWidth = _globalConfig.ChatBoxWidth ;
        document.getElementById("chat-box").style.height = customHeight ;
        document.getElementById("chat-box").style.width = customWidth ;

        // FA Icon On float- For popping up chat box. 
        if(_globalConfig.ChatBoxPopFAIcon != "" )
        {
            var iTagIcon = " <i class='fas "+ _globalConfig.ChatBoxPopFAIcon  +" fa-3x'></i> ";
            document.getElementById("chat-floating-Icon").innerHTML = iTagIcon ;
        }
        // IMAGE Icon On float- For popping up chat box. 
        else if(_globalConfig.ChatBoxPopImageIcon != "" )
        {
           var imgTagFloating =  "<img src=' "+ _globalConfig.ChatBoxPopImageIcon  +" ' class='popAdjustingCSS imageAdjust'></img>";
        }

        // Background Color Modifications -- For OUTER box , INNER box.
        if(_globalConfig.ChatBoxBackgroundColor != "")
        {
            document.getElementById("chat-box").style.backgroundColor = _globalConfig.ChatBoxBackgroundColor;
        }

        if(_globalConfig.ChatInnerBoxBackgroundColor!= "")
        {
            document.getElementById("chat-box-messages").style.backgroundColor = _globalConfig.ChatInnerBoxBackgroundColor;
        }

         // SOME default reset, close click icons on HEADER right.
         var resetIcon = "<a href='#' id='chat-box-reset'><i class='fas fa-sync pad-right-5px' title='Refresh'></i></a>";
         var closeIcon = "<a href='#' id='chat-box-close'><i class='fas fa-times' title='Close'></i></a>";
         // Fetching user's icon styles from CONFIG. 
         if(_globalConfig.ChatHeaderResetIcon != ""){
             resetIcon =  "<a href='#' id='chat-box-reset'> <i class='fas "
                              + _globalConfig.ChatHeaderResetIcon + " pad-right-5px' title='Refresh'></i></a>  ";
          document.getElementById("header-right-icons").innerHTML +=  resetIcon;
         }
         
         if(_globalConfig.ChatHeaderCloseIcon != ""){    
             closeIcon =  "<a href='#' id='chat-box-close'> <i class='fas "
                            +  _globalConfig.ChatHeaderCloseIcon + " pad-right-5px' title='Refresh'></i></a>";         
             document.getElementById("header-right-icons").innerHTML += closeIcon;
         } 
         
        // jQuery FOR-- click,key event-listening responses. 

         $("#chat-floating-Icon").click(function (e) {
            $('#chat-box').addClass('chat-box-show');
        });
    
        $("#chat-box-close").click(function (e) {
            $('#chat-box').removeClass('chat-box-show');
        });
    
        $("#chat-box-reset").click(function () {  
            iChatBotUtility.ResetChat();
        });
    
        // On keydown- ENTER : response collection. 
        $("#chat-box-message").keydown(function (e) {
            if (e.code === "Enter" || e.code === "NumpadEnter") {
                var input = e.target.value;
                var charCount = e.target.value.length;
                var minLength = e.target.minLength;
    
                if (charCount >= minLength) {
                    iChatBotUtility.UserResponseDisplay(input);
                    iChatBotUtility.FireUserEvent(e.target.value);
                    e.target.disabled = true;
                    e.target.value = "";
                }
                document.getElementById("chat-box-char-count").innerHTML = "0/500";
            }
        });
    
        // Keyup- event handling the character count.
        $("#chat-box-message").keyup(function (e) {
            var charCount = e.target.value.length;
            var minLength = e.target.minLength;
            $("#chat-box-char-count").text(charCount + '/' + e.target.maxLength);
            if (charCount < minLength) {
                $(this).addClass('chat-box-message-error');
            }
            else {
                $(this).removeClass('chat-box-message-error');
            }
        });
    }

    // This function renders the main page HTML template- the basic blocks, chatboxes, containers. 
    // This renders, executes FIRST with callback. 
    var generateHTMLStructureFun = function GenerateHTMLStructure(callback){       
        var containerDiv =
        " <a href='#' id='chat-floating-Icon' class='chat-floating-icon'>  <!--This one here is being fetched dynamically in config-->  </a>" +
        "<div class='chat-box' id='chat-box'>" +
            "<div class='chat-box-header'>" +
                 "<div class='float-start'>" +
                        "<span id='chat-box-title-head'>  Customer Support  </span>" +
                 "</div>"  
                 +     "<div class='float-end'  id='header-right-icons'>" + 
                            "<!--This one here is being fetched dynamically -->"+
                        "</div>"  +
             "</div>" +
        "<div id='chat-box-container' class='container chat-box-container'>" +
                "<div id='chat-box-chat' class='chat-box-chat'>" +
                    "<div id='chat-box-messages' class='chat-box-messages'>"+ "<div></div>" +
                        "<div id='chat-box-message-loading' class='d-flex justify-content-center'>" +
                                "<div class='spinner-border' role='status'>" +
                                        "<span class='sr-only'>Loading...</span>" +
                                "</div>"+
                        "</div>" +
                    "</div>" +
                "</div>" +
        "</div>"+

        "<div class='chat-box-footer'>" +
            "<div id='chat-box-char-count' class='chat-box-char-count float-end'> </div>"+
            "<input id='chat-box-message' type='text' class='float-start form-control' disabled autocomplete='off'>" +
        "</div>" + 
    "</div>"   ;
            return new Promise(function(resolve, reject) {
                 document.getElementById("iChatGeneration").innerHTML += containerDiv;
                //   console.log("first function executed");
                  resolve();
              }) 
    }

    /* ----- Planned to use for self invoke functions at top, didnt work. 
   var argumentSetterFun = function ArgumentSetter(){
    }

    var eventCollectionFun = function eventCollection(){
    }
    */


    // Function That Loads our Query, Processes it from Dataset.
    var loadQueryFun = function LoadQuery(id) {
        document.getElementById("chat-box-message-loading").style.visibility = "visible";

        if (document.getElementById("chat-box-options") != null) {
            document.getElementById("chat-box-options").classList.add("disabled-options");
        }

        var query = _globalDataset.Queries.find(x => x.ID == id);
        var queryText = query.Query;
        var responseQueryID = null;

        // taking care of input container- on and off.
        if (query.Enabletext == "TRUE") 
        {
            document.getElementById("chat-box-message").disabled = false;
        }
        else
        {
            document.getElementById("chat-box-message").disabled = true;
        }

        // The templates that generates Options, Link
        var optionTemplate = "<span id='{0}' onclick='iChatBotUtility.LoadQuery({1})' class='badge rounded-pill bg-info text-dark' type='button'>{2}</span>";
        var linkTemplate = "<a href='{0}' target='_blank'>link to click</a>";

        var templateGenerated = '';

        // Are being sent to a format function, to be parsed correctly. 
        if (query.Response != null) 
        {
            var responseIDS = query.Response.split(',');
            responseIDS.forEach(element => 
                {
                var response = _globalDataset.Responses.find(x => x.ID == element);
                if (response.Type == "Option") 
                {
                    templateGenerated += optionTemplate.format(element, response.Query, response.Response);
                }
                else if (response.Type == "Link")
                {
                    templateGenerated += linkTemplate.format(element, response.Response);
                    responseQueryID = response.Query;
                }
            });
        }

        var boldClassVar = "";
        if(query.Bold == "TRUE" )
        {
            boldClassVar =  "fontBoldForText";
        }

        // Template for Chat message
        var chatTemplate = "<div class='chat-box-message-template'>" +
            "<div class='d-flex justify-content-start'>" +
            "<i class='fa {0} fa-2x' aria-hidden='true'></i>" +
            "<span id='{1}' class='chat-box-message-text {2}'> {3} </span>" +
            "</div>" +
            "<div id='chat-box-options' class='chat-box-options'> {4} </div>" +
            "</div>";

        setTimeout(() => 
        {
            document.getElementById("chat-box-message-loading").style.visibility = "hidden";
            document.getElementById("chat-box-messages").getElementsByTagName("div")[0].innerHTML += 
            chatTemplate.format( _globalConfig.ChatBoxBotIcon, query.ID, boldClassVar, queryText, templateGenerated );
            document.getElementById("chat-box-message-loading").scrollIntoView();
        }, 600);

         
        //--- LOGIC FOR COLLECTION of Response JSON object. 
        var tempID = id; 
        var responseVar = _globalDataset.Responses.find((x) => x.Query == tempID );

        if( responseVar != null && responseVar.UserEvent != null )
        {                
            if(responseVar.UserEvent == "TRUE")
            { 
                fireUserEvent(responseVar);
            }
        } 
       
    }

    // Function that Resets chat.
    var resetChatFun = function ResetChat() {
        document.getElementById("chat-box-messages").getElementsByTagName("div")[0].innerHTML = "";
        loadQueryFun(_globalConfig.IntialQueryID);
    }

    // Loading the dataset from Config.
    var loadDataSetFun = function LoadDataset(iChatBotConfig) {

        var result;

        if (iChatBotConfig.DataSetFilePath != "") 
        {

            $.ajax({
                url: iChatBotConfig.DataSetFilePath,
                async: false,
                success: function (data) {
                    result = data;
                }
            });
        }

        if (iChatBotConfig.DataSetURL != "") {
            //TODO : user to call API
            // _globalDataset = ;
        }

        return result;
    }

    // Small utility function that takes care of long inputs by user, for display purpose in chatbox.
    var parseUserInput = function ParseUserInput(userInput) {
        var result = "";
        var maxLength = 25;
        var numOfLines = Math.floor(userInput.length / maxLength);
        for (var i = 0; i < numOfLines + 1; i++) 
        {
            result += userInput.substr(i * maxLength, maxLength);
            if (i !== numOfLines) { result += "\n"; }
        }
        return result;
    }

    // Function that handles work after User Responds. 
    var userResponseDisplayFun = function UserResponseDisplay(userInput) {

        var parsedInput = parseUserInput(userInput);
        
        if( iChatBotConfig.ChatBoxUserIcon   == "")
        {
            iChatBotConfig.ChatBoxUserIcon = "fa-user-circle";
        }

        var userResponseTemplate = "<div class='chat-box-message-template'>" +
            "<div class='d-flex justify-content-end'>" +
            "<span class='chat-box-message-text rightMarginText'> {0} </span>" +
            "<i class='fa {1} fa-2x' aria-hidden='true'></i>" +
            "</div>";

        document.getElementById("chat-box-messages").getElementsByTagName("div")[0].innerHTML += 
            userResponseTemplate.format(  parsedInput, iChatBotConfig.ChatBoxUserIcon );

        document.getElementById("chat-box-message-loading").scrollIntoView();
    }

    var SubscribeEvent = function subscribeEvent(func) 
    {
        _userEvent = func;
    }

    
    var fireUserEvent = function FireUserEvent(data)
    {
        _globalRecord.push(data);
        _userEvent(_globalRecord);
    }

    return {
        Initialize: intializeFun,
        LoadDataset: loadDataSetFun,
        LoadQuery: loadQueryFun,
        ResetChat: resetChatFun,
        UserResponseDisplay: userResponseDisplayFun,
        subscribeEvent: SubscribeEvent,
        FireUserEvent: fireUserEvent
    }

})();