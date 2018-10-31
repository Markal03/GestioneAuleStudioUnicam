import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditReservationPage } from './edit-reservation';

@NgModule({
  declarations: [
    EditReservationPage,
  ],
  imports: [
    IonicPageModule.forChild(EditReservationPage),
  ],
})
export class EditReservationPageModule {}
