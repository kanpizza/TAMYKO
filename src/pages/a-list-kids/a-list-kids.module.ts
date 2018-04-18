import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AListKidsPage } from './a-list-kids';
import { AConfirmKidsPage } from '../a-confirm-kids/a-confirm-kids';

@NgModule({
  declarations: [
    AListKidsPage,
    AConfirmKidsPage
  ],
  imports: [
    IonicPageModule.forChild(AListKidsPage),
  ],
})
export class AListKidsPageModule {}
