import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AAddFamilyPage } from './a-add-family';

@NgModule({
  declarations: [
    AAddFamilyPage,
  ],
  imports: [
    IonicPageModule.forChild(AAddFamilyPage),
  ],
})
export class AAddFamilyPageModule {}
