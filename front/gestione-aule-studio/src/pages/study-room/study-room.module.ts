import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudyRoomPage } from './study-room';

@NgModule({
  declarations: [
    StudyRoomPage,
  ],
  imports: [
    IonicPageModule.forChild(StudyRoomPage),
  ],
})
export class StudyRoomPageModule {}
