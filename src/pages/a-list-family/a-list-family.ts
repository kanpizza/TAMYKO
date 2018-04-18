import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ViewController } from 'ionic-angular';

/**
 * Generated class for the AListFamilyPage page.
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public modalCtrl: ModalController) {

  }

  openModal(){
    const addModal = this.modalCtrl.create('AAddFamilyPage');
    addModal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AListFamilyPage');
  }

}
