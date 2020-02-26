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
        UpdateExpression: "set info = :uname, transcripts = :transcript",

        ExpressionAttributeValues:{
            ":uname": username,
            ":transcript": transcript
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
          UpdateExpression: "set info = :uname, questions = :question",

          ExpressionAttributeValues:{
              ":uname": username,
              ":question": question
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

        writeLiveScore(username, scores){
          var params = {
            TableName:table,
            Key:{
              "username": username,
            },
            KeyConditionExpression: "username = :uname ",
            UpdateExpression: "set info = :uname, videoscores = :scores",

            ExpressionAttributeValues:{
                ":uname": username,
                ":scores": scores
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
          writeVideos(username, videos){
            var params = {
              TableName:table,
              Key:{
                "username": username,
              },
              KeyConditionExpression: "username = :uname ",
              UpdateExpression: "set info = :uname, videos = :videos",

              ExpressionAttributeValues:{
                  ":uname": username,
                  ":videos": videos
                }
              };

              docClient.update(params, function(err, data) {
                  if (err) {
                      console.error("Unable to writeVideos. Error JSON:", JSON.stringify(err, null, 2));
                      return 0;
                  } else {
                      console.log("writeVideos item:", JSON.stringify(data, null, 2));
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
          UpdateExpression: "set info = :uname, transcripts = :transcript, questions = :question, wordtimings = :wordtimings, videoscores = :videoscores, videos = :videos",

          ExpressionAttributeValues:{
              ":uname": username,
              ":transcript": [],
              ":question" : [],
              ":wordtimings":[],
              ":videoscores":[],
              ":videos":[]

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




      writeUserEntry(username,transcript,questions,videos,scores,timestamps){
        var params = {
          TableName:table,
          Key:{
            "username": username,
          },
          KeyConditionExpression: "username = :uname ",
          UpdateExpression: "set info = :uname, videos = :videos, questions = :questions, transcripts = :transcripts, videoscores = :videoscores, wordtimings = :wordtimings",

          ExpressionAttributeValues:{
              ":uname": username,
              ":videos": videos,
              ":questions": questions,
              ":transcripts": transcript,
              ":videoscores": scores,
              ":wordtimings": timestamps
            }
          };

          docClient.update(params, function(err, data) {
              if (err) {
                  console.error("Unable to writeUserEntry. Error JSON:", JSON.stringify(err, null, 2));
                  return 0;
              } else {
                  console.log("writeUserEntry item:", JSON.stringify(data, null, 2));
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




      createNewMeeting(res, id, username, time, date){
        var params = {
          TableName: "Users",
          Item:{
            "id" : id,
            "username": username,
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
