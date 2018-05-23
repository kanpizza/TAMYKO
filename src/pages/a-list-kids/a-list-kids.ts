import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,ModalController, ViewController } from 'ionic-angular';
import * as AWS from 'aws-sdk';
import { DynamoDBService } from '../../core/dynamodb.service';

/**
 * Generated class for the AListKidsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-a-list-kids',
  templateUrl: 'a-list-kids.html',
})
export class AListKidsPage {
  keyID = "";
  ListkidDetails: Array<>;



  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public modalCtrl: ModalController) {

  }

  openModal(){
    const confirmModal = this.modalCtrl.create('AConfirmKidsPage');
    confirmModal.present();
  }




   addChildPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'เพิ่มบุตรหลาน',
     message: "Key ID",
      inputs: [
        {
          name: 'KeyIDinput',
          placeholder: 'Key ID'
        }

      ],
      buttons: [
        {
          text: 'ยกเลิก',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ยืนยัน',
          handler: data => {
            this.createKeyID(data.KeyIDinput);
            console.log("Dataaaaa: "+data.KeyIDinput);
          }
        }
      ]
    });
    prompt.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChildPage');
    this.getKidList("3000000005");
  }
  async getKidList(userID){
        let dynamoDb = new AWS.DynamoDB();
        let docClient = new AWS.DynamoDB.DocumentClient();
        var params = {
            TableName : "Position",
            FilterExpression : "ID_Parent = :ID_Parent",
            ExpressionAttributeValues : {':ID_Parent': userID}
        };

        await DynamoDBService.scan(params).then((data => this.kidList = data));
        // await console.log(this.employees.length);
        await console.log(this.kidList[0].ID_Kid);
        // for loop data to get ID_Kid
        var i;
        // for (i = 0; i < this.kidList.length; i++) {
            // var id = this.kidList[i].ID_Kid;
            var id = '2000000003';
            // console.log(id);
            var params2 = {
              TableName : "Kids",
              FilterExpression : "ID_Kid = :ID_Kid",
              ExpressionAttributeValues : {':ID_Kid': id}
            };
            await DynamoDBService.scan(params2).then((data => this.kidDetails = data));
            // await this.ListkidDetails[i] =  this.kidDetails;
        // }

        //make kidslist
          await console.log(this.kidDetails);
        }


  createKeyID(data){
    let dynamoDb = new AWS.DynamoDB();
    let docClient = new AWS.DynamoDB.DocumentClient();
    console.log("KeyIDDDDDD");
    var params = {
      TableName: "Kids",
      Item: {
        "ID_Kid" : "2000000005",
        "keyID" : data
      }
    }
   DynamoDBService.put(params);
  }


}
