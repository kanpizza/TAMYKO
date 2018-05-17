import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';

@Injectable()
export class DynamoDBService {
  static username="";
  static password="";
  private static config = {
    region: 'us-west-2', 
    accessKeyId: 'AKIAJ37ROVQJQIMDIDEA', 
    secretAccessKey: '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'
  };

  public static setusername(username,password){
    this.username = username ;
    this.password = password ;
    console.log(this.username);
    console.log(this.password);
    // DynamoDBService.checkUsername(this.username);
  }
  public static checkUsername(username){
    AWS.config.update(this.config);
    let dynamodb = new AWS.DynamoDB({ region: 'us-west-2' });
    let docClient = new AWS.DynamoDB.DocumentClient();
    var params = {
      ExpressionAttributeNames: {
       "#AT": "username", 
      }, 
      ExpressionAttributeValues: {
       ":a": {
         S: "username"
        }
      }, 
      FilterExpression: "#AT = :a", 
      ProjectionExpression: "#AT", 
      TableName: "Users"
     };
    //  dynamodb.query(params, function(err, data) {
    //   if (err) console.log(err, err.stack); // an error occurred
    //   else     console.log('username: '+username);           // successful response
    
    // });
     dynamodb.scan(params, function(err, data) {
       if (err) console.log('err',err.stack); // an error occurred
       else     console.log("pass : "+data.Items.values);           // successful response
     });
  }
  
  public static scan(params){
    AWS.config.update(this.config);
    let dynamodb = new AWS.DynamoDB({ region: 'us-west-2' });
    let docClient = new AWS.DynamoDB.DocumentClient();
    
    docClient.scan(params, function(err, data) {
      if (err) {
        console.log('err', err);
      } else {
        console.log(data.Items);
      }
    });
  }
  public static put(params){
    AWS.config.update(this.config);
    let dynamodb = new AWS.DynamoDB({ region: 'us-west-2' });
    let docClient = new AWS.DynamoDB.DocumentClient();

    docClient.put(params, function(err, data) {
      if (err) {
        console.log('error', err);
      } else {
        console.log("ok", data);
      }
    });
  }
  public static get(params){
    AWS.config.update(this.config);
    let dynamodb = new AWS.DynamoDB({ region: 'us-west-2' });
    let docClient = new AWS.DynamoDB.DocumentClient();

    docClient.get(params, function(err, data) {
      if (err) {
        console.log("err", err);
      } else {
        console.log("ok", data);
      }
    });
  }
}
