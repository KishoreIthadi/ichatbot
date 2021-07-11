## **ichatbot**

<img src="images/complex.gif" width="49%" height="50%">  <img src="images/fileupload.gif" width="49%" height="50%">

---

### **Example Workflows**

<pre><big>
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
* [Workflows](#Add-Remove-Project-Reference)
    * [Simple Workflow](#Add-Remove-DLL-Reference)
    * [Complex Workflow](#Add/Remove-Nuget-packages)
    * [File Upload Workflow](#Publish-Project)
* [License](#license)

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

In your component

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

    //Subscribing to UserInput Entered, User Button Click, Chat Reset, Chat Close events
     var userTextEvent = function UserText(chatSession: any, event: any) {
        console.log('ichatbot : user text input event fired')
        console.log(chatSession);

        // In case you want to execute own logic when keyword is not found
        // event.stop() will stop the functionality of showing "Keyword not found" message and call the configured query
        if (event.searchFailed) {
            // event.stop();
          }
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

    var fileUploadEvent = function fileUpload(files: any, chatSession: any) {
      console.log('ichatbot : file upload event fired')
      console.log(files);
      console.log(chatSession);

      ichatbot.simpleQuery("<b>File Uploaded Sucessfully</b>")
      ichatbot.loadQuery(5);

      console.log(ichatbot.getChatSession());
    }

    ichatbot.subscribeEvent(userTextEvent, buttonClickEvent, resetEvent, closeEvent, fileUploadEvent);

    // function getDataset(dataset) {
    //   console.log(ichatbot.getDataset());
    // }

    // function updateDataset() {
    //   var dataset = ichatbot.getDataset();
    //         dataset.Queries.push({
    //             "ID": "100",
    //             "Query": "update dataset",
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
    //             "Text": "Mobile",
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

Download ichatbot.js, ichatbotconfig.js & ichatbotstyle.css from below link and add it to your project.

```link
https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css
```

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
     var userTextEvent = function UserText(chatSession, event) {
        console.log('ichatbot : user text input event fired')
        console.log(chatSession);

        // In case you want to execute own logic when keyword is not found
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

    // function getDataset(dataset) {
    //   console.log(ichatbot.getDataset());
    // }

    // function updateDataset() {
    //   var dataset = ichatbot.getDataset();
    //         dataset.Queries.push({
    //             "ID": "100",
    //             "Query": "update dataset",
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
    //             "Text": "Mobile",
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

   User text input minimum and maximum character lenght. The text box border will be red if this criteria is not met

3. **IChatBotCSSClass: "class1 class2"**

   These css classes will be applied to chatbot by overriding default styles applied to outermost div, specify multiple classes seperated by space

4. **DisableSelectedButton: true**

   Whether the clickable option/button should be disabled after user clicks on it

5. **TitleIconFAClass: "fa fa-info blue-color"**
   **TitleImagePath: ""**
   **TitleImageCSSClass: ""**

   Icon displayed on top left of chatbot
   Set either TitleIconFAClass (font-awesome class) **or** TitleImagePath along with TitleImageCSSClass(optional) as below

   **TitleIconFAClass: ""**
   **TitleImagePath: "~/images/tiltleicon.png"**
   **TitleImageCSSClass: "class1 class2"**

   The above is applicable for Resets, Close, FloatingIcon, ChatQueryIcon, ChatUserInputIcon

6. **SearchNotFoundMsg: "Keyword not found!!"**

   If not provided a default message will be shown

7. **ResetChatHistoryOnReset: true**
   **ResetChatHistoryOnClose: true**

   by default all the activity is stored in sequential order and this can be accessed by calling getChatSession() method

### **Dataset**

Dataset consists of two arrays queries and oprions as shown below

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

---
