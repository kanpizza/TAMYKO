import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AListKidsPage } from './a-list-kids';

@NgModule({
  declarations: [
    AListKidsPage,
  ],
  imports: [
    IonicPageModule.forChild(AListKidsPage),
  ],
})
export class AListKidsPageModule {}
