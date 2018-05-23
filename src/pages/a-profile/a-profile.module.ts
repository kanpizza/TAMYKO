import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AProfilePage } from './a-profile';

@NgModule({
  declarations: [
    AProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(AProfilePage),
  ],
})
export class AProfilePageModule {}
