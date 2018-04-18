import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController, ViewController } from 'ionic-angular';

/**
 * Generated class for the AConfirmKidsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-a-confirm-kids',
  templateUrl: 'a-confirm-kids.html',
})
export class AConfirmKidsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams , public modalCtrl: 	ModalController,public viewCtrl:ViewController) {
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AConfirmKidsPage');
  }

}
