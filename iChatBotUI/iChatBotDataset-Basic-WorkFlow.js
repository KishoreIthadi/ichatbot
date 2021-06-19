var iChatBotDataset =
{
  "Queries":
    [
      {
        "ID": "1",
        "Query": "Select a service",
        "Response": "101,102,103",
        "Enabletext": false,
        "QueryID": "",
        "SearchInQueries": false,
        "SearchKeywords": "",
        "FireTextChangeEvent": false
      },
      {
        "ID": "2",
        "Query": "Select type of mobile service",
        "Response": "104,105",
        "Enabletext": false,
        "QueryID": "",
        "SearchInQueries": false,
        "SearchKeywords": "",
        "FireTextChangeEvent": false
      },
      {
        "ID": "3",
        "Query": "Refer below links for more details",
        "Response": "106,107",
        "Enabletext": false,
        "QueryID": "4",
        "SearchInQueries": false,
        "SearchKeywords": "",
        "FireTextChangeEvent": false
      },
      {
        "ID": "4",
        "Query": "Do you need more information?",
        "Response": "108,109",
        "Enabletext": false,
        "QueryID": "",
        "SearchInQueries": false,
        "SearchKeywords": "",
        "FireTextChangeEvent": false
      },
      {
        "ID": "5",
        "Query": "Thank you for reaching out to us!!!",
        "Response": "",
        "Enabletext": false,
        "QueryID": "",
        "SearchInQueries": false,
        "SearchKeywords": "",
        "FireTextChangeEvent": false
      }
    ],
  "Responses":
    [
      {
        "ID": "101",
        "Response": "Mobile",
        "Type": "Button",
        "LinkTitle": "",
        "Query": "2",
        "FireSubscribedEvent": true
      },
      {
        "ID": "102",
        "Response": "Landline",
        "Type": "Button",
        "LinkTitle": "",
        "Query": "",
        "FireSubscribedEvent": false
      },
      {
        "ID": "103",
        "Response": "BroadBand",
        "Type": "Button",
        "LinkTitle": "",
        "Query": "",
        "FireSubscribedEvent": false
      },
      {
        "ID": "104",
        "Response": "Prepaid",
        "Type": "Button",
        "LinkTitle": "",
        "Query": "",
        "FireSubscribedEvent": false
      },
      {
        "ID": "105",
        "Response": "Postpaid",
        "Type": "Button",
        "LinkTitle": "",
        "Query": "3",
        "FireSubscribedEvent": true
      },
      {
        "ID": "106",
        "Response": "http://google.com",
        "Type": "Link",
        "LinkTitle": "link1",
        "Query": "",
        "FireSubscribedEvent": false
      },
      {
        "ID": "107",
        "Response": "http://yahoo.com",
        "Type": "Link",
        "LinkTitle": "link2",
        "Query": "",
        "FireSubscribedEvent": false
      },
      {
        "ID": "108",
        "Response": "Yes",
        "Type": "Button",
        "LinkTitle": "",
        "Query": "1",
        "FireSubscribedEvent": false
      },
      {
        "ID": "109",
        "Response": "No",
        "Type": "Button",
        "LinkTitle": "",
        "Query": "5",
        "FireSubscribedEvent": true
      }
    ]
}
