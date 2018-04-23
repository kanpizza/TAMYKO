import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
/**
 * Generated class for the BScanAgentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-b-scan-agent',
  templateUrl: 'b-scan-agent.html',
})
export class BScanAgentPage {
  scannedCode = null;
  constructor(public navCtrl: NavController, public navParams: NavParams,private barcodeScanner: BarcodeScanner) {
  this.scanCode();
  }
  scanCode() {
      this.barcodeScanner.scan().then(barcodeData => {
        this.scannedCode = barcodeData.text;
        console.log(this.scannedCode );
      }, (err) => {
          console.log('Error: ', err);
      });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BScanAgentPage');
  }

}
