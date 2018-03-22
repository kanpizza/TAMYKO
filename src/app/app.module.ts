import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { RegisterPage } from '../pages/register/register';
import { AListKidsPage } from '../pages/a-list-kids/a-list-kids';
import { AListFamilyPage } from '../pages/a-list-family/a-list-family';
import { AHistoryKidsPage } from '../pages/a-history-kids/a-history-kids';
import { AAgentPage } from '../pages/a-agent/a-agent';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    RegisterPage,
    AListKidsPage,
    AListFamilyPage,
    AHistoryKidsPage,
    AAgentPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    NgxQRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    RegisterPage,
    AListKidsPage,
    AListFamilyPage,
    AHistoryKidsPage,
    AAgentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
