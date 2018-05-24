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
  static class="";
  static room="";
  static id="";
  private static config = {
    region: 'us-west-2',
    accessKeyId: 'AKIAJ37ROVQJQIMDIDEA',
    secretAccessKey: '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'
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
    this.id = data.id ;
    // console.log("test "+this.firstname +this.lastname+this.username_db);

  }
  public static getParent(){
    return this.username_db;
  }
  public static getFirstname(){
    return this.firstname;
  }
  public static getLastname(){
    return this.lastname;
  }
  public static getId(){
    return this.id;
  }

  public static setRoom(room_list){
      this.class = room_list.class;
      this.room = room_list.room;
      console.log('in db: '+this.class+'/'+this.room);
  }
  public static getID(){
    return this.id;
  }
  public static getRoom(){
    return this.room ;
  }
  public static getClass(){
    return this.class ;
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
    return new Promise((resolve, reject) => {
    AWS.config.update(this.config);
    let dynamodb = new AWS.DynamoDB({ region: 'us-west-2' });
    let docClient = new AWS.DynamoDB.DocumentClient();

    docClient.get(params, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  })
  }
}
