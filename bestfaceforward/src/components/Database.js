//enter this command to start local server: java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb -port 8001
//aws configure
//to check tables made locally run command: aws dynamodb list-tables --endpoint-url http://localhost:8001



let AWS = require("aws-sdk");
AWS.config.update({
  region: "us-west-1",
  //endpoint: "http://localhost:8001", //used for local dev
  endpoint: "https://dynamodb.us-west-1.amazonaws.com",
  // get from google drive
  accessKeyId : "AKIASHMG6SUNPE2LHDGQ",
  secretAccessKey: "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"
});
let dynamodb = new AWS.DynamoDB();
let docClient = new AWS.DynamoDB.DocumentClient();
let table = "Users"
let table2 = "Meetings"
let meetingsOutput = "placeholder"

module.exports = {
  createTable(tble = table){
    console.log(tble)
    var params = {
      TableName : tble,
      KeySchema: [
        //only put keys in here
        //Keytype Hash because they can be uniquely identified by username
        {AttributeName: "username", KeyType: "HASH"},
        //{AttributeName: "password", KeyType: "RANGE"},
      ],
      AttributeDefinitions: [
        //AttributeType S - string N- Number B- binary
        {AttributeName: "username", AttributeType: "S"},
        //  {AttributeName: "password", AttributeType: "S"},
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
      }
    };
    dynamodb.createTable(params, function(err, data) {
      if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
      }
    });

    params = {
      TableName : table2,
      KeySchema: [
        //only put keys in here
        //Keytype Hash because they can be uniquely identified by username
        {AttributeName: "id", KeyType: "HASH"},
        //{AttributeName: "password", KeyType: "RANGE"},
      ],
      AttributeDefinitions: [
        //AttributeType S - string N- Number B- binary
        {AttributeName: "id", AttributeType: "S"},
        //  {AttributeName: "password", AttributeType: "S"},
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
      }
    };
    dynamodb.createTable(params, function(err, data) {
      if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
      }
    });
  },

  //can change the hardcoded variables
  addUser(username = "test", password = "test", firstName = "test", lastName = "test", email = "test"){
    //change this part to recieve input
    //  var company = "UCSB";
    var isInterviewer = true;
    var isRecruiter = false;
    var meetings = [];

    var params = {
      TableName:table,
      Item:{
        "username": username,
        "password": password,
        "info":{
          "firstname": firstName,
          "lastname": lastName,
          //  "company": company,
          "email": email,
          "interviewer": isInterviewer,
          "recruit": isRecruiter
        },
        "meetings": meetings

      }
    };

    console.log("Adding a new item...");
    docClient.put(params, function(err, data) {
      if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        return 0;
      } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
        return 1;
      }
    });
  },

  deleteUser(username = "test"){
    var params = {
      TableName:table,
      Key:{
        "username": username,
      }
    };

    console.log("Attempting to delete...");
    docClient.delete(params, function(err, data) {
      if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
      }
    });
  },

  queryUser(username = "test"){
    var params = {
      TableName:table,
      KeyConditionExpression: "username = :uname ",

      ExpressionAttributeValues:{
        ":uname": username
      }
    };
    var jsonString;
    console.log("Attempting to query user...");
    docClient.query(params, function(err, data) {
      if (err) {
        jsonString = JSON.stringify(err, null, 2);
        console.error("Unable to query item. Error JSON:", jsonString);

        return(0);
      } else {
        jsonString =  JSON.parse(JSON.stringify(data, null, 2));

        console.log("QueryItem succeeded:", jsonString);

        return(1);
      }
    });
  },

  verifyUser(username = "test", password = "test"){
    var params = {
      TableName:table,
      KeyConditionExpression: "username = :uname ",

      ExpressionAttributeValues:{
        ":uname": username
      }
    };
    var jsonString;
    console.log("Attempting to query user...");
    docClient.query(params, function(err, data) {
      if (err) {
        jsonString = JSON.stringify(err, null, 2);
        console.error("Unable to query item. Error JSON:", jsonString);

        return(0);
      } else {
        jsonString =  JSON.parse(JSON.stringify(data, null, 2));
        if(jsonString.Items[0].password === password){
          console.log("Verification success");
          return(1);
        }
        else{
          console.log("Verification failure");
          return(0);
        }
      }
    });
  },

  updateUser(username = "test", email = "hello"){
    var params = {
      TableName:table,
      Key:{
        "username": username,
      },
      KeyConditionExpression: "username = :uname ",
      UpdateExpression: "set info.username = :uname, info.email = :newEmail",
      ExpressionAttributeValues:{
        ":uname": username,
        ":newEmail": email
      }
    };

    console.log("Updating the item...");
    docClient.update(params, function(err, data) {
      if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
      }
    });
  },

  addMeetingUser(username, meetingID){
    var params = {
      TableName:table,
      Key:{
        "username": username,
      },
      KeyConditionExpression: "username = :uname ",
      UpdateExpression: "set  meetings = list_append(meetings, :vals)",
      ExpressionAttributeValues:{
        ":vals": [meetingID]
      }
    };

    console.log("appending meeting...");
    docClient.update(params, function(err, data) {
      if (err) {
        console.error("Unable to append meeting. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        console.log("appended meeting succeeded:", JSON.stringify(data, null, 2));
      }
    });
  },

  getNewMeetingID(){
    let AWS = require("aws-sdk");
    AWS.config.update({
      region: "us-west-1",
      //endpoint: "http://localhost:8001", //used for local dev
      endpoint: "https://dynamodb.us-west-1.amazonaws.com",
      // get from google drive
      accessKeyId : "AKIASHMG6SUNPE2LHDGQ",
      secretAccessKey: "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"
    });
    let dynamodb = new AWS.DynamoDB();
    let docClient = new AWS.DynamoDB.DocumentClient();
    let table = "Users"
    let table2 = "Meetings"
    let meetingsOutput = "placeholder"
    return new Promise(function(resolve,reject){
      var help=0;
      var params = {
        TableName:table2,
        Limit: 1,
        reverse:true,
      };
      var jsonString;


      docClient.scan(params, function(err, data){
        if (err) {
          jsonString = JSON.stringify(err, null, 2);
          console.error("Unable to get next meetingID. Error JSON:", jsonString);

          return(0);
        } else {
          jsonString =  JSON.parse(JSON.stringify(data, null, 2));
          help = parseInt(jsonString.LastEvaluatedKey.id)+1
          console.log("got max meeting id:", help, typeof help);
          return(help)
        }
      })


      setTimeout(function(){
        console.log("got max meeting id2:", help, typeof help);
        resolve(help.toString());
      },1000);

    })
  },



  addMeet(id , interviewer, interviewee){
    let AWS = require("aws-sdk");
    console.log("ID that will be added to meeting:",id)
    AWS.config.update({
      region: "us-west-1",
      //endpoint: "http://localhost:8001", //used for local dev
      endpoint: "https://dynamodb.us-west-1.amazonaws.com",
      // get from google drive
      accessKeyId : "AKIASHMG6SUNPE2LHDGQ",
      secretAccessKey: "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"
    });
    let dynamodb = new AWS.DynamoDB();
    let docClient = new AWS.DynamoDB.DocumentClient();
    let table = "Users"
    let table2 = "Meetings"
    let meetingsOutput = "placeholder"
    // var id = await getNewMeetingID()
    var params = {
      TableName:table2,
      Item:{
        "id": id,
        "interviewer": interviewer,
        "interviewee": interviewee
      }
    };

    console.log("Adding a new meeting...");
    docClient.put(params, function(err, data) {
      if (err) {
        console.error("Unable to add meeting. Error JSON:", JSON.stringify(err, null, 2));
        return 0;
      } else {
        console.log("Added meeting:", JSON.stringify(data, null, 2));
        return 1;
      }
    });
    this.addMeetingUser(interviewer,id);
    this.addMeetingUser(interviewee,id);
    return Promise.resolve('a');

  },


  //return all meeting items that have the username as interviewer or interviewee



  queryMeetings(username){
    var output;
    var params = {
      TableName:table2,
      FilterExpression: "interviewer = :uname",
      ExpressionAttributeValues:{
        ":uname": username
      }
    };
    var jsonString;
    console.log("Attempting to query meetings as interviewer...");
    docClient.scan(params, function(err, data) {
      if (err) {
        jsonString = JSON.stringify(err, null, 2);
        console.error("Unable to query meetings as interviewer. Error JSON:", jsonString);

        return(0);
      } else {
        jsonString =  JSON.parse(JSON.stringify(data, null, 2));

        console.log("Querymeetings as interviewer succeeded:", jsonString);

        return(1);
      }
    });
    params = {
      TableName:table2,
      FilterExpression: "interviewee = :uname",
      ExpressionAttributeValues:{
        ":uname": username
      }
    };
    console.log("Attempting to query meetings as interviewee...");
    docClient.scan(params, function(err, data) {
      if (err) {
        jsonString = JSON.stringify(err, null, 2);
        console.error("Unable to query meetings as interviewee. Error JSON:", jsonString);

        return(0);
      } else {
        jsonString =  JSON.parse(JSON.stringify(data, null, 2));

        console.log("Querymeetings as interviewee succeeded:", jsonString);
        this.meetingsOutput = jsonString;
        //console.log("output:",output);
        return (1);
      }
    });
    // console.log("output:",output);
    // return output;
  }
};
