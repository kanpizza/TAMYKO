import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BListRoomsPage } from './b-list-rooms';

@NgModule({
  declarations: [
    BListRoomsPage,
  ],
  imports: [
    IonicPageModule.forChild(BListRoomsPage),
  ],
})
export class BListRoomsPageModule {}
