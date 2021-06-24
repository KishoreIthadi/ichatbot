var iChatBotDataset =
{
  "Queries":
    [
      {
        "ID": "1",
        "Query": "Enter a keyword to begin",
        "Options": "",
        "Enabletext": true,
        "QueryID": "",
        "SearchInQueries": true,
        "SearchKeywords": "",
        "FireTextChangeEvent": false,
        "Regex": ""
      },
      {
        "ID": "2",
        "Query": "Please select from below",
        "Options": "101,102",
        "Enabletext": false,
        "QueryID": "",
        "SearchInQueries": false,
        "SearchKeywords": "Credit Card, CreditCard",
        "FireTextChangeEvent": false
      },
      {
        "ID": "3",
        "Query": "Do you want to apply for a new credit card",
        "Options": "103,104",
        "Enabletext": false,
        "QueryID": "",
        "SearchInQueries": false,
        "SearchKeywords": "",
        "FireTextChangeEvent": false
      },
      {
        "ID": "4",
        "Query": "Select type of credit card",
        "Options": "105,106,107",
        "Enabletext": false,
        "QueryID": "",
        "SearchInQueries": false,
        "SearchKeywords": "",
        "FireTextChangeEvent": false
      },
      {
        "ID": "5",
        "Query": "Please provide your mobile number",
        "Options": "",
        "Enabletext": true,
        "QueryID": "6",
        "SearchInQueries": false,
        "SearchKeywords": "",
        "FireTextChangeEvent": false,
        "Regex": ""
      },
      {
        "ID": "6",
        "Query": "Please provide your email",
        "Options": "",
        "Enabletext": true,
        "QueryID": "7",
        "SearchInQueries": false,
        "SearchKeywords": "",
        "FireTextChangeEvent": false,
        "Regex": "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
      },
      {
        "ID": "7",
        "Query": "Our execute will reach out to you within 2 hours",
        "Options": "",
        "Enabletext": false,
        "QueryID": "8",
        "SearchInQueries": false,
        "SearchKeywords": "",
        "FireTextChangeEvent": true
      },
      {
        "ID": "8",
        "Query": "Thank you for reaching out to us!!!",
        "Options": "",
        "Enabletext": false,
        "QueryID": "",
        "SearchInQueries": false,
        "SearchKeywords": "",
        "FireTextChangeEvent": false
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
