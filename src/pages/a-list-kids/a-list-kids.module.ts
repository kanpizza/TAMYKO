import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AListKidsPage } from './a-list-kids';
import { AConfirmKidsPage } from '../a-confirm-kids/a-confirm-kids';
import { AListFamilyPage } from '../a-list-family/a-list-family';

@NgModule({
  declarations: [
    AListKidsPage,
    AConfirmKidsPage,
    AListFamilyPage
  ],
  imports: [
    IonicPageModule.forChild(AListKidsPage),
  ],
})
export class AListKidsPageModule {}
