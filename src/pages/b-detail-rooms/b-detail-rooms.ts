import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { DynamoDBService } from '../../core/dynamodb.service';

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
    test_list: Array<String>;
  constructor(public navCtrl: NavController, public navParams: NavParams ,private _HTTP: HttpClient) {
    this.getClassRoom();
         this.columns = [
        { prop: 'เวลา' },
        { prop: 'ชื่อนักเรียน' },
        { prop: 'ชื่อผู้ปกครอง' },
        { prop: 'อนุญาต' },
        { prop: 'ไม่อนุญาต' },
      ];
  }




   ionViewDidLoad() : void {
      this._HTTP
      .get<Config>('../../assets/data/DetailRoom.json')
      .subscribe((data) =>
      {
         this.rows = data.detailRoom;
      });
    console.log('ionViewDidLoad DetailRoomPage');
   }
   getClassRoom(){
    this.class = DynamoDBService.getClass();
    this.room = DynamoDBService.getRoom();
    console.log('p. '+this.class+"/"+this.room);
    this. getDetail();
    }
  async  getDetail(){
    console.log("class : "+this.class);
    console.log("room : "+this.room);
    var params = {
      TableName: "History",
      ProjectionExpression: "class,create_time,firstname,firstname_pick_kids"
    };
    await DynamoDBService.scan(params).then(
      (data) => {
        this.test = data;
      }
    );
    await console.log(this.test);
  }


}
