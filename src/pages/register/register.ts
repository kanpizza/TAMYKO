import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as AWS from 'aws-sdk';
import { FormBuilder, Validators, FormControl } from '@angular/forms';


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


  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder ) {

     this.todo = this.formBuilder.group({
      name_field: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastname_field: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      tel_field: ['', Validators.required],
      id_field: ['', Validators.required],
      email_field: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      gender: ['', Validators.required],
      myDate: ['', Validators.required],
      username_field: ['', Validators.required],
      password_field: ['', Validators.required],
      confirm_password_filed: ['', Validators.required],
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  onSubmit(){
    this.myControl = new FormControl('value', Validators.required);
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
    // this.createUser();

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

//  public static createUser(){
//    let dynamoDb = new AWS.DynamoDB();
//    let docClient = new AWS.DynamoDB.DocumentClient();
//  }

  // createUser(){
  //   var count = 1000000000;
  //   let dynamoDb = new AWS.DynamoDB();
  //   let docClient = new AWS.DynamoDB.DocumentClient();
  //   var params = {
  //     TableName: "Users",
  //     Item: {
  //       "id" : "2423423423",
  //       "citizen_id" : this.id_field,
  //       "role" : "1",
  //       "firstname" : this.name_field,
  //       "lastname" : this.lastname_field,
  //       "email" : this.email_field,
  //       "gender" : this.gender,
  //       "birth_date" : this.myDate,
  //       "username" : this.username_field,
  //       "password" : this.password_field
  //     }
  //   }
  //  DynamoDBService.put(params);
  // }

}
