import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { DynamoDBService } from '../../core/dynamodb.service';
import * as AWS from 'aws-sdk';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the BDetailRoomsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



export interface Config {
  detailRoom: string;
}
@IonicPage()
@Component({
  selector: 'page-b-detail-rooms',
  templateUrl: 'b-detail-rooms.html',
})

export class BDetailRoomsPage {

   public config : Config;
   public columns : any;
   public rows : any;
    test={};
    class;
    room;
    kidsList = new Array();
    HistoryList = new Array();
    test_list: Array<String>;
  constructor(public navCtrl: NavController, public navParams: NavParams ,private _HTTP: HttpClient,public alertCtrl: AlertController) {
    this.getClassRoom();
         this.columns = [
        { prop: 'เวลา' },
        { prop: 'ชื่อนักเรียน' },
        { prop: 'ชื่อผู้ปกครอง' },
        { prop: 'อนุญาต' },
        { prop: 'ไม่อนุญาต' },
      ];
  }


 showConfirm(namePick,kid,record) {
    let confirm = this.alertCtrl.create({
      title: 'Confirm Pick Kid',
      message: 'Do you agree to "'+namePick+'" pick '+kid+'?',
      buttons: [
        {
          text: 'Reject',
          handler: () => {
            this.Reject(record);
      
            console.log('Reject clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            console.log('Confirm clicked');
          }
        }
      ]
    });
    confirm.present();
  }


Reject(record){

    let dynamoDb = new AWS.DynamoDB();
    let docClient = new AWS.DynamoDB.DocumentClient();
    var params = {
      TableName: "History",
      Item: {
  "class": this.record.class,
  "create_time": this.record.create_time,
  "firstname": this.record.firstname,
  "firstname_pick_kids": this.record.firstname_pick_kids,
  "kids_id": "2000000003",
  "lastname": "Ruengittinun",
  "lastname_pick_kids": "Sawangreungrong",
  "Number": 2,
  "parent_id": "3000000002",
  "pick_time": "5:44:13 PM",
  "qr_code": "-",
  "room": 2,
  "status": 1,
  "teacher_id": "1000000001"
        }

}

   ionViewDidLoad() : void {
    this.getClassRoom();
    this.getHistory();
    console.log('ionViewDidLoad DetailRoomPage');
   }
   getClassRoom(){
    this.class = DynamoDBService.getClass();
    this.room = DynamoDBService.getRoom();
    console.log('p. '+this.class+"/"+this.room);

    }

  async getHistory(){
        let dynamoDb = new AWS.DynamoDB();
        let docClient = new AWS.DynamoDB.DocumentClient();
        
        var tId = '1000000001';
            var params = {
              TableName : "History",
              FilterExpression : "teacher_id = :teacher_id",
              ExpressionAttributeValues : {':teacher_id': tId}
            };
            await DynamoDBService.scan(params).then((data => this.kidsLists = data));

        console.log('nnnnn '+this.kidsLists[0].firstname);
        console.log('nnnnn '+this.kidsLists[1].firstname);
        var j;
         for (j = 0; j < this.kidsLists.length; j++) {
            console.log('kkkk '+this.kidsLists[j].pick_time);
            this.HistoryList.push(this.kidsLists[j]);
         }

      }



}
