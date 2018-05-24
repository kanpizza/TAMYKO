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
    this.id = data.id ;
    // console.log("test "+this.firstname +this.lastname+this.username_db);

  }
  public static getParent(){
    return this.username_db;
  }
<<<<<<< HEAD
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
  
=======

>>>>>>> faeef5a82b81afe0cee230a0caa42e4fd9345018
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
