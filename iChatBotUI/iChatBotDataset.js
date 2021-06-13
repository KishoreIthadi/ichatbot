var iChatBotDataset =
{
  "Queries":
    [
      {
        "ID": "1",
        "Query": "Select a service",
        "Response": "101,102,103",
        "Enabletext": false,
        "QueryID": ""
      },
      {
        "ID": "2",
        "Query": "Select type of service",
        "Response": "104,105",
        "Enabletext": false,
        "QueryID": ""
      },
      {
        "ID": "3",
        "Query": "Reffer below links for more details",
        "Response": "106,107",
        "Enabletext": false,
        "QueryID": "4"
      },
      {
        "ID": "4",
        "Query": "Do you need more information?",
        "Response": "108,109",
        "Enabletext": false,
        "QueryID": ""
      },
      {
        "ID": "5",
        "Query": "Thank you for reaching out to us!!!",
        "Response": "",
        "Enabletext": false,
        "QueryID": ""
      }
    ],
  "Responses":
    [
      {
        "ID": "101",
        "Response": "Mobile",
        "Type": "Button",
        "Query": "2",
        "FireSubscribedEvent": true,
      },
      {
        "ID": "102",
        "Response": "Landline",
        "Type": "Button",
        "Query": "",
        "FireSubscribedEvent": false
      },
      {
        "ID": "103",
        "Response": "BroadBand",
        "Type": "Button",
        "Query": "",
        "FireSubscribedEvent": false
      },
      {
        "ID": "104",
        "Response": "Prepaid",
        "Type": "Button",
        "Query": "",
        "FireSubscribedEvent": false
      },
      {
        "ID": "105",
        "Response": "Postpaid",
        "Type": "Button",
        "Query": "3",
        "FireSubscribedEvent": true
      },
      {
        "ID": "106",
        "Response": "http://google.com",
        "LinkTitle": "link1",
        "Type": "Link",
        "Query": "",
        "FireSubscribedEvent": false
      },
      {
        "ID": "107",
        "Response": "http://yahoo.com",
        "LinkTitle": "link2",
        "Type": "Link",
        "Query": "",
        "FireSubscribedEvent": false
      },
      {
        "ID": "108",
        "Response": "Yes",
        "Type": "Button",
        "Query": "1",
        "FireSubscribedEvent": false
      },
      {
        "ID": "109",
        "Response": "No",
        "Type": "Button",
        "Query": "5",
        "FireSubscribedEvent": true
      }
    ]
}
