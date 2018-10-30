import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservationsManagementPage } from './reservations-management';

@NgModule({
  declarations: [
    ReservationsManagementPage,
  ],
  imports: [
    IonicPageModule.forChild(ReservationsManagementPage),
  ],
})
export class ReservationsManagementPageModule {}
