import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BDetailRoomsPage } from './b-detail-rooms';

@NgModule({
  declarations: [
    BDetailRoomsPage,
  ],
  imports: [
    IonicPageModule.forChild(BDetailRoomsPage),
  ],
})
export class BDetailRoomsPageModule {}
