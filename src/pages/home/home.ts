import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';

import { RegisterPage } from '../register/register';
import { AListKidsPage } from '../a-list-kids/a-list-kids';
import { BListRoomsPage } from '../b-list-rooms/b-list-rooms';

import { DynamoDBService } from '../../core/dynamodb.service';


import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

import * as AWS from 'aws-sdk';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username_field="";
  password_field="";
  data_parent;
  emailDB="";
  nameDB="";

  facebook = {
    loggedIn : false,
    name : '',
    email : '',
    profilePicture: ''
  };


  constructor(public navCtrl: NavController,private alertCtrl: AlertController,
    public navParams: NavParams,
    private afauth:AngularFireAuth) {

  }
  register(){
    this.navCtrl.push(RegisterPage);
  }
  checkInvalid(){
    let alert = this.alertCtrl.create({
      title: 'Can not Login',
      message: 'username or password invalid',
      buttons: [
        {
          text: 'OK',
          role: 'OK',
          handler: () => {
            console.log('ok button');
          }
        }
      ]
    });
    alert.present();
  }
  async login(){
    //this.navCtrl.push(AListKidsPage);
    //this.navCtrl.setRoot(AListKidsPage);
    // DynamoDBService.setUsername(this.username_field,this.password_field);
    console.log('username  = '+this.username_field);
    console.log('password  = '+this.password_field);
    if(this.username_field==""||this.password_field==""){
      this.checkInvalid();
    }
    else {
    var params = {
      TableName : "Users",
      FilterExpression : "username = :username AND password = :password",
      ExpressionAttributeValues : {':username': this.username_field,':password': this.password_field}
    };
    await DynamoDBService.scan(params).then(
      (data) => {
        this.data_parent = data[0];
      }
    );
    await console.log(this.data_parent);
    await DynamoDBService.setParent(this.data_parent);
    await console.log(DynamoDBService.getParent());
  this.checkUser(this.data_parent.id);
  }}
  checkUser(id){
    //this.navCtrl.push(AListKidsPage);
    console.log("id :"+id[0]);
    if(id[0]=="3"){
      this.navCtrl.setRoot(AListKidsPage);
    }
    if(id[0]=="1"){
      this.navCtrl.setRoot(BListRoomsPage);
    }
    
  }



  loginwithfb() {
   this.afauth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
  .then(res => {
    this.facebook.loggedIn = true;
    this.facebook.email = res.user.email;
    this.facebook.name = res.user.displayName,
    this.facebook.profilePicture = res.user.photoURL
    this.emailDB = res.user.email;
    this.nameDB = res.user.displayName;
    console.log("Email: "+this.emailDB);
    console.log("Name: "+this.nameDB);
    console.log("Photo: "+this.facebook.profilePicture);
    this.addUser(this.nameDB, this.emailDB);
    this.navCtrl.push(AListKidsPage);
    DynamoDBService.setUsername(this.nameDB, this.facebook.profilePicture);
  })


  }

  logoutwithfb() {
    this.facebook.loggedIn = false;
  this.afauth.auth.signOut();
  }


  addUser(name, email){
    var count = 1000000000;
    let dynamoDb = new AWS.DynamoDB();
    let docClient = new AWS.DynamoDB.DocumentClient();
    console.log("Adddddddddddddddddddddddd")
    var params = {
      TableName: "Users",
      Item: {
        "id" : "1000000000",
        "username" : name,
        "email" : email
      }
    }
   DynamoDBService.put(params);
  }



//   async getItems(){
//     var params = {
//       TableName: "EmployeesCognito",
//       ProjectionExpression: "id,empId,surnameTh,nameTh,s3,nameEn,surnameEn"
//     };
//     await DynamoDBService.scan(params).then((data => this.employees = data));
// }
}
