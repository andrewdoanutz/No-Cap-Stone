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
      // get from google drive
      // accessKeyId : ,
      // secretAccessKey: 
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
        <button onClick={this.createTable()}>make table</button>
        <button onClick={this.addUser()}>add</button>
        <button onClick={this.queryUser()}>query</button>
        <button onClick={this.updateUser()}>update</button>
        <button onClick={this.queryUser()}>query</button>
        <button onClick={this.deleteUser()}>add</button>
      </div>
    )
  }


  createTable(table = this.table){
    var params = {
      TableName : table,
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
    this.dynamodb.createTable(params, function(err, data) {
      if (err) {
          console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
      } else {
          console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
      }
    });
  }

  //can change the hardcoded variables
  addUser(username = "test", password = "test", firstName = "test", lastName = "test", email = "test"){
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

  deleteUser(username = "test"){
    var table = this.table;
    var params = {
        TableName:table,
        Key:{
            "username": username,
        }
      };

      console.log("Attempting to delete...");
      this.docClient.delete(params, function(err, data) {
          if (err) {
              console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
          } else {
              console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
          }
      });
    }

  queryUser(username = "test"){
    var params = {
        TableName:this.table,
        KeyConditionExpression: "username = :uname ",

        ExpressionAttributeValues:{
          ":uname": username
        }
      };

      console.log("Attempting to query user...");
      this.docClient.query(params, function(err, data) {
          if (err) {
              console.error("Unable to query item. Error JSON:", JSON.stringify(err, null, 2));
              return(0);
          } else {
              console.log("QueryItem succeeded:", JSON.stringify(data, null, 2));
              return(1);
          }
      });
    }
  updateUser(username = "test", email = "hello"){
    var params = {
      TableName:this.table,
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
    this.docClient.update(params, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        }
    });
  }
//end components
}


export default Database
