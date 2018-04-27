import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BDetailRoomsPage } from '../b-detail-rooms/b-detail-rooms';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  
  moreDetail(){
    this.navCtrl.push(BDetailRoomsPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BListRoomsPage');
  }

}
