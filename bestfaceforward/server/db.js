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


  writeToneAnalysis(username = "Bik Nandy", analysis = [{
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

    writeTranscript(username, transcript){
      var params = {
        TableName:table,
        Key:{
          "username": username,
        },
        KeyConditionExpression: "username = :uname ",
        UpdateExpression: "set info = :uname, transcripts = list_append(transcripts, :transcript)",

        ExpressionAttributeValues:{
            ":uname": username,
            ":transcript": [transcript]
          }
        };

        docClient.update(params, function(err, data) {
            if (err) {
                console.error("Unable to updateTranscript. Error JSON:", JSON.stringify(err, null, 2));
                return 0;
            } else {
                console.log("UpdatedTranscript item:", JSON.stringify(data, null, 2));
                return 1;
            }
        });
        },

      writeQuestion(username, question){
        var params = {
          TableName:table,
          Key:{
            "username": username,
          },
          KeyConditionExpression: "username = :uname ",
          UpdateExpression: "set info = :uname, questions = list_append(questions, :question)",

          ExpressionAttributeValues:{
              ":uname": username,
              ":question": [question]
            }
          };

          docClient.update(params, function(err, data) {
              if (err) {
                  console.error("Unable to updateQuestion. Error JSON:", JSON.stringify(err, null, 2));
                  return 0;
              } else {
                  console.log("UpdatedQuestion item:", JSON.stringify(data, null, 2));
                  return 1;
              }
          });
          },

        writeLiveScore(username, score){
          var params = {
            TableName:table,
            Key:{
              "username": username,
            },
            KeyConditionExpression: "username = :uname ",
            UpdateExpression: "set info = :uname, liveAnalysisScore = :score",

            ExpressionAttributeValues:{
                ":uname": username,
                ":score": score
              }
            };

            docClient.update(params, function(err, data) {
                if (err) {
                    console.error("Unable to writeLiveScore. Error JSON:", JSON.stringify(err, null, 2));
                    return 0;
                } else {
                    console.log("writeLiveScore item:", JSON.stringify(data, null, 2));
                    return 1;
                }
            });
            },






      resetPractice(){
        username = "practice";
        var params = {
          TableName:table,
          Key:{
            "username": username,
          },
          KeyConditionExpression: "username = :uname ",
          UpdateExpression: "set info = :uname, transcripts = :transcript, questions = :question",

          ExpressionAttributeValues:{
              ":uname": username,
              ":transcript": [],
              ":question" : []
            }
          };

          docClient.update(params, function(err, data) {
              if (err) {
                  console.error("Unable to updateQuestion. Error JSON:", JSON.stringify(err, null, 2));
                  return 0;
              } else {
                  console.log("UpdatedQuestion item:", JSON.stringify(data, null, 2));
                  return 1;
              }
          });
        },


        writeAudioAnalysis(username, speed){
          var params = {
            TableName: table,
            Key:{
              "username": username,
            },

          KeyConditionExpression: "username = :uname ",
          UpdateExpression: "set info = :uname, speed = list_append(speed, :speed)",
          ExpressionAttributeValues:{
            ":uname": username,
            ":speed": [speed]
          }
          };
          docClient.update(params, function(err, data) {
            if (err) {
              console.error("Unable to updateSpeed. Error JSON:", JSON.stringify(err, null, 2));
              return 0;
            } else {
              console.log("UpdatedSpeed item:", JSON.stringify(data, null, 2));
              return 1;
            }
          });
        },






      readUserEntry(res, username){
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
                res.send(jsonString)

                return(1);
            }
        });

      },

      readTable(res){
        var params = {
            TableName:table,
            Select: "ALL_ATTRIBUTES"
          };
        var jsonString;
        docClient.scan(params, function(err, data) {
          if (err) {
             console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
             return (0)
          } else {
            jsonString = JSON.parse(JSON.stringify(data, null, 2));
            res.set('Content-Type', 'application/json');
            res.send(jsonString)
            return (1)
          }
        });
      },




      createNewMeeting(res, username, candidate, id, time, date){
        var params = {
          TableName: "Meetings",
          Item:{
            "id" : id,
            "interviewer": username,
            "candidate" : candidate,
            "time" : time,
            "date" : date
          }
        };
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


    }
