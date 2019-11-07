//enter this command to start local server: java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb -port 8001
//aws configure
//to check tables made locally run command: aws dynamodb list-tables --endpoint-url http://localhost:8001


import React, {Component} from "react";

import "../css/profile.css";

class Database extends Component{

  constructor(){
    super()
    var AWS = require("aws-sdk");
    //used for local development
    AWS.config.update({
      region: "us-west-1",
      //endpoint: "http://localhost:8001",
      endpoint: "https://dynamodb.us-west-1.amazonaws.com",
      //get from google drive
      //accessKeyId : 
    //  secretAccessKey:
    });
    this.dynamodb = new AWS.DynamoDB();
    this.docClient = new AWS.DynamoDB.DocumentClient();
    this.table = 'Users'
  }


  render(){
    return(
      <div>
        <div> database has been rendered</div>
        <div> database has been rendered</div>
        <div> database has been rendered</div>
        <div> database has been rendered</div>
        <div> database has been rendered</div>
        <button onClick={this.deleteUser("ryang")}></button>
      </div>
    )
  }


  createTable(){
    var params = {
      TableName : this.table,
      KeySchema: [
        //only put keys in here
        //Keytype Hash because they can be uniquely identified by username
        {AttributeName: "username", KeyType: "HASH"},
        {AttributeName: "password", KeyType: "RANGE"},
      ],
      AttributeDefinitions: [
        //AttributeType S - string N- Number B- binary
        {AttributeName: "username", AttributeType: "S"},
        {AttributeName: "password", AttributeType: "S"},
      ],
      ProvisionedThroughput: {
          ReadCapacityUnits: 10,
          WriteCapacityUnits: 10
      }
    };
    this.dynamodb.createTable(params, function(err, data) {
      if (err) {
          console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
          return(
            <div> failed to create Users </div>
          )
      } else {
          console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
          return(
            <div> created table Users </div>
          )
      }
    });
  }

  //can change the hardcoded variables
  addUser(username, password, firstName, lastName, email){
    //change this part to recieve input
  //  var company = "UCSB";
    var isInterviewer = true;
    var isRecruiter = false;
    var meetings = [];

    var table = this.table
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
    this.docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
  }

  deleteUser(username){
    var table = this.table;
    var params = {
        TableName:table,
        Key:{
            "username": username,
        }
      };


      console.log("Attempting a conditional delete...");
      this.docClient.delete(params, function(err, data) {
          if (err) {
              console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
              return(0);
          } else {
              console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
              return(1);
          }
      });
    }

}


export default Database
