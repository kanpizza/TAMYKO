import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,ModalController, ViewController } from 'ionic-angular';


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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public modalCtrl: ModalController) {
  }

  openModal(){
    const confirmModal = this.modalCtrl.create('AConfirmKidsPage');
    confirmModal.present();
  }

 
   

   addChildPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'เพิ่มบุตรหลาน',
     message: "Key ID",
      inputs: [
        {
          name: 'Key ID',
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
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChildPage');
  }


}
