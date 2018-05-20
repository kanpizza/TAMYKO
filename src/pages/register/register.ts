import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as AWS from 'aws-sdk';
import { FormBuilder, Validators, FormControl,FormGroup} from '@angular/forms';
import { Component, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomePage } from '../home/home';


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

  //captcha Data
  private captchaPassed: boolean = false;
  private captchaResponse: string;


  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,private http: HttpClient, private zone: NgZone ) {

     this.todo = this.formBuilder.group({
      name_field: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastname_field: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      tel_field: ['',Validators.compose([Validators.maxLength(10), Validators.minLength(10), Validators.required])],
      id_field: ['',Validators.compose([Validators.maxLength(13), Validators.minLength(13), Validators.required])],
      email_field: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{2,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'), Validators.required])],
      gender: ['', Validators.required],
      myDate: ['', Validators.required],
      username_field: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[0-9a-zA-Z]*'), Validators.required])],
      //UpperCase/Number
      password_field: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,12}$')])],
      confirm_password_filed: ['', Validators.required],
    }, {validator: this.matchingPasswords('password_field', 'confirm_password_filed')}); 

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  regisForm(){
    //click submit on RegisterPage
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

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    // TODO maybe use this https://github.com/yuyang041060120/ng2-validation#notequalto-1
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }
    captchaResolved(response: string): void {
 
        this.zone.run(() => {
            this.captchaPassed = true;
            this.captchaResponse = response;
        });
 
    }


 

}
