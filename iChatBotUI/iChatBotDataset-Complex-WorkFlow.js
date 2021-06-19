var iChatBotDataset =
{
  "Queries":
    [
      {
        "ID": "1",
        "Query": "Enter a keyword to begin",
        "Response": "",
        "Enabletext": true,
        "QueryID": "",
        "SearchInQueries": true,
        "SearchKeywords": "",
        "FireTextChangeEvent": false
      },
      {
        "ID": "2",
        "Query": "Please select from below",
        "Response": "101,102",
        "Enabletext": false,
        "QueryID": "",
        "SearchInQueries": false,
        "SearchKeywords": "Credit Card, CreditCard",
        "FireTextChangeEvent": false
      },
      {
        "ID": "3",
        "Query": "Do you want to apply for a new credit card",
        "Response": "103,104",
        "Enabletext": false,
        "QueryID": "",
        "SearchInQueries": false,
        "SearchKeywords": "",
        "FireTextChangeEvent": false
      },
      {
        "ID": "4",
        "Query": "Select type of credit card",
        "Response": "105,106,107",
        "Enabletext": false,
        "QueryID": "",
        "SearchInQueries": false,
        "SearchKeywords": "",
        "FireTextChangeEvent": false
      },
      {
        "ID": "5",
        "Query": "Please provide your mobile number",
        "Response": "",
        "Enabletext": true,
        "QueryID": "6",
        "SearchInQueries": false,
        "SearchKeywords": "",
        "FireTextChangeEvent": false
      },
      {
        "ID": "6",
        "Query": "Please provide your email",
        "Response": "",
        "Enabletext": true,
        "QueryID": "7",
        "SearchInQueries": false,
        "SearchKeywords": "",
        "FireTextChangeEvent": false
      },
      {
        "ID": "7",
        "Query": "Our execute will reach out to you within 2 hours",
        "Response": "",
        "Enabletext": false,
        "QueryID": "8",
        "SearchInQueries": false,
        "SearchKeywords": "",
        "FireTextChangeEvent": true
      },
      {
        "ID": "8",
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
        "Response": "Existing Customer",
        "Type": "Button",
        "LinkTitle": "",
        "Query": "",
        "FireSubscribedEvent": false
      },
      {
        "ID": "102",
        "Response": "New Customer",
        "Type": "Button",
        "LinkTitle": "",
        "Query": "3",
        "FireSubscribedEvent": false
      },
      {
        "ID": "103",
        "Response": "Yes",
        "Type": "Button",
        "LinkTitle": "",
        "Query": "4",
        "FireSubscribedEvent": false
      },
      {
        "ID": "104",
        "Response": "No",
        "Type": "Button",
        "LinkTitle": "",
        "Query": "",
        "FireSubscribedEvent": false
      },
      {
        "ID": "105",
        "Response": "Basic",
        "Type": "Button",
        "LinkTitle": "",
        "Query": "5",
        "FireSubscribedEvent": true
      },
      {
        "ID": "106",
        "Response": "Platinum",
        "Type": "Button",
        "LinkTitle": "",
        "Query": "",
        "FireSubscribedEvent": false
      },
      {
        "ID": "107",
        "Response": "Ultimate",
        "Type": "Button",
        "LinkTitle": "",
        "Query": "",
        "FireSubscribedEvent": true
      }
    ]
}
