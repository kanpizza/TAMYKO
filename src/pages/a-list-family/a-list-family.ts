import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ViewController } from 'ionic-angular';
import * as AWS from 'aws-sdk';
import { DynamoDBService } from '../../core/dynamodb.service';
import { HttpClient } from '@angular/common/http';

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
  selector: 'page-a-list-family',
  templateUrl: 'a-list-family.html',
})

export class AListFamilyPage {
  lastname;
  firstname;
  public config : Config;
  public columns : any;
  public rows : any;
  ListparentDetails = new Array();
  ListHistory = new Array();
  parentList;
  parent;
  kidDetails;
  parentDetail;
  history;
  username;
  user_list;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public modalCtrl: ModalController,public viewCtrl:ViewController,private _HTTP: HttpClient) {
      this.columns = [
      { prop: 'เวลา' },
      { prop: 'ชื่อนักเรียน' },
      { prop: 'ชื่อผู้ปกครอง' },
      { prop: 'อนุญาต' },
      { prop: 'ไม่อนุญาต' },
      ];
  }

ionViewDidLoad() : void {

    this.getKid("3000000005");
    //this.getParent("2000000004");
    console.log('ionViewDidLoad DetailsPage');
}

  openModal(){
    const addModal = this.modalCtrl.create('AAddFamilyPage');
    addModal.present();
    console.log('open');
 }

    async getParent(kidID){
        let dynamoDb = new AWS.DynamoDB();
        let docClient = new AWS.DynamoDB.DocumentClient();
        var params = {
            TableName : "Position",
            FilterExpression : "ID_Parent = :ID_Parent",
            ExpressionAttributeValues : {':ID_Kid': kidID}
        };

        await DynamoDBService.scan(params).then((data => this.parentList = data));
        // await console.log(this.employees.length);
        await console.log(this.parentList[0].ID_Parent);
        // for loop data to get ID_Kid

        }
   

dismiss() {
    this.viewCtrl.dismiss();
  }


    async getKid(userID){
        let dynamoDb = new AWS.DynamoDB();
        let docClient = new AWS.DynamoDB.DocumentClient();
        
        var kidId = '2000000003';

            var params = {
              TableName : "Kids",
              FilterExpression : "ID_Kid = :ID_Kid",
              ExpressionAttributeValues : {':ID_Kid': kidId}
            };
            await DynamoDBService.scan(params).then((data => this.kidDetails = data));
    

        var params2 = {
            TableName : "Priority",
            FilterExpression : "Kids_id = :Kids_id",
            ExpressionAttributeValues : {':Kids_id': kidId}
        };
         await DynamoDBService.scan(params2).then((data => this.parent = data));
         console.log('num '+this.parent.length);

         var i;
         for (i = 0; i < this.parent.length; i++) {
            console.log("name --> "+this.parent[i].Parent_id);
         
            var params3 = {
              TableName : "Users",
              FilterExpression : "id = :id",
              ExpressionAttributeValues : {':id': this.parent[i].Parent_id}
          };
            await DynamoDBService.scan(params3).then((data => this.parentDetail = data));
            await this.ListparentDetails.push(this.parentDetail[0]);
            console.log(this.parentDetail[0].firstname);
          }


        var params4 = {
            TableName : "History",
            FilterExpression : "kids_id = :kids_id",
            ExpressionAttributeValues : {':kids_id': kidId}
        };
         await DynamoDBService.scan(params4).then((data => this.history = data));
         console.log('num '+this.history.length);
         var j;
         for (j = 0; j < this.history.length; j++) {
            console.log('kkkk '+this.history[j].pick_time);
            this.ListHistory.push(this.history[0]);
         }


        }

addParentPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Add another parent',
    message : "Username :",
      inputs: [
        {
            name : "Username",
          label : 'username',
          type : 'input'
        }

      ],
      buttons: [
        {
          text: 'cancel',
            
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'submit',
          handler: data => {
          //  this.username = data.Username;
           this.checkUser(data.Username);
          }
        }
      ]
    });
    prompt.present();
   
  }
  async checkUser(username){
    this.addUserinDB();
    console.log('userrrrr '+username);
    let dynamoDb = new AWS.DynamoDB();
    let docClient = new AWS.DynamoDB.DocumentClient();
    var params = {
        TableName : "Users",
        FilterExpression : "username = :username",
        ExpressionAttributeValues : {":username": username}
    };
    await DynamoDBService.scan(params).then(
        (data) => {
          this.user_list = data[0];
        }
      );
    await this.firstname == this.user_list.firstname;
    await this.lastname == this.user_list.lastname;
   
    this.ListparentDetails.push(this.user_list);
  }
  addUserinDB(){
    if(this.ListparentDetails.length > 2){
      let alert = this.alertCtrl.create({
        title: 'User more than 3 people',
        message: 'Can not add this user',
        buttons: [
          {
            text: 'Sumbit',
            handler: () => {
              console.log('clicked');
            }
          }
        ]
      });
      alert.present();
    }
  }
}
