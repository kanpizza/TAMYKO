import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BDetailRoomsPage } from '../b-detail-rooms/b-detail-rooms';
import { DynamoDBService } from '../../core/dynamodb.service';
/**
 * Generated class for the BListRoomsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-b-list-rooms',
  templateUrl: 'b-list-rooms.html',
})
export class BListRoomsPage {
  room;
  class;
  
  id;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.getRoom();
    
  }

  
  moreDetail(){
    this.navCtrl.push(BDetailRoomsPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BListRoomsPage');
    
  }
  async getRoom(){
    console.log('ID : '+DynamoDBService.getID());
    this.id = DynamoDBService.getID();
    var params = {
      TableName : "TeacherRole",
      FilterExpression : "teacher_id = :teacher_id",
      ExpressionAttributeValues : {':teacher_id':"1000000001"}
    };
    await DynamoDBService.scan(params).then((data => this.room_list= data));
    this.class = this.room_list[0].class;
    this.room = this.room_list[0].room;
    
    await DynamoDBService.setRoom(this.room_list[0]);
    await console.log(this.room_list[0]+"  room list");
  }
  


}
