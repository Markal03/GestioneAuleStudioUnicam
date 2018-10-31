import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ReservationProvider } from '../../providers/reservation/reservation';

/**
 * Generated class for the EditReservationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-reservation',
  templateUrl: 'edit-reservation.html',
})
export class EditReservationPage {
  loading: any;
  hourFrom: string;
  hourTo: string;
  reservationDay: string;
  studyRoomName: string;
  studyRoomAddress: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public reservationService: ReservationProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
  }

  editReservation(){
    if (!(this.hourFrom) || !(this.hourTo) || !(this.reservationDay)) {
      let alert = this.alertCtrl.create({
        title: 'Oooops!',
        message: 'Inserisci tutti i campi richiesti!',
        buttons: ['Ok']
      });
      alert.present();
    } else {
      this.showLoader();
      let reservationDetails = {
        study_room_name: this.studyRoomName,
        study_room_address: this.studyRoomAddress,
        day: this.reservationDay,
        from_hour: parseInt(this.hourFrom.substring(0,2)),
        to_hour: parseInt(this.hourTo.substring(0,2))
      }
  
      this.reservationService.updateReservation(reservationDetails).then((result) => {
        this.loading.dismiss();
        let confirmationAlert = this.alertCtrl.create({
          title: "Prenotazione modificata!",
          message: "Premi su conferma per tornare all'elenco delle prenotazioni",
          buttons: [
            {
              text: "Conferma",
              handler:() => {}
            }
          ]
        })
        confirmationAlert.present();
      }, (err) => {
        this.loading.dismiss();
        let errorAlert = this.alertCtrl.create({
          title: "Ooooops!",
          message: "C'è stato un errore durante la modifica della prenotazione dell'aula studio",
          buttons: [
            {
              text: "Indietro",
            }
          ]
        })
        errorAlert.present();
      });
      console.log(reservationDetails)
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditReservationPage');
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Modifica Prenotazione in corso...'
    });
    this.loading.present();
  }
}
