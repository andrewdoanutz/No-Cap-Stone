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

      //get from google doc:
      // accessKeyId :,
      // secretAccessKey:
    });
    this.dynamodb = new AWS.DynamoDB();
  }


  render(){
    return(
      <div>
        <div> database has been rendered</div>
        <div> database has been rendered</div>
        <div> database has been rendered</div>
        <div> database has been rendered</div>
        <div> database has been rendered</div>
        <button onClick={this.createTable()}>createTable</button>
      </div>
    )
  }


  createTable(){
    var params = {
      TableName : "Users3",
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


}


export default Database
