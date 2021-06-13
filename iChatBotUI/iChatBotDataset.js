var iChatBotDataset =
{
  "Queries":
    [
      {
        "ID": "1",
        "Query": "Select a service",
        "Response": "101,102,103",
        "Enabletext": "FALSE"
      },
      {
        "ID": "2",
        "Query": "Select type of service",
        "Response": "104,105",
        "Enabletext": "FALSE"
      },
      {
        "ID": "3",
        "Query": "Reffer below links for more details",
        "Response": "106,107",
        "Enabletext": "FALSE"
      },
      {
        "ID": "4",
        "Query": "Do you need more information?",
        "Response": "108,109",
        "Enabletext": "FALSE"
      },
      {
        "ID": "5",
        "Query": "Thank you for reaching out to us!!!",
        "Response": "",
        "Enabletext": "FALSE"
      }
    ],
  "Responses":
    [
      {
        "ID": "101",
        "Response": "Mobile",
        "Type": "Button",
        "Query": "2",
        "FireSubscribedEvent": "False",
      },
      {
        "ID": "102",
        "Response": "Landline",
        "Type": "Button",
        "Query": "",
        "FireSubscribedEvent": "False"
      },
      {
        "ID": "103",
        "Response": "BroadBand",
        "Type": "Button",
        "Query": "",
        "FireSubscribedEvent": "False"
      },
      {
        "ID": "104",
        "Response": "Prepaid",
        "Type": "Button",
        "Query": "",
        "FireSubscribedEvent": "False"
      },
      {
        "ID": "105",
        "Response": "Postpaid",
        "Type": "Button",
        "Query": "3",
        "FireSubscribedEvent": "False"
      },
      {
        "ID": "106",
        "Response": "http://google.com",
        "LinkTitle": "link1",
        "Type": "Link",
        "Query": "4",
        "FireSubscribedEvent": "False"
      },
      {
        "ID": "107",
        "Response": "http://yahoo.com",
        "LinkTitle": "link2",
        "Type": "Link",
        "Query": "4",
        "FireSubscribedEvent": "False"
      },
      {
        "ID": "108",
        "Response": "Yes",
        "Type": "Button",
        "Query": "1",
        "FireSubscribedEvent": "False"
      },
      {
        "ID": "109",
        "Response": "No",
        "Type": "Button",
        "Query": "5",
        "FireSubscribedEvent": "False"
      }
    ]
}
