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
  kidDetails2: {};
  kidList2: {};
  kidDetails: {};
  keyID = "";
  //ListkidDetails: Array<>;
  id ="";
  ListkidDetails = new Array();
  ListkidDetails2 = new Array();
  kidList;
  dataClassroom;
  Priority_lenght;
  teacher_id='';
  imgFB = "";
  nameFB = "";
  check = "NM";
  KID;
  firstname = "";
  gender = "";
  lastname = "";
  nickname = "";
  room = "";
  s3_url = "";
  class = "";
  parent_list = "";
  IDKid = "";
  PID = "";



  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public modalCtrl: ModalController) {

  }

  openModal(){
    const confirmModal = this.modalCtrl.create('AConfirmKidsPage');
    confirmModal.present();
  }

  showDetails(kid_id){
    console.log("showDetails");
    DynamoDBService.setKidid_detail(kid_id);
    const detailKidsModal = this.modalCtrl.create('AListFamilyPage');
    detailKidsModal.present();
  }



   addChildPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Add Kids',
     message: "Key ID",
      inputs: [
        {
          name: 'KeyIDinput',
          placeholder: 'Key ID'
        }

      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            this.KID = data.KeyIDinput;
            console.log("KID :   "+this.KID);
            this.getKidList2(this.KID);


          }
        }
      ]
    });
    prompt.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChildPage');
    // console.log(this.getTeacher("2000000004"));
    this.PID = DynamoDBService.getID();
    console.log("PIDDDDDD : "+ this.PID);
    this.getKidList(this.PID);
  }
  async getKidList(userID){
        let dynamoDb = new AWS.DynamoDB();
        let docClient = new AWS.DynamoDB.DocumentClient();
        var params = {
            TableName : "Priority",
            FilterExpression : "Parent_id = :Parent_id",
            ExpressionAttributeValues : {':Parent_id': userID}
        };
        await DynamoDBService.scan(params).then((data => this.kidList = data));
        // await console.log(this.employees.length);
        await console.log(this.kidList);
        // for loop data to get ID_Kid
        var i;

        for (i = 0; i < this.kidList.length; i++) {
            this.id = this.kidList[i].Kids_id;
            // var id = '2000000003';
            console.log(this.id);
            var params2 = {
              TableName : "Kids",
              FilterExpression : "ID_Kid = :ID_Kid",
              ExpressionAttributeValues : {':ID_Kid': this.id}
            };
            await DynamoDBService.scan(params2).then((data => this.kidDetails = data));
            await this.ListkidDetails.push(this.kidDetails[0]);

            await console.log(this.ListkidDetails);
        }

        //make kidslist
        // await console.log(this.kidDetails);

        }

        async getKidList2(keyID){
              let dynamoDb = new AWS.DynamoDB();
              let docClient = new AWS.DynamoDB.DocumentClient();
              var params = {
                  TableName : "Kids",
                  FilterExpression : "keyID = :keyID",
                  ExpressionAttributeValues : {':keyID': keyID}
              };
              await DynamoDBService.scan(params).then((data => this.kidList2 = data));
              // await console.log(this.employees.length);
              await console.log(this.kidList2);
              // for loop data to get ID_Kid
              var i=0;

              // for (i = 0; i < this.kidList2.length; i++) {
              if(this.kidList2.length == 1) {
               console.log('this.kidList2');
                  var id2 = this.kidList2[i].ID_Kid;
                  // var id = '2000000003';
                  console.log("Kid ID 2222222: "+id2);
                  this.IDKid = this.kidList2[i].ID_Kid;
                  this.firstname = this.kidList2[i].firstname;
                  this.gender = this.kidList2[i].gender;
                  this.lastname = this.kidList2[i].lastname;
                  this.nickname = this.kidList2[i].nickname;
                  this.room = this.kidList2[i].room;
                  this.s3_url = this.kidList2[i].s3_url;
                  this.class = this.kidList2[i].class;
                  this.parent_list = DynamoDBService.getID();

                  var params3 = {
                    TableName : "Position",
                    FilterExpression : "ID_Parent = :ID_Parent",
                    ExpressionAttributeValues : {':ID_Parent': this.PID}
                  };
                  await DynamoDBService.scan(params3).then((data => this.kidDetails2 = data));
                  await this.ListkidDetails2.push(this.kidDetails2[0]);

                  await console.log("ID_Kid: "+this.IDKid);
                  await console.log("KID: "+this.KID);
                  await console.log("firstname: "+this.firstname);
                  await console.log("gender: "+this.gender);
                  await console.log("lastname: "+this.lastname);
                  await console.log("nickname: "+this.nickname);
                  await console.log("room: "+this.room);
                  await console.log("s3_url: "+this.s3_url);
                  await console.log("class: "+this.class);
                  await console.log("parent_list: "+this.parent_list);

                  await this.createKeyID();

              }
              else {
                // not matching
              }

              //make kidslist
              // await console.log(this.kidDetails);

              // this.IDKid = this.ListkidDetails2[0].ID_Kid;
              // this.firstname = this.ListkidDetails2[0].firstname;
              // this.gender = this.ListkidDetails2[0].gender;
              // this.lastname = this.ListkidDetails2[0].lastname;
              // this.nickname = this.ListkidDetails2[0].nickname;
              // this.room = this.ListkidDetails2[0].room;
              // this.s3_url = this.ListkidDetails2[0].s3_url;
              // this.class = this.ListkidDetails2[0].class;
              // this.parent_list = DynamoDBService.getID();


              }


  async createKeyID(){
    let dynamoDb = new AWS.DynamoDB();
    let docClient = new AWS.DynamoDB.DocumentClient();
    console.log("Createeeeeeeeeeeeeee");
    /////////////////////////////////////////////////////////////////////
    var params = {
        TableName : "Priority",

    };
    await DynamoDBService.scan(params).then((data => this.Priority_lenght = data.length));
    await console.log(this.Priority_lenght);
    //////////////////////////////////////////////////////////////////////////////

    var params2 = {
      TableName: "Priority",
      Item: {
        "Kids_id" : this.IDKid,
        "No_priority" : this.Priority_lenght,
        "Parent_id" : this.PID ,
        "Position" : 0,
      }



    }
   DynamoDBService.put(params2);
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
    await console.log(this.dataClassroom);
    /////////////////////////////////////////////////////////////////////////////
    var params2 = {
      TableName: "History2",
      Item: {
  "class": class_num,
  "Create_time": this.formatDate(),
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
