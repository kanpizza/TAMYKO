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
  //ListkidDetails: Array<>;
  ListkidDetails = new Array();
  kidList: Array<>;
  dataClassroom : Array<>;
  teacher_id='';
  imgFB = "";
nameFB = "";
check = "NM";



  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public modalCtrl: ModalController) {

  }

  openModal(){
    const confirmModal = this.modalCtrl.create('AConfirmKidsPage');
    confirmModal.present();
  }

  showDetails(){
    console.log("showDetails");
    const detailKidsModal = this.modalCtrl.create('AListFamilyPage');
    detailKidsModal.present();
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
    // console.log(this.getTeacher("2000000004"));
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
        await console.log(this.kidList);
        // for loop data to get ID_Kid
        var i;

        for (i = 0; i < this.kidList.length; i++) {
            var id = this.kidList[i].ID_Kid;
            // var id = '2000000003';
            console.log(id);
            var params2 = {
              TableName : "Kids",
              FilterExpression : "ID_Kid = :ID_Kid",
              ExpressionAttributeValues : {':ID_Kid': id}
            };
            await DynamoDBService.scan(params2).then((data => this.kidDetails = data));
            await this.ListkidDetails.push(this.kidDetails[0]);


        }

        //make kidslist
        // await console.log(this.kidDetails);
          await console.log(this.ListkidDetails);
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

  pickupkid(kid_id,firstname,lastname,class_num,room) {
  let alert = this.alertCtrl.create({
    title: 'Confirm pickup',
    message: 'Are you sure to confirm?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Confirm',
        handler: () => {
          console.log('Buy clicked');
          //put Data to aws
          this.addHistory(kid_id,firstname,lastname,class_num,room);
        }
      }
    ]
  });
  alert.present();
}
  async addHistory(kid_id,firstname,lastname,class_num,room){
    let dynamoDb = new AWS.DynamoDB();
    let docClient = new AWS.DynamoDB.DocumentClient();

    /////////////////////////////////////////////////////////////////////
    var params = {
        TableName : "Classroom",
        FilterExpression : "kids_id = :kids_id",
        ExpressionAttributeValues : {':kids_id': kid_id}
    };
    await DynamoDBService.scan(params).then((data => this.dataClassroom = data));
    //////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////
    var params2 = {
      TableName: "History2",
      Item: {
  "class": class_num,
  "create_time": this.formatDate(),
  "firstname": firstname,
  "firstname_pick_kids": DynamoDBService.getFirstname(), //getParentDetail.firstname
  "kids_id": kid_id,
  "lastname": lastname,
  "lastname_pick_kids": DynamoDBService.getLastname(), //getParentDetail.lastname
  "parent_id": DynamoDBService.getId(), //getParentDetail.parent_id
  "pick_time": "-",
  "qr_code": "-",
  "room": room,
  "status": 0, //init
  "teacher_id": this.dataClassroom[0].teacher_id
}
    }
    console.log(params2.Item)
   DynamoDBService.put(params2);
  }
  // async getTeacher(kid_id){
  //   this.teacher_id='';
  //   // this.dataClassroom = new Array();
  //   let dynamoDb = new AWS.DynamoDB();
  //   let docClient = new AWS.DynamoDB.DocumentClient();
  //   var params = {
  //       TableName : "Classroom",
  //       FilterExpression : "kids_id = :kids_id",
  //       ExpressionAttributeValues : {':kids_id': kid_id}
  //   };
  //   await DynamoDBService.scan(params).then((data => this.dataClassroom = data));
  //   // await console.log( this.dataClassroom[0].teacher_id);
  //    // console.log(this.dataClassroom);
  //   this.teacher_id = await this.dataClassroom[0].teacher_id;
  //   console.log(this.teacher_id);
  //   return await this.teacher_id;
  // }
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
  showFBDetail(){
  this.nameFB = DynamoDBService.getUsername();
  this.imgFB = DynamoDBService.getPassword();
  this.check = "FB";
  console.log("Get Username: "+this.nameFB);
  console.log("Get Photo: "+this.imgFB);
}



}
