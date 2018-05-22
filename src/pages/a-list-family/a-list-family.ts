import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ViewController } from 'ionic-angular';

import { HttpClient } from '@angular/common/http';

/**
* Generated class for the BDetailRoomsPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/



@IonicPage()
@Component({
  selector: 'page-a-list-family',
  templateUrl: 'a-list-family.html',
})
export class AListFamilyPage {
  public config : Config;
  public columns : any;
  public rows : any;
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
this._HTTP
.get<Config>('../../assets/data/DetailRoom.json')
.subscribe((data) =>
{
this.rows = data.details;
});
console.log('ionViewDidLoad DetailsPage');
}

  openModal(){
    const addModal = this.modalCtrl.create('AAddFamilyPage');
    addModal.present();
  }



dismiss() {
    this.viewCtrl.dismiss();
  }
}
