import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { ListAccountsRequest } from 'aws-sdk/clients/organizations';
import { List } from 'ionic-angular';

@Injectable()
export class DynamoDBService {
  static username="";
  static password="";
  static firstname="";
  static lastname = "";
  static username_db = "";
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
  public static setParent(data){
    this.firstname = data.firstname ;
    this.lastname = data.lastname ;
    this.username_db = data.username ;
    // console.log("test "+this.firstname +this.lastname+this.username_db);

  }
  public static getParent(){
    return this.username_db;
  }

  public static scan(params){
    return new Promise((resolve, reject) => {
   AWS.config.update(this.config);
   let dynamodb = new AWS.DynamoDB({ region: 'us-west-2' });
   let docClient = new AWS.DynamoDB.DocumentClient();

   docClient.scan(params, function(err, data) {
     if (err) {
       reject(err);
     } else {
       resolve(data.Items);
     }
   });
 })
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
