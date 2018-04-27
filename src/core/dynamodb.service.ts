import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';

@Injectable()
export class DynamoDBService {
  
  private static config = {
    region: 'us-west-2', 
    accessKeyId: 'key eiei', 
    secretAccessKey: 'key eiei'
  };
  
  public static scan(params){
    AWS.config.update(this.config);
    let dynamodb = new AWS.DynamoDB({ region: 'us-west-2' });
    let docClient = new AWS.DynamoDB.DocumentClient();
    
    docClient.scan(params, function(err, data) {
      if (err) {
        console.log("Error", err);
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
        console.log("Error", err);
      } else {
        console.log("Success", data);
      }
    });
  }
  public static get(params){
    AWS.config.update(this.config);
    let dynamodb = new AWS.DynamoDB({ region: 'us-west-2' });
    let docClient = new AWS.DynamoDB.DocumentClient();

    docClient.get(params, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
      }
    });
  }
}
