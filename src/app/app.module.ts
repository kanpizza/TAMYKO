import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { RegisterPage } from '../pages/register/register';
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


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera } from '@ionic-native/camera';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';

import { DynamoDBService } from '../core/dynamodb.service';
import { RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    RegisterPage,
    AListKidsPage,
    AProfilePage,
 //   AListFamilyPage,
    AHistoryKidsPage,
    AAgentPage,
    BHistoryKidsPage,
    BListRoomsPage,
    BScanAgentPage,
    BDetailRoomsPage,
    BDetailPickKidsPage
  ],
  imports: [
    BrowserModule,
    RecaptchaModule.forRoot(),
    IonicModule.forRoot(MyApp),
    NgxQRCodeModule,
    HttpClientModule,
    NgxDatatableModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    RegisterPage,
    AListKidsPage,
    AProfilePage,
   // AListFamilyPage,
    AHistoryKidsPage,
    AAgentPage,
    BHistoryKidsPage,
    BListRoomsPage,
    BScanAgentPage,
    BDetailRoomsPage,
    BDetailPickKidsPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    DynamoDBService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    Camera
  ]
})
export class AppModule {}
