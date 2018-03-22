import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';



@IonicPage()
@Component({
  selector: 'page-a-agent',
  templateUrl: 'a-agent.html',
})
export class AAgentPage {

  input_phone = null;
  input_name = null;
  createdCode = null; //text for Generated QRcode
  saveButton = false; // hidden button


  constructor(public navCtrl: NavController, public navParams: NavParams) { }
 
  createCode() {
    // Generated QRcode ex. guitar-0876061010
    this.createdCode = this.input_name+"-"+this.input_phone;
    // show save button
    this.saveButton = true;

      // save QRcode Data for matching
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AAgentPage');
  }
  

}
