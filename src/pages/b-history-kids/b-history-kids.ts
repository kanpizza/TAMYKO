import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BDetailPickKidsPage } from '../b-detail-pick-kids/b-detail-pick-kids';

/**
 * Generated class for the BHistoryKidsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-b-history-kids',
  templateUrl: 'b-history-kids.html',
})
export class BHistoryKidsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

    moreDetail(){
    this.navCtrl.push(BDetailPickKidsPage);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad BHistoryKidsPage');
  }

}
