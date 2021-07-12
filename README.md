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
    * [1. NPM-Angular](#1-NPM-Angular)
    * [2. HTML](#2-HTML)
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
import { Component } from '@angular/core';

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

    var ichatbotDataset =
    {
      "Queries":
        [
          {
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
          }
        ],
      "Options":
        [
          {
            "ID": "101",
            "Text": "Documentation",
            "Type": "Link",
            "URL": "https://github.com/KishoreIthadi/ichatbot",
            "Query": "",
            "FireSubscribedEvent": false
          }
        ]
    }

    ichatbot.initialize(ichatbotconfig, ichatbotDataset);

    // ichatbotconfig is loaded from ichatbotconfig.js, script is added in header section
    ichatbot.initialize(ichatbotconfig, dataset, null);

    //Subscribing to UserInput Entered, User Button Click, Chat Reset, Chat Close events
    var userTextEvent = function UserText(event: any) {
      console.log('ichatbot : user text input event fired')
      console.log(event.chatSession);
      console.log(event.chatSession);

      // In case you want to execute own logic on search failed
      // event.stop() will stop the default functionality of showing "Keyword not found" message --> calling the configured query --> adding "text entered" in chat session
      // if (event.searchFailed) {
      //     event.stop();
      //     ichatbot.loadQuery(1);
      // }
    }

    var fileUploadEvent = function fileUpload(event: any) {
      console.log('ichatbot : file upload event fired')
      console.log(event.files);
      console.log(event.chatSession);

      // In case you want to execute your own logic
      // event.stop() will stop the default functionality of showing "File Upload Success" message --> calling the configured query--> adding "file uploaded" in chat session

      event.stop();

      ichatbot.simpleQuery("<b>File Uploaded Sucessfully</b>")
      ichatbot.loadQuery(5);
    }

    var buttonClickEvent = function buttonClick(chatSession: any) {
      console.log('ichatbot : user button click event fired')
      console.log(chatSession);
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
    var ichatbotDataset =
    {
      "Queries":
        [
          {
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
          }
        ],
      "Options":
        [
          {
            "ID": "101",
            "Text": "Documentation",
            "Type": "Link",
            "URL": "https://github.com/KishoreIthadi/ichatbot",
            "Query": "",
            "FireSubscribedEvent": false
          }
        ]
    }

    ichatbot.initialize(ichatbotconfig, ichatbotDataset);

    //Subscribing to UserInput Entered, User Button Click, Chat Reset, Chat Close events
    var userTextEvent = function UserText(event) {
      console.log('ichatbot : user text input event fired')
      console.log(event.chatSession);
      console.log(event.chatSession);

      // In case you want to execute own logic on search failed
      // event.stop() will stop the default functionality of showing "Keyword not found" message --> calling the configured query --> adding "text entered" in chat session
      // if (event.searchFailed) {
      //     event.stop();
      //     ichatbot.loadQuery(1);
      // }
    }

    var fileUploadEvent = function fileUpload(event) {
      console.log('ichatbot : file upload event fired')
      console.log(event.files);
      console.log(event.chatSession);

      // In case you want to execute your own logic
      // event.stop() will stop the default functionality of showing "File Upload Success" message --> calling the configured query--> adding "file uploaded" in chat session

      event.stop();

      ichatbot.simpleQuery("<b>File Uploaded Sucessfully</b>")
      ichatbot.loadQuery(5);
    }

    var buttonClickEvent = function buttonClick(chatSession) {
      console.log('ichatbot : user button click event fired')
      console.log(chatSession);
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

    </script>
</body>
```

---

### **ichatbotconfig.js**

The following image explains most of the properties

<img src="images/ichatbotconfig.png">

1. **IntialQueryID: "1"**
    
   Query to be loaded initially, you can also set this while initializing ichatbot
   
   ichatbot.initialize(config, dataset, IntialQueryID);

2. **UserInputMinLen: "5"**   
   **UserInputMaxLen": "50"**

   User text input minimum and maximum character length. The text box border will be red if this criteria is not met
   
3. **FileMaxSize: "10485760"**   

   User file upload mazximum size in bytes

3. **IChatBotCSSClass: "class1 class2"**

   These css classes will be applied to chatbot outermost div by overriding default styles, specify multiple classes separated by space

4. **DisableSelectedButton: true**

   Whether the clickable option/button should be disabled after user clicks on it

5. **TitleIconFAClass: "fa fa-info blue-color"**
   **TitleImagePath: ""**
   **TitleImageCSSClass: ""**

   Icon displayed on top left of chatbot
   
   Set either TitleIconFAClass (font-awesome class) **OR** TitleImagePath along with TitleImageCSSClass(optional) as below

   **TitleIconFAClass: ""**
   **TitleImagePath: "~/images/tiltleicon.png"**
   **TitleImageCSSClass: "class1 class2"**

   The above is applicable for Reset, Close, FloatingIcon, ChatQueryIcon, ChatUserInputIcon properties

6. **SearchNotFoundMsg: "Keyword not found!!"**

   If not provided a default message will be shown

7. **ResetChatHistoryOnReset: true**
   **ResetChatHistoryOnClose: true**

   by default all the activity is stored in sequential order and this can be accessed by calling getChatSession() method

### **Dataset**

Dataset consists of two arrays queries and options as shown below

```javascript
var ichatbotDataset =
{
  "Queries":
    [
      {
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
  "Options":
    [
      {
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

1. **ID**

   A unique identifier that accepts input as an integer or character or combination of both

   Can also be provided as part of initialization 

```
ichatbot.initialize(ichatbotconfig, dataset, null);
```

2. **Query**

   Can be a simple text **OR** HTML
    
   ```
   "Query" : "Please select from below" **OR**
   "Query" : "<b>Please select from below </b>"
   ```

3. **Options**

   Multiple option ID's seperated by ',' "Options": "103,104"

4. **Type**

   "Type" can be **Text**  **OR** **File**  **OR** **MultipleFiles**

   When "Type" is **Text**, enables user to upload text input

   When "Type" is **File**, enables user to upload single file

   When "Type" is **MultipleFiles**, enables user to upload multiple files

5. **Validation**

   When "Type" is **Text**, provide Regex expression as below

   "Validation": "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$" **OR** "Validation": "^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$"

   When query "Type" is **File** **OR** **MultipleFiles**, provide file extension seperated by ',' as below

   "Validation": ".js,.css"

6. **ValidationErrorMsg**

   This property takes simple text as input and will be displayed above textbox/file upload controls when validation is failed 

   "ValidationErrorMsg": "Invalid email" **OR** "ValidationErrorMsg": "Supported .png extension"

   *Note* recommended to provide text less than 50 characters for better UI
    
   In case ValidationErrorMsg is empty, default messages will be shown to the user upon failed validation

7. **SearchInQueries** && 8. **SearchKeywords**

   These two properties work in sync. SearchInQueries takes true or false as input.

   if "SearchInQueries" = true && "Type" = "Text" then the text entered by the user will be matched against all the "SearchKeywords" in the Queries array

   if search is found then matched Query will be loaded else "Keyword not found" message will be displayed then --> "QueryID" is loaded if not null, if "QueryID" is null then the same query will be loaded

9. **QueryID**

   This is typically the next query to be loaded. The case when "Type" = Text is explained above

   In case of "Type" = "File" **OR** "MultipleFiles" --> "QueryID" propery is not valid

10. **FireSubscribedEvent**

   in case "FireSubscribedEvent" = true the subscribed events will be fired

``` javascript
ichatbot.initialize(ichatbotconfig, dataset);

//Subscribing to UserInput Entered, User Button Click, Chat Reset, Chat Close events

var userTextEvent = function UserText(chatSession, event) {
  console.log('ichatbot : user text input event fired')
  console.log(chatSession);

  // In case you want to execute your logic when keyword is not found
  // event.stop() will stop the functionality of showing "Keyword not found" message and call the configured query
  if (event.searchFailed) {
      // event.stop();
      }
}           

var buttonClickEvent = function buttonClick(chatSession) {
  console.log('ichatbot : user button click event fired')
  console.log(chatSession);
}

var resetEvent = function reset(chatSession) {
  console.log('ichatbot : chat reset event fired')
  console.log(chatSession);
}

var closeEvent = function close(chatSession) {
  console.log('ichatbot : chat close event fired')
  console.log(chatSession);
}

var fileUploadEvent = function fileUpload(files, chatSession) {
  console.log('ichatbot : file upload event fired')
  console.log(files);
  console.log(chatSession);

  ichatbot.simpleQuery("<b>File Uploaded Sucessfully</b>")
  ichatbot.loadQuery(5);

  console.log(ichatbot.getChatSession());
}

ichatbot.subscribeEvent(userTextEvent, buttonClickEvent, resetEvent, closeEvent, fileUploadEvent);         
```

### **Options**

1. **ID**

   Unique identifier can be integer **OR** character **OR** combination of both

2. **Type**

   "Type" can be "Button" **OR** "Link"
 
3. **Text**

   Display text for "Button" **OR** "Link"

4. **URL**

   Valid when "Type" is link

5. **Query**

   Valid when "Type" is ""Button. Loads the "Query" when buton is selected by user

   "Query" ="1" **OR** "Query" = "2"

6. **FireSubscribedEvent**

   Valid when "Type" is "Button". The subscribed event will be fired

---

### **Methods**

1. **initialize(config, dataset, initialqueryID(nullable))**

   Initializes the chatbot.

2. **loadQuery(QueryID)**

   Loads the query based on provided argument.

3. **openChatBot()**

4. **closeChatBot()**

   closeChatBot() will close the chatbot.
   closeChatBot(false) will not load the InitialQuery.

5. **resetChat()**

   resetChat() will reset the chatbot and loads the InitialQueryID
   resetChat(false) will reset the chatbot and not load the InitialQuery

6. **subscribeEvent()**

   Pass the events as arguments

   subscribeEvent(userTextEvent, buttonClickEvent, resetEvent, closeEvent, fileUploadEvent);

7. **simpleQuery()**

   This will enable you to provide a simple message to the user. Takes text or HTML as input.

   simpleQuery("Welcome to ichatbot");
   simpleQuery("<b>Welcome to ichatbot</b>");


8. **getChatSession()**

   iChatbot maintains all the user activity and can be retrieved by using this method

9. **showLoader()**

   showLoader() display the loader and will be hidden only on calling hideLoader()
   showLoader(2000) diplays loader for 2000 milli seconds

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
