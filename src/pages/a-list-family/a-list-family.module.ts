import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AListFamilyPage } from './a-list-family';
import { AAddFamilyPage } from '../a-add-family/a-add-family';

@NgModule({
  declarations: [
    AListFamilyPage,
    AAddFamilyPage
  ],
  imports: [
    IonicPageModule.forChild(AListFamilyPage),
  ],
})
export class AListFamilyPageModule {}
