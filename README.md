## **ichatbot**

<img src="images/complex.gif" width="49%" height="50%">  <img src="images/fileupload.gif" width="49%" height="50%">

---

### **Examples of different workflows**

<big><pre>
[https://kishoreithadi.github.io/ichatbot/](https://kishoreithadi.github.io/ichatbot/)
</pre></big>

---

### **Table of Contents**

* [What is **ichatbot**?](#what-is-ichatbot)
* [Installation](#Installation)
    - [1. NPM-Angular](#1-NPM-Angular)
    - [2. HTML](#2-HTML)
* [ichatbotconfig.js](#ichatbotconfigjs)
* [Dataset](#dataset)
* [Methods](#methods)

---

### **What is ichatbot?**

ichatbot is a fully customizable javascript library that enables you to create a chatbot with various workflows in a very short time.

---

### **Installation**

#### **1. NPM Angular**

```bash
npm install --save ichatbot
```

Add styles and scripts in **angular.json** 

```json
"styles": [
  "node_modules/ichatbot/ichatbotstyle-1.0.0.min.css"
],
"scripts": [
  "node_modules/ichatbot/ichatbot-1.0.0.min.js",
  "src/ichatbotconfig.js"
]
```

Add below link for getting default **font-awesome icons**, later you can remove/updated based on requirement

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
```

Add below tag anywhere in **html** file

```html
<div id="ichatbot-div"></div>
```

In your component file

```javascript
import {
    Component
} from '@angular/core';

declare var ichatbot: any;
declare var ichatbotconfig: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'my-app';

    ngOnInit() {

        var ichatbotDataset = {
            "Queries": [{
                "ID": "1",
                "Query": "Welcome to chatbot",
                "Options": "101",
                "Type": "",
                "QueryID": "",
                "SearchInQueries": false,
                "SearchKeywords": "",
                "FireSubscribedEvent": false,
                "Validation": "",
                "ValidationErrorMsg": ""
            }],
            "Options": [{
                "ID": "101",
                "Text": "Documentation",
                "Type": "Link",
                "URL": "https://github.com/KishoreIthadi/ichatbot",
                "Query": "",
                "FireSubscribedEvent": false
            }]
        }

        ichatbot.initialize(ichatbotconfig, ichatbotDataset);

        // ichatbotconfig is loaded from ichatbotconfig.js, script is added in header section
        ichatbot.initialize(ichatbotconfig, dataset, null);

        //Subscribing to UserInput Entered, User Button Click, Chat Reset, Chat Close events
        var userTextEvent = function UserText(e: any) {
            console.log('ichatbot : user text input event fired')
            console.log(e.chatSession);
            console.log(e.userInput);
            console.log(e.searchFailed);

            // In case you want to execute own logic on search failed
            // e.stop() will stop the default functionality of showing "Keyword not found" message --> calling the configured query --> adding "text entered" in chat session
            // if (e.searchFailed) {
            //     e.stop();
            //     ichatbot.loadQuery(1);
            // }
        }

        var fileUploadEvent = function fileUpload(e: any) {
            console.log('ichatbot : file upload event fired')
            console.log(e.files);
            console.log(e.chatSession);

            // In case you want to execute your own logic
            // e.stop() will stop the default functionality of showing "File Upload Success" message --> calling the configured query--> adding "file uploaded" in chat session

            e.stop();

            ichatbot.simpleQuery("<b>File Uploaded Sucessfully</b>")
            ichatbot.loadQuery(5);
        }

        var buttonClickEvent = function buttonClick(chatSession: any) {
            console.log('ichatbot : user button click event fired')
            console.log(chatSession);

            //Fetchhing selected option
            console.log(chatSession.pop());
        }

        var resetEvent = function reset(chatSession: any) {
            console.log('ichatbot : chat reset event fired')
            console.log(chatSession);
        }

        var closeEvent = function close(chatSession: any) {
            console.log('ichatbot : chat close event fired')
            console.log(chatSession);
        }

        ichatbot.subscribeEvent(userTextEvent, buttonClickEvent, resetEvent, closeEvent, fileUploadEvent);

        // function getDataset(dataset: any) {
        //   console.log(ichatbot.getDataset());
        // }

        // function updateDataset() {
        //   var dataset = ichatbot.getDataset();
        //         dataset.Queries.push({
        //             "ID": "100",
        //             "Query": "Updated Query",
        //             "Options": "300",
        //             "Type": "",
        //             "QueryID": "",
        //             "SearchInQueries": false,
        //             "SearchKeywords": "",
        //             "FireSubscribedEvent": false,
        //             "Validation": "",
        //             "ValidationErrorMsg": ""
        //         });

        //         dataset.Options.push({
        //             "ID": "300",
        //             "Text": "Updated Option",
        //             "Type": "Button",
        //             "URL": "",
        //             "Query": "",
        //             "FireSubscribedEvent": true
        //         });
        //         ichatbot.resetChat(false);
        //         ichatbot.loadQuery(100);
        //   }          

        // ichatbot.showLoader(5000);
        // ichatbot.hideLoader();

        // ichatbot.openChatBot();
        // ichatbot.closeChatBot();

        //ichatbot.resetChat();

        // ichatbot.showErrorMsg("Error Message");
        // ichatbot.getChatSession();

        // ichatbot.loadQuery(1);
    }
}
```

---

#### **2. HTML**

Download latest ichatbot.js, ichatbotconfig.js & ichatbotstyle.css using below link

<big><pre>
[https://github.com/KishoreIthadi/ichatbot/releases](https://github.com/KishoreIthadi/ichatbot/releases)
</pre></big>

Add link and script in head section

```html
<head>
    <!-- Font-Awesome is for appying default icons, please update as per your requirement -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">

    <link rel="stylesheet" href="ichatbotstyle-1.0.0.min.css">

    <script src="ichatbot-1.0.0.min.js"></script>
    <script src="ichatbotconfig.js"></script>
</head>
```

Add below in body section

```html
<body>
    <div id="ichatbot-div">
    </div>

    <script>
        var ichatbotDataset = {
            "Queries": [{
                "ID": "1",
                "Query": "Welcome to chatbot",
                "Options": "101",
                "Type": "",
                "QueryID": "",
                "SearchInQueries": false,
                "SearchKeywords": "",
                "FireSubscribedEvent": false,
                "Validation": "",
                "ValidationErrorMsg": ""
            }],
            "Options": [{
                "ID": "101",
                "Text": "Documentation",
                "Type": "Link",
                "URL": "https://github.com/KishoreIthadi/ichatbot",
                "Query": "",
                "FireSubscribedEvent": false
            }]
        }

        ichatbot.initialize(ichatbotconfig, ichatbotDataset);

        //Subscribing to UserInput Entered, User Button Click, Chat Reset, Chat Close events
        var userTextEvent = function UserText(e) {
            console.log('ichatbot : user text input event fired')
            console.log(e.chatSession);
            console.log(e.userInput);
            console.log(e.searchFailed);

            // In case you want to execute own logic on search failed
            // e.stop() will stop the default functionality of showing "Keyword not found" message --> calling the configured query --> adding "text entered" in chat session
            // if (e.searchFailed) {
            //     e.stop();
            //     ichatbot.loadQuery(1);
            // }
        }

        var fileUploadEvent = function fileUpload(e) {
            console.log('ichatbot : file upload event fired')
            console.log(e.files);
            console.log(e.chatSession);

            // In case you want to execute your own logic
            // e.stop() will stop the default functionality of showing "File Upload Success" message --> calling the configured query--> adding "file uploaded" in chat session

            e.stop();

            ichatbot.simpleQuery("<b>File Uploaded Sucessfully</b>")
            ichatbot.loadQuery(5);
        }

        var buttonClickEvent = function buttonClick(chatSession) {
            console.log('ichatbot : user button click event fired')
            console.log(chatSession);

            //Fetchhing selected option
            console.log(chatSession.pop());
        }

        var resetEvent = function reset(chatSession) {
            console.log('ichatbot : chat reset event fired')
            console.log(chatSession);
        }

        var closeEvent = function close(chatSession) {
            console.log('ichatbot : chat close event fired')
            console.log(chatSession);
        }

        ichatbot.subscribeEvent(userTextEvent, buttonClickEvent, resetEvent, closeEvent, fileUploadEvent);

        // function getDataset(dataset) {
        //   console.log(ichatbot.getDataset());
        // }

        // function updateDataset() {
        //   var dataset = ichatbot.getDataset();
        //         dataset.Queries.push({
        //             "ID": "100",
        //             "Query": "Updated Query",
        //             "Options": "300",
        //             "Type": "",
        //             "QueryID": "",
        //             "SearchInQueries": false,
        //             "SearchKeywords": "",
        //             "FireSubscribedEvent": false,
        //             "Validation": "",
        //             "ValidationErrorMsg": ""
        //         });

        //         dataset.Options.push({
        //             "ID": "300",
        //             "Text": "Updated Option",
        //             "Type": "Button",
        //             "URL": "",
        //             "Query": "",
        //             "FireSubscribedEvent": true
        //         });
        //         ichatbot.resetChat(false);
        //         ichatbot.loadQuery(100);
        //   }          

        // ichatbot.showLoader(5000);
        // ichatbot.hideLoader();

        // ichatbot.openChatBot();
        // ichatbot.closeChatBot();

        //ichatbot.resetChat();

        // ichatbot.showErrorMsg("Error Message");
        // ichatbot.getChatSession();

        // ichatbot.loadQuery(1);
    </script>
</body>
```

---

### **ichatbotconfig.js**

The following image explains most of the properties

<img src="images/ichatbotconfig.png">

01. **IntialQueryID: "1"**
    
        Query to be loaded initially, you can also set this while initializing ichatbot

        ichatbot.initialize(config, dataset, IntialQueryID); 

02. **UserInputMinLen: "5"**,   
    **UserInputMaxLen": "50"**

        User text input minimum and maximum character length. The text box border will be red if this criteria is not met

03. **FileMaxSize: "10485760"**   
        User file upload mazximum size in bytes

03. **IChatBotCSSClass: "class1 class2"**
        These css classes will be applied to chatbot outermost div by overriding default styles, specify multiple classes separated by space

04. **DisableSelectedButton: true**
        Whether the clickable option/button should be disabled after user clicks on it

05. **TitleIconFAClass: "fa fa-info blue-color"**,                    
    **TitleImagePath: ""**, 
    **TitleImageCSSClass: ""**

        Icon displayed on top left of chatbot

        Set either TitleIconFAClass (font-awesome class) **OR** TitleImagePath along with TitleImageCSSClass(optional) as below

   **TitleIconFAClass: ""**, 
   **TitleImagePath: "~/images/tiltleicon.png"**, 
   **TitleImageCSSClass: "class1 class2"**            

        The above is applicable for Reset, Close, FloatingIcon, ChatQueryIcon, ChatUserInputIcon properties

06. **SearchNotFoundMsg: "Keyword not found!!"**
        If not provided a default message will be shown

07. **ResetChatHistoryOnReset: true**,                  
   **ResetChatHistoryOnClose: true**

        by default all the activity is stored in sequential order and this can be accessed by calling getChatSession() method

### **Dataset**

        Dataset consists of two arrays **Queries** and **Options** as shown below

```javascript
var ichatbotDataset = {
    "Queries": [{
            "ID": "1",
            "Query": "Select a service",
            "Options": "101,102",
            "Type": "",
            "QueryID": "",
            "SearchInQueries": false,
            "SearchKeywords": "",
            "FireSubscribedEvent": false,
            "Validation": "",
            "ValidationErrorMsg": ""
        },
        {
            "ID": "2",
            "Query": "Select type of mobile service",
            "Options": "103,104",
            "Type": "",
            "QueryID": "",
            "SearchInQueries": false,
            "SearchKeywords": "",
            "FireSubscribedEvent": false,
            "Validation": "",
            "ValidationErrorMsg": ""
        }
    ]
    "Options": [{
            "ID": "101",
            "Text": "Mobile",
            "Type": "Button",
            "URL": "",
            "Query": "2",
            "FireSubscribedEvent": true
        },
        {
            "ID": "102",
            "Text": "Landline",
            "Type": "Button",
            "URL": "",
            "Query": "",
            "FireSubscribedEvent": false
        }
    ]
}
```

### **Queries**

01. **ID**
        A unique identifier that accepts input as an integer **OR** character **OR** combination of both

02. **Query**
        Can be a simple text **OR** HTML

```javascript
   "Query": "Please select from below"; ** OR **
       "Query": "<b>Please select from below </b>";
```

03. **Options**
        Multiple option ID's seperated by ', ' 

        "Options": "103, 104"

04. **Type**

        "Type" can be **""** **OR** **"Text"** **OR** **"File"** **OR** **"MultipleFiles"**

        When "Type" is **""**, query will be displayed with options(if provided)
 
        When "Type" is **Text**, enables user to enter text input

        When "Type" is **File**, enables user to upload single file

        When "Type" is **MultipleFiles**, enables user to upload multiple files

05. **Validation**

        When "Type" is **Text**, provide Regex expression as below

        "Validation": "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$" **OR** "Validation": "^([0|\+[0-9]{1, 5})?([7-9][0-9]{9})$"

        When query "Type" is **File** **OR** **MultipleFiles**, provide file extension seperated by ', ' as below

        "Validation": ".js, .css"

06. **ValidationErrorMsg**

        This property takes simple text as input and gets displayed above textbox/file upload control when validation fails 

        "ValidationErrorMsg": "Invalid email" **OR** "ValidationErrorMsg": "Supported .png extension"

        *Note* recommended to provide text less than 50 characters for better UI

         In case ValidationErrorMsg is empty, default messages will be shown

07. **SearchInQueries**              
    **SearchKeywords**

        These two properties work in sync. SearchInQueries takes true **OR** false as input.

        if "SearchInQueries" = true && "Type" = "Text" then the text entered by the user will be matched against all the "SearchKeywords" in the Queries array

        if search is found then matched Query will be loaded else "Keyword not found" message will be displayed then --> "QueryID" is loaded if not null, if "QueryID" is null then the same query will be loaded. This flow can be paused by using e.stop() (go through the examples for more details)

08. **QueryID**

        This is typically the next query to be loaded. The case when "Type" = Text is explained above

        It works similarly for all types of queries

09. **FireSubscribedEvent**

        in case "FireSubscribedEvent" = true the subscribed events will be fired

```javascript
   ichatbot.initialize(ichatbotconfig, dataset);

   //Subscribing to UserInput Entered, User Button Click, Chat Reset, Chat Close events
   var userTextEvent = function UserText(e) {
       console.log('ichatbot : user text input event fired')
       console.log(e.chatSession);
       console.log(e.userInput);
       console.log(e.searchFailed);

       // In case you want to execute own logic on search failed
       // e.stop() will stop the default functionality of showing "Keyword not found" message --> calling the configured query --> adding "text entered" in chat session
       // if (e.searchFailed) {
       //     e.stop();
       //     ichatbot.loadQuery(1);
       // }
   }

   var fileUploadEvent = function fileUpload(e) {
       console.log('ichatbot : file upload event fired')
       console.log(e.files);
       console.log(e.chatSession);

       // In case you want to execute your own logic
       // e.stop() will stop the default functionality of showing "File Upload Success" message --> calling the configured query--> adding "file uploaded" in chat session

       e.stop();

       ichatbot.simpleQuery("<b>File Uploaded Sucessfully</b>")
       ichatbot.loadQuery(5);
   }

   var buttonClickEvent = function buttonClick(chatSession) {
       console.log('ichatbot : user button click event fired')
       console.log(chatSession);

       //Fetchhing selected option
       console.log(chatSession.pop());
   }

   var resetEvent = function reset(chatSession) {
       console.log('ichatbot : chat reset event fired')
       console.log(chatSession);
   }

   var closeEvent = function close(chatSession) {
       console.log('ichatbot : chat close event fired')
       console.log(chatSession);
   }

   ichatbot.subscribeEvent(userTextEvent, buttonClickEvent, resetEvent, closeEvent, fileUploadEvent);
```

### **Options**

01. **ID**

        Unique identifier can be integer **OR** character **OR** combination of both

02. **Type**

        "Type" can be "Button" **OR** "Link"
 
03. **Text**

        Display text for "Button" **OR** "Link"

04. **URL**

        Valid when "Type" is link

05. **Query**

        Valid when "Type" is ""Button. Loads the "Query" when buton is selected by user

        "Query" ="1" **OR** "Query" = "2"

06. **FireSubscribedEvent**

        Valid when "Type" is "Button". The subscribed event will be fired

---

### **Methods**

01. **initialize(config, dataset, initialqueryID(nullable))**

        Initializes the chatbot.

02. **loadQuery(QueryID)**

        Loads the query based on provided argument

03. **openChatBot()**

04. **closeChatBot()**

        closeChatBot() will close the chatbot           
        closeChatBot(**false**) will not load the InitialQuery     

05. **resetChat()**

        resetChat() will reset the chatbot and loads the InitialQueryID              
        resetChat(**false**) will reset the chatbot and not load the InitialQuery

06. **subscribeEvent()**

        Pass the events as arguments

        subscribeEvent(userTextEvent, buttonClickEvent, resetEvent, closeEvent, fileUploadEvent); 

07. **simpleQuery()**

        This will enable you to provide a simple message to the user. Takes **text** **OR** **HTML** as input
   

```javascript
   simpleQuery("Welcome to ichatbot");
   simpleQuery("<b>Welcome to ichatbot</b>");
```

08. **getChatSession()**

        iChatbot maintains all the user activity and can be retrieved by using this method

09. **showLoader()**

        showLoader() display the loader and will be hidden only on calling hideLoader()                                          
        showLoader(**2000**) diplays loader for 2000 milli seconds

10. **showErrorMsg()**

        Displays error message on top of textbox/fileupload.

        showErrorMsg("This is error");
        showErrorMsg(""); for removing the message

11. **getDataset()**
        Returns the dataset passed as part of initialize()

12. **updateDataset()**

        Update the entire Dataset

```javascript
     function updateDataset() {
         var dataset = ichatbot.getDataset();
         dataset.Queries.push({
             "ID": "100",
             "Query": "update dataset",
             "Options": "300",
             "Type": "",
             "QueryID": "",
             "SearchInQueries": false,
             "SearchKeywords": "",
             "FireSubscribedEvent": false,
             "Validation": "",
             "ValidationErrorMsg": ""
         });

         dataset.Options.push({
             "ID": "300",
             "Text": "Mobile",
             "Type": "Button",
             "URL": "",
             "Query": "",
             "FireSubscribedEvent": true
         });

         ichatbot.resetChat(false);
         ichatbot.loadQuery(100);
     }
```

---
