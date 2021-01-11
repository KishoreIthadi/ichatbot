var queries =
  [
    {
      "ID": "1",
      "Query": "Please select a device",
      "Response": "101,102,103",
      "Enable text": "FALSE"
    },
    {
      "ID": "2",
      "Query": "Please enter mobile number",
      "Response": "101",
      "Enable text": "TRUE"
 
    },
    {
      "ID": "3",
      "Query": "Please enter telephone number",
      "Response": "102",
      "Enable text": "TRUE"
    },
    {
      "ID": "4",
      "Query": "Please enter broadband customer id",
      "Response": "103",
      "Enable text": "TRUE"
    }
  ]
 
var responses =
  [
    {
      "ID": "101",
      "Response": "Mobile",
      "Type": "Option",
      "Question": "2"
    },
    {
      "ID": "102", 
      "Response": "Landline", 
      "Type": "Option", 
      "Question": "3"
    },
    {
      "ID": "103", 
      "Response": "BroadBand", 
      "Type": "Option", 
      "Question": "4"
    },
    {
      "ID": "104", 
      "Response": "Invalid mobile number", 
      "Type": "Text", 
      "Question": "null"
    },
  ]