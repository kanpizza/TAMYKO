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
    this.navCtrl.setRoot(AListKidsPage);


    this.navCtrl.push(AListKidsPage);
    
  }
//   async getItems(){
//     var params = {
//       TableName: "EmployeesCognito",
//       ProjectionExpression: "id,empId,surnameTh,nameTh,s3,nameEn,surnameEn"
//     };
//     await DynamoDBService.scan(params).then((data => this.employees = data));
// }
}
