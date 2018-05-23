import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DynamoDBService } from '../../core/dynamodb.service';

/**
 * Generated class for the AHistoryKidsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-a-history-kids',
  templateUrl: 'a-history-kids.html',
})
export class AHistoryKidsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AHistoryKidsPage');
  }
  getUser(){
    console.log(DynamoDBService.getParent());
  }

}
