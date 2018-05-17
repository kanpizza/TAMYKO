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
<<<<<<< HEAD
    //this.navCtrl.push(AListKidsPage);
    //this.navCtrl.setRoot(AListKidsPage);
    this.navCtrl.setRoot(AListKidsPage);
=======

    this.navCtrl.push(AListKidsPage);
    
>>>>>>> 62c8274e8af468df21028380a51eeb57e0e118c0
  }
//   async getItems(){
//     var params = {
//       TableName: "EmployeesCognito",
//       ProjectionExpression: "id,empId,surnameTh,nameTh,s3,nameEn,surnameEn"
//     };
//     await DynamoDBService.scan(params).then((data => this.employees = data));
// }
}
