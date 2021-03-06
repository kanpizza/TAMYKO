import { Component, ViewChild, OnInit } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DynamoDBService} from '../core/dynamodb.service';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AListKidsPage } from '../pages/a-list-kids/a-list-kids';
import { AProfilePage } from '../pages/a-profile/a-profile';
//import { AListFamilyPage } from '../pages/a-list-family/a-list-family';
import { AHistoryKidsPage } from '../pages/a-history-kids/a-history-kids';
import { AAgentPage } from '../pages/a-agent/a-agent';
import { BHistoryKidsPage } from '../pages/b-history-kids/b-history-kids';
import { BListRoomsPage } from '../pages/b-list-rooms/b-list-rooms';
import { BScanAgentPage } from '../pages/b-scan-agent/b-scan-agent';
import { BDetailRoomsPage } from '../pages/b-detail-rooms/b-detail-rooms';
import { BDetailPickKidsPage } from '../pages/b-detail-pick-kids/b-detail-pick-kids';


import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

import { DynamoDBService } from '../../core/dynamodb.service';

import * as AWS from 'aws-sdk';

@Component({
  templateUrl: 'app.html',

})
export class MyApp implements OnInit{
  this_user="";

  facebook = {
    loggedIn : true
  };

  ngOnInit(){
    this.this_user = "tete";
  }


  @ViewChild(Nav) nav: Nav;

  // rootPage: any = HomePage;
  public rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private afauth:AngularFireAuth) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      // { title: 'List', component: ListPage },
      { title : 'List of Kids' , component: AListKidsPage },
    //  { title : 'รายชื่อผู้ปกครอง' , component: AListFamilyPage },
      // { title : 'ประวัติการรับบุตรหลาน' , component: AHistoryKidsPage },
      { title : 'Agent' , component: AAgentPage },
      { title : 'Edit Profile', component: AProfilePage}
      // { title : 'รายชื่อห้องเรียน' , component: BHistoryKidsPage },
      // { title : 'ประวัติการรับนักเรียน' , component: BListRoomsPage },
      // { title : 'สแกนตัวแทนผู้ปกครอง' , component: BScanAgentPage },
      //{ title : 'ออกจากระบบ' , component: HomePage },
    ];

  }

  logout(){
    console.log("outttttttttttttttttttttt")
    this.nav.setRoot(HomePage);
    this.logoutwithfb();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logoutwithfb() {
    this.facebook.loggedIn = false;
    this.afauth.auth.signOut();
  }

}
