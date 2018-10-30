import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudyRoomsManagementPage } from './study-rooms-management';

@NgModule({
  declarations: [
    StudyRoomsManagementPage,
  ],
  imports: [
    IonicPageModule.forChild(StudyRoomsManagementPage),
  ],
})
export class StudyRoomsManagementPageModule {}
