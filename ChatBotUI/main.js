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
 
    LoadQuery(1);
 
    function LoadQuery(id) {
 
        var query = queries.find(x => x.ID == id);
        console.log(query)
        var queryText = query.Query;
        //console.log(queryText)
        var responseIDS = query.Response.split(',');
       // console.log(responseIDS)

        var optionTemplate = "<span id='{0}' class='badge rounded-pill bg-info text-dark' type='button'>{2}</span>";
        var linkTemplate = "<a href='{0}' target='_blank'>link to click</a>";
        
        var templateGenerated = '';
        responseIDS.forEach(element => {
            var response = responses.find(x => x.ID == element);
            if (response.Type == "Option") {
                templateGenerated += optionTemplate.format(element, response.Question, response.Response);
            }
            else if (response.Type == "Link") {
                templateGenerated += linkTemplate.format(element, response.Response);
            }
        });
 
        var chatTemplate = "<div class='chat-box-message-template'>" +
            "<i class='fa fa-user-circle fa-2x float-start' aria-hidden='true'></i>" +
            "<span id='chat-box-message-text' class='chat-box-message-text'>" + queryText + "</span>" +
            "<br>" +
            "<div id='chat-box-options' class='chat-box-options'>" +
            templateGenerated +
            "</div>" +
            "</div>" +
            "</div>";
        document.getElementById("chat-box-messages").innerHTML += chatTemplate;
    }
});