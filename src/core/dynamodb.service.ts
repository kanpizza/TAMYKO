import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';

@Injectable()
export class DynamoDBService {
  static username="";
  static password="";
  private static config = {
    region: 'us-west-2', 
    accessKeyId: '', 
    secretAccessKey: ''
  };

  public static setUsername(username,password){
    this.username = username ;
    this.password = password ;
    console.log(this.username);
    console.log(this.password);
  }
  public static getUsername(){
    return this.username;
  }
  public static getPassword(){
    return this.password;
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
