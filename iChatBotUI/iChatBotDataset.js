var iChatBotDataset =
{
  "Queries":
    [
      {
        "ID": "1",
        "Query": "Please select a device",
        "Response": "101,102,103",
        "Enabletext": "FALSE",
        "Bold": "TRUE"
      },
      {
        "ID": "2",
        "Query": "Please enter mobile number",
        "Enabletext": "TRUE",
        "Bold": "TRUE"
      },
      {
        "ID": "3",
        "Query": "Please enter telephone number",
        "Enabletext": "TRUE",
        "Bold": "FALSE"
      },
      {
        "ID": "4",
        "Query": "Please enter broadband customer id",
        "Enabletext": "TRUE",
        "Bold": "TRUE"
      },
      {
        "ID": "5",
        "Query": "Invalid mobile number",
        "Enabletext": "TRUE",
        "Bold": "FALSE"
      }
    ],
  "Responses":
    [
      {
        "ID": "101",
        "Response": "Mobile",
        "Type": "Option",
        "Query": "2",
        "FireSubscribedEvent": "TRUE",
      },
      {
        "ID": "102",
        "Response": "Landline",
        "Type": "Option",
        "Query": "3",
        "FireSubscribedEvent": "TRUE"
      },
      {
        "ID": "103",
        "Response": "BroadBand",
        "Type": "Option",
        "Query": "4",
        "FireSubscribedEvent": "TRUE"
      }
    ]
}
