import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the BDetailPickKidsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

export interface Config {
  detailRoom: string;
}

@Component({
  selector: 'page-b-detail-pick-kids',
  templateUrl: 'b-detail-pick-kids.html',
})
export class BDetailPickKidsPage {

   public config : Config;
   public columns : any;
   public rows : any;

  constructor(public navCtrl: NavController, public navParams: NavParams ,private _HTTP: HttpClient) {

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
    console.log('ionViewDidLoad BDetailPickKidsPage');
   }



}
