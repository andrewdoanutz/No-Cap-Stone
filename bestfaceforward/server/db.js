//Write toneAnalysis into Database

let AWS = require("aws-sdk");
//used for local development
AWS.config.update({
  region: "us-east-2",
  //endpoint: "http://localhost:8001",
  endpoint: "https://dynamodb.us-east-2.amazonaws.com",
  // get from google drive
 accessKeyId : process.env.AWS_ACCESS_KEY,
secretAccessKey: process.env.AWS_SECRET_KEY
});
let dynamodb = new AWS.DynamoDB();
let docClient = new AWS.DynamoDB.DocumentClient();
let table = "Users"

module.exports = {


  writeToneAnalysis(username = "ryan", analysis = [{
      "score": 0.946222,
      "tone_id": "tentative",
      "tone_name": "Tentative"
    }
  ]){
    var params = {
      TableName:table,
      Key:{
        "username": username,
      },
      KeyConditionExpression: "username = :uname ",
      UpdateExpression: "set info = :uname, analysis = :analysis",
      ExpressionAttributeValues:{
        ":uname": username,
        ":analysis": analysis
      }
    };

    docClient.update(params, function(err, data) {
      if (err) {
        console.error("Unable to updateAnalysis. Error JSON:", JSON.stringify(err, null, 2));
        return 0;
      } else {
        console.log("UpdatedAnalysis item:", JSON.stringify(data, null, 2));
        return 1;
      }
    });
  },

  readToneAnalysis(res, username = "ryan"){
    var params = {
        TableName:table,
        KeyConditionExpression: "username = :uname ",
        ExpressionAttributeValues:{
          ":uname": username
        }
      };
    var jsonString;
    docClient.query(params, function(err, data) {
        if (err) {
            jsonString = JSON.stringify(err, null, 2);
            console.error("Unable to query item. Error JSON:", jsonString);

            return(0);
        } else {
            jsonString =  JSON.parse(JSON.stringify(data, null, 2));

            console.log("QueryItem succeeded:", jsonString);
            res.set('Content-Type', 'application/json');
            res.send(jsonString.Items[0].analysis)

            return(1);
        }
    });

  }


  };
