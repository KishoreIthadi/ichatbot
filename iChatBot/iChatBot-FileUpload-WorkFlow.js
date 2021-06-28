var iChatBotDataset =
{
  "Queries":
    [
      {
        "ID": "1",
        "Query": "Please select from below",
        "Options": "101,102",
        "Type": "",
        "QueryID": "",
        "SearchInQueries": false,
        "SearchKeywords": "",
        "FireSubscribedEvent": false,
        "Regex": ""
      },
      {
        "ID": "2",
        "Query": "Please select from below",
        "Options": "103,104",
        "Type": "",
        "QueryID": "",
        "SearchInQueries": false,
        "SearchKeywords": "",
        "FireSubscribedEvent": false,
        "Regex": ""
      },
      {
        "ID": "3",
        "Query": "Please provide your mobile number",
        "Options": "",
        "Type": "Text",
        "QueryID": "4",
        "SearchInQueries": false,
        "SearchKeywords": "",
        "FireSubscribedEvent": false,
        "Regex": "^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$"
      },
      {
        "ID": "4",
        "Query": "Please upload your recent bill",
        "Options": "",
        "Type": "file",
        "QueryID": "",
        "SearchInQueries": false,
        "SearchKeywords": "",
        "FireSubscribedEvent": true,
        "Regex": ""
      },
      {
        "ID": "5",
        "Query": "Our execute will reach out to you within 2 hours",
        "Options": "",
        "Type": "",
        "QueryID": "6",
        "SearchInQueries": false,
        "SearchKeywords": "",
        "FireSubscribedEvent": false,
        "Regex": ""
      },
      {
        "ID": "6",
        "Query": "Thank you for reaching out to us!!!",
        "Options": "",
        "Type": "",
        "QueryID": "",
        "SearchInQueries": false,
        "SearchKeywords": "",
        "FireSubscribedEvent": false,
        "Regex": ""
      }
    ],
  "Options":
    [
      {
        "ID": "101",
        "Text": "BroadBand",
        "Type": "Button",
        "URL": "",
        "Query": "2",
        "FireSubscribedEvent": false
      },
      {
        "ID": "102",
        "Text": "DTH",
        "Type": "Button",
        "URL": "",
        "Query": "",
        "FireSubscribedEvent": false
      },
      {
        "ID": "103",
        "Text": "New Connection",
        "Type": "Button",
        "URL": "",
        "Query": "",
        "FireSubscribedEvent": false
      },
      {
        "ID": "104",
        "Text": "Not Working",
        "Type": "Button",
        "URL": "",
        "Query": "3",
        "FireSubscribedEvent": false
      }
    ]
}
