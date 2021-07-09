var iChatBotDataset_CWF =
{
  "Queries":
    [
      {
        "ID": "1",
        "Query": "Enter a keyword to begin",
        "Options": "",
        "Type": "Text",
        "QueryID": "",
        "SearchInQueries": true,
        "SearchKeywords": "",
        "FireSubscribedEvent": true,
        "Validation": "",
        "ValidationErrorMsg": ""
      },
      {
        "ID": "2",
        "Query": "Please select from below",
        "Options": "101,102",
        "Type": "",
        "QueryID": "",
        "SearchInQueries": false,
        "SearchKeywords": "Credit Card, CreditCard",
        "FireSubscribedEvent": false,
        "Validation": "",
        "ValidationErrorMsg": ""
      },
      {
        "ID": "3",
        "Query": "Do you want to apply for a new credit card",
        "Options": "103,104",
        "Type": "",
        "QueryID": "",
        "SearchInQueries": false,
        "SearchKeywords": "",
        "FireSubscribedEvent": false,
        "Validation": "",
        "ValidationErrorMsg": ""
      },
      {
        "ID": "4",
        "Query": "Select type of credit card",
        "Options": "105,106,107",
        "Type": "",
        "QueryID": "",
        "SearchInQueries": false,
        "SearchKeywords": "",
        "FireSubscribedEvent": false,
        "Validation": "",
        "ValidationErrorMsg": ""
      },
      {
        "ID": "5",
        "Query": "Please provide your mobile number",
        "Options": "",
        "Type": "Text",
        "QueryID": "6",
        "SearchInQueries": false,
        "SearchKeywords": "",
        "FireSubscribedEvent": false,
        "Validation": "^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$",
        "ValidationErrorMsg": ""
      },
      {
        "ID": "6",
        "Query": "Please provide your email",
        "Options": "",
        "Type": "Text",
        "QueryID": "7",
        "SearchInQueries": false,
        "SearchKeywords": "",
        "FireSubscribedEvent": false,
        "Validation": "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$",
        "ValidationErrorMsg": ""
      },
      {
        "ID": "7",
        "Query": "Our execute will reach out to you within 2 hours",
        "Options": "",
        "Type": "",
        "QueryID": "8",
        "SearchInQueries": false,
        "SearchKeywords": "",
        "FireSubscribedEvent": true,
        "Validation": "",
        "ValidationErrorMsg": ""
      },
      {
        "ID": "8",
        "Query": "Thank you for reaching out to us!!!",
        "Options": "",
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
        "Text": "Existing Customer",
        "Type": "Button",
        "URL": "",
        "Query": "",
        "FireSubscribedEvent": false
      },
      {
        "ID": "102",
        "Text": "New Customer",
        "Type": "Button",
        "URL": "",
        "Query": "3",
        "FireSubscribedEvent": false
      },
      {
        "ID": "103",
        "Text": "Yes",
        "Type": "Button",
        "URL": "",
        "Query": "4",
        "FireSubscribedEvent": false
      },
      {
        "ID": "104",
        "Text": "No",
        "Type": "Button",
        "URL": "",
        "Query": "",
        "FireSubscribedEvent": false
      },
      {
        "ID": "105",
        "Text": "Basic",
        "Type": "Button",
        "URL": "",
        "Query": "5",
        "FireSubscribedEvent": true
      },
      {
        "ID": "106",
        "Text": "Platinum",
        "Type": "Button",
        "URL": "",
        "Query": "",
        "FireSubscribedEvent": false
      },
      {
        "ID": "107",
        "Text": "Ultimate",
        "Type": "Button",
        "URL": "",
        "Query": "",
        "FireSubscribedEvent": true
      }
    ]
}
