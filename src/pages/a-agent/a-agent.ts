import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {Md5} from 'ts-md5/dist/md5';
import * as AWS from 'aws-sdk';
import { DynamoDBService } from '../../core/dynamodb.service';


@IonicPage()
@Component({
  selector: 'page-a-agent',
  templateUrl: 'a-agent.html',
})
export class AAgentPage {

  kidDetails: {};
  input_firstname = null;
  input_lastname = null;
  input_phone = null;
  input_cardID = null;
  createdCode = null; //text for Generated QRcode
  createCode_md5 = null
  date = null;
  saveButton = false; // hidden button
  kidList;
  ListkidDetails = new Array();
  parent_id = '';
  selectKid = null;


  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  createCode() {
    // Generated QRcode ex. guitar-0876061010

    this.date = this.formatDate();
    this.createdCode = this.input_firstname+"-"
                        +this.input_lastname+"-"
                        +this.input_phone+"-"
                        +this.input_cardID+"-"
                        +this.selectKid+"-"
                        +this.date;
    this.createCode_md5 = Md5.hashStr(this.createdCode);

    let dynamoDb = new AWS.DynamoDB();
    let docClient = new AWS.DynamoDB.DocumentClient();

    var params = {
      TableName: "QRCode",
      Item: {
      "citizen_id": this.input_cardID,
      "date": this.date,
      "firstname": this.input_firstname,
      "kids_id": this.selectKid,
      "lastname": this.input_lastname,
      "qr_code": this.createCode_md5,
      "status": 0,
      "tel": this.input_phone
      }
    }
    DynamoDBService.put(params);
    // show save button
    this.saveButton = true;

      // save QRcode Data for matching
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AAgentPage');
    this.getSelectList();


  }
  formatDate(){
    var d = new Date,
    dformat = [d.getMonth()+1,
               d.getDate(),
               d.getFullYear()].join('/')+' '+
              [d.getHours(),
               d.getMinutes(),
               d.getSeconds()].join(':');
  return dformat;
  }
  async getSelectList(){
    let dynamoDb = new AWS.DynamoDB();
    let docClient = new AWS.DynamoDB.DocumentClient();
    console.log(DynamoDBService.getId());
    this.parent_id = DynamoDBService.getId();
    var params = {
        TableName : "Priority",
        FilterExpression : "Parent_id = :Parent_id " ,
        ExpressionAttributeValues : {':Parent_id': this.parent_id}

    };

    await DynamoDBService.scan(params).then((data => this.kidList = data));
    await console.log(this.kidList);

    for (var i = 0; i < this.kidList.length; i++) {
      if(this.kidList[i].Position == 0){
        var id = this.kidList[i].Kids_id;
        // var id = '2000000003';
        console.log(id);
        var params2 = {
          TableName : "Kids",
          FilterExpression : "ID_Kid = :ID_Kid",
          ExpressionAttributeValues : {':ID_Kid': id}
        };
        await DynamoDBService.scan(params2).then((data => this.kidDetails = data));
        await this.ListkidDetails.push(this.kidDetails[0]);
        await console.log(this.ListkidDetails);
      }

    }
  }


}
