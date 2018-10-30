import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentsManagementPage } from './students-management';

@NgModule({
  declarations: [
    StudentsManagementPage,
  ],
  imports: [
    IonicPageModule.forChild(StudentsManagementPage),
  ],
})
export class StudentsManagementPageModule {}
