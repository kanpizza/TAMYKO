import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormControl,FormGroup} from '@angular/forms';
import * as AWS from 'aws-sdk';
import { DynamoDBService } from '../../core/dynamodb.service';
/**
 * Generated class for the AProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-a-profile',
  templateUrl: 'a-profile.html',
})
export class AProfilePage {
  list = {};
  todo: FormGroup;
  name_field = "";
  lastname_field="";
  tel_field = "";
  citizen_id = "";
  id_field = "";
  email_field = "";
  gender = "";
  myDate = "";
  username_field = "";
  password_field = "";
  confirm_password_filed = "";
  user_list;
  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder) {
    
    this.todo = this.formBuilder.group({
      name_field: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z]*'), Validators.required])],
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
    console.log('ionViewDidLoad AProfilePage');
    this.getUser();
  }
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
  async getUser(){
    await console.log(DynamoDBService.getParent());
    let dynamoDb = new AWS.DynamoDB();
    let docClient = new AWS.DynamoDB.DocumentClient();
    var params = {
        TableName : "Users",
        FilterExpression : "username = :username",
        ExpressionAttributeValues : {":username": DynamoDBService.getParent()}
    };
    await DynamoDBService.scan(params).then(
      (data) => {
        this.user_list = data;
      }
    );
    await console.log(this.user_list);

  }
  submitUpdate(){
    this.updateUser();
  }
  async updateUser(){
    // this.name_field = firstname;
    // this.lastname_field=lastname;
    // this.id_field = id ;
    // this.tel_field = tel;
    // this.email_field = email;
    // this.myDate = mydate;
    // this.username_field = username;
    // this.password_field = password;
    // this.confirm_password_filed = cfpassword;
    console.log(this.user_list[0].username);
    console.log(this.name_field);
    var params = {
      TableName: "Users",
      Item: {
        "id" :this.user_list[0].id,
        "role" : "3",
        "citizen_id":this.user_list[0].citizen_id,
        "tel":this.user_list[0].tel,
        "gender":this.user_list[0].gender,
        "firstname" :this.user_list[0].firstname,
        "lastname" : this.user_list[0].lastname,
        "email" : this.user_list[0].email,
        "birth_date" : this.user_list[0].birth_date,
        "username" : this.user_list[0].username,
        "password" : this.user_list[0].password
      }
     };
     await DynamoDBService.put(params);
  }

}
