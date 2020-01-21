import Database from '../components/Database'


function getNewMeetingID(){
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
      resolve(help);
    },1000);

  })
};



function addMeet(id , interviewer, interviewee){
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
  Database.addMeetingUser(interviewer,id);
  Database.addMeetingUser(interviewee,id);
  return Promise.resolve('a');

}


module.exports={
  addMeeting: async(interviewer,interviewee) => {
    let meetingId = await getNewMeetingID()
    addMeet(meetingId, interviewer, interviewee)
    return(meetingId)
  }
}



// exports.addMeeting = addMeeting
// exports.getNewMeetingID = getNewMeetingID
