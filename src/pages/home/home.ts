import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RegisterPage } from '../register/register';
import { AListKidsPage } from '../a-list-kids/a-list-kids';

import { DynamoDBService } from '../../core/dynamodb.service';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username_field="";
  password_field="";
  constructor(public navCtrl: NavController) {

  }
  register(){
    this.navCtrl.push(RegisterPage);
  }
  login(){
    //this.navCtrl.push(AListKidsPage);
    //this.navCtrl.setRoot(AListKidsPage);
    // DynamoDBService.setUsername(this.username_field,this.password_field);
    console.log('rrr = '+this.username_field);
    console.log('rrr = '+this.password_field);
    var params = {
      TableName : "Users",
      FilterExpression : "username = :username AND password = :password",
      ExpressionAttributeValues : {':username': this.username_field,':password': this.password_field}
  };
  DynamoDBService.scan(params);
  this.checkUser();
  }
  checkUser(){
    //this.navCtrl.push(AListKidsPage);
    this.navCtrl.setRoot(AListKidsPage);
  }
//   async getItems(){
//     var params = {
//       TableName: "EmployeesCognito",
//       ProjectionExpression: "id,empId,surnameTh,nameTh,s3,nameEn,surnameEn"
//     };
//     await DynamoDBService.scan(params).then((data => this.employees = data));
// }
}
