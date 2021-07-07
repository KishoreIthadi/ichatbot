## **iChatBot**

<img src="images/complex.gif" width="49%" height="50%">  <img src="images/fileupload.gif" width="49%" height="50%">

---

### **Table of Contents**
* [What is **iChatBot**?](#what-is-iChatBot?)
* [Installation](#Installation)
    * [1. NPM-Angular](#1.-NPM-Angular)
    * [2. HTML](#2.-HTML)
* [iChatbotConfig.js](#iChatbotConfig.js)
* [Workflows](#Add-Remove-Project-Reference)
    * [Simple Workflow](#Add-Remove-DLL-Reference)
    * [Complex Workflow](#Add/Remove-Nuget-packages)
    * [File Upload Workflow](#Publish-Project)
* [License](#license)

---

### **What is iChatBot?**

iChatBot is a fully customizable javascript library that enables you to create a chatbot with various workflows in a very short time.

---

### **Installation**

#### **1. NPM Angular**

```bash
npm install --save ichatbot
```

Add styles and scripts in **angular.json** 

```json
"styles": [
  "node_modules/ichatbot/ichatbot-v1.0.0.min.css"
],
"scripts": [
  "node_modules/ichatbot/ichatbot-v1.0.0.js",
  "node_modules/ichatbot/src/dataset-Basic-WorkFlow.js"
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

declare var iChatBot: any;
declare var iChatBotConfig: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';

  ngOnInit() {

    var iChatBotDataset =
    {
      "Queries":
        [
          {
            "ID": "1",
            "Query": "Welcome to chatbot",
            "Options": "101",
            "Type": "Link",
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
            "URL": "https://github.com/KishoreIthadi/iChatbot#readme",
            "Query": "",
            "FireSubscribedEvent": false
          }
        ]
    }

    iChatBot.Initialize(iChatBotConfig, iChatBotDataset);
  }
}
```
---

#### **2. HTML**

Download iChatBot.js, iChatBotConfig.js & iChatBotStyle.css from below link and add it to your project.

```link
https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css
```

Add link and script in head section
```html
<head>
    <!-- Font-Awesome is for appying default icons, please update as per your requirement -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">

    <link rel="stylesheet" href="iChatBotStyle.css">

    <script src="iChatBot.js"></script>
    <script src="iChatBotConfig.js"></script>
</head>
```

Add below in body section
```html
<body>
    <div id="ichatbot-div">
    </div>

    <script>
        var iChatBotDataset =
        {
            "Queries":
                [
                    {
                        "ID": "1",
                        "Query": "Welcome to chatbot",
                        "Options": "101",
                        "Type": "Link",
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
                        "URL": "https://github.com/KishoreIthadi/iChatbot#readme",
                        "Query": "",
                        "FireSubscribedEvent": false
                    }
                ]
        }
        // iChatBotConfig is loaded from iChatBotConfig.js
        iChatBot.Initialize(iChatBotConfig, iChatBotDataset, null);

        //Subscribing to events
        var userTextEvent = function UserText(chatSession) {
            console.log('ichatbot : user text input event fired')
            console.log(chatSession);
        }

        var buttonClickEvent = function ButtonClick(chatSession) {
            console.log('ichatbot : user button click event fired')
            console.log(chatSession);
        }

        var resetEvent = function Reset(chatSession) {
            console.log('ichatbot : chat reset event fired')
            console.log(chatSession);
        }

        var closeEvent = function Close(chatSession) {
            console.log('ichatbot : chat close event fired')
            console.log(chatSession);
        }

        var fileUploadEvent = function FileUpload(files, chatSession) {
            console.log('ichatbot : file upload event fired')
            console.log(files);
            console.log(chatSession);

            iChatBot.SimpleQuery("<b>File Uploaded Sucessfully</b>")
            iChatBot.LoadQuery(5);

            console.log(iChatBot.GetChatSession());
        }

        iChatBot.SubscribeEvent(userTextEvent, buttonClickEvent, resetEvent, closeEvent, fileUploadEvent);
    </script>
</body>
```

---

### **iChatbotConfig.js**

---
