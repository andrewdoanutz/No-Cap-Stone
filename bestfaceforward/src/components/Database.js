//enter this command to start local server: java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb -port 8001
//aws configure
//to check tables made locally run command: aws dynamodb list-tables --endpoint-url http://localhost:8001



    let AWS = require("aws-sdk");
    //used for local development
    AWS.config.update({
      region: "us-east-2",
      //endpoint: "http://localhost:8001",
      endpoint: "https://dynamodb.us-west-1.amazonaws.com",
      // get from google drive
     accessKeyId : process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
    });
    let dynamodb = new AWS.DynamoDB();
    let docClient = new AWS.DynamoDB.DocumentClient();
    let table = "Users"

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
                    "recruit": isRecruiter,
                    "Meetings": meetings,
                }
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
      }
    };
