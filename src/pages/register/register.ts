import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as AWS from 'aws-sdk';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  name_field = "";
  tel_field = "";
  id_field = "";
  email_field = "";
  gender = "";
  myDate = "";
  username_field = "";
  password_field = "";
  confirm_password_filed = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  register(){
    console.log(this.name_field);
    console.log(this.tel_field);
    console.log(this.id_field);
    console.log(this.email_field);
    console.log(this.gender);
    console.log(this.myDate);
    console.log(this.username_field);
    console.log(this.password_field);
    console.log(this.confirm_password_filed);
    this.name_field = "";
    this.tel_field = "";
    this.id_field = "";
    this.email_field = "";
    this.gender = "";
    this.myDate = "";
    this.username_field = "";
    this.password_field = "";
    this.confirm_password_filed = "";

  }
  public static createUser(){
    let dynamoDb = new AWS.DynamoDB();
    let docClient = new AWS.DynamoDB.DocumentClient();
  }

}
