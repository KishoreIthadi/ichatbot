var iChatBotDataset =
{
  "Queries":
    [
      {
        "ID": "1",
        "Query": "Select a service",
        "Options": "101,102,103",
        "Enabletext": false,
        "QueryID": "",
        "SearchInQueries": false,
        "SearchKeywords": "",
        "FireTextChangeEvent": false,
        "Regex": ""
      },
      {
        "ID": "2",
        "Query": "Select type of mobile service",
        "Options": "104,105",
        "Enabletext": false,
        "QueryID": "",
        "SearchInQueries": false,
        "SearchKeywords": "",
        "FireTextChangeEvent": false,
        "Regex": ""
      },
      {
        "ID": "3",
        "Query": "Refer below links for more details",
        "Options": "106,107",
        "Enabletext": false,
        "QueryID": "4",
        "SearchInQueries": false,
        "SearchKeywords": "",
        "FireTextChangeEvent": false,
        "Regex": ""
      },
      {
        "ID": "4",
        "Query": "Do you need more information?",
        "Options": "108,109",
        "Enabletext": false,
        "QueryID": "",
        "SearchInQueries": false,
        "SearchKeywords": "",
        "FireTextChangeEvent": false,
        "Regex": ""
      },
      {
        "ID": "5",
        "Query": "Thank you for reaching out to us!!!",
        "Options": "",
        "Enabletext": false,
        "QueryID": "",
        "SearchInQueries": false,
        "SearchKeywords": "",
        "FireTextChangeEvent": false,
        "Regex": ""
      }
    ],
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
      },
      {
        "ID": "103",
        "Text": "BroadBand",
        "Type": "Button",
        "URL": "",
        "Query": "",
        "FireSubscribedEvent": false
      },
      {
        "ID": "104",
        "Text": "Prepaid",
        "Type": "Button",
        "URL": "",
        "Query": "",
        "FireSubscribedEvent": false
      },
      {
        "ID": "105",
        "Text": "Postpaid",
        "Type": "Button",
        "URL": "",
        "Query": "3",
        "FireSubscribedEvent": true
      },
      {
        "ID": "106",
        "Text": "link1",
        "Type": "Link",
        "URL": "http://google.com",
        "Query": "",
        "FireSubscribedEvent": false
      },
      {
        "ID": "107",
        "Text": "Link2",
        "Type": "Link",
        "URL": "http://yahoo.com",
        "Query": "",
        "FireSubscribedEvent": false
      },
      {
        "ID": "108",
        "Text": "Yes",
        "Type": "Button",
        "URL": "",
        "Query": "1",
        "FireSubscribedEvent": false
      },
      {
        "ID": "109",
        "Text": "No",
        "Type": "Button",
        "URL": "",
        "Query": "5",
        "FireSubscribedEvent": true
      }
    ]
}
