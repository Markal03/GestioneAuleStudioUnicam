import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ReservationProvider } from '../../providers/reservation/reservation';
import { MainPage } from '../main/main';
import { templateJitUrl } from '@angular/compiler';



@IonicPage()
@Component({
  selector: 'page-reserve',
  templateUrl: 'reserve.html',
})
export class ReservePage {
  studyRoom;
  numeroPostiDisponibili;
  numeroPosti;
  titolo;
  isEnabled = true;
  immagine = new Image();
  daysOpen = "";
  minFrom;
  maxTo;
  loading: any;

  //Variabili per la prenotazione
  hourFrom: string;
  hourTo: string;
  reservationDay: string;



  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public reservationProvider: ReservationProvider) {
    this.studyRoom = navParams.get('data');
  }

  //Funzione di creazione di un messaggio d'alert per l'utente
  confirmationAlert(){
    const alert = this.alertCtrl.create({
      title: 'Prenotazione Effettuata!',
      subTitle:'Puoi modificare o cancellare la tua prenotazione in qualsiasi momento',
      buttons: ['OK']
    });
    alert.present();
  }

  //Funzione per la conferma della prenotazione da parte dell'utente
  createReservation(){
    this.showLoader();

    let reservationDetails = {
      study_room_id: this.studyRoom._id,
      day: this.reservationDay,
      from_hour: parseInt(this.hourFrom.substring(0,2)),
      to_hour: parseInt(this.hourTo.substring(0,2))
    }

    this.reservationProvider.addReservation(reservationDetails).then((result) => {
      this.loading.dismiss();
      let confirmationAlert = this.alertCtrl.create({
        title: "Prenotazione effettuata!",
        message: "Premi su conferma per visualizzare le tue prenotazioni",
        buttons: [
          {
            text: "Conferma",
            handler:() => {this.navCtrl.setRoot(MainPage);}
          }
        ]
      })
      confirmationAlert.present();
    }, (err) => {
      this.loading.dismiss();
      let errorAlert = this.alertCtrl.create({
        title: "Ooooops!",
        message: "C'è stato un errore durante la prenotazione dell'aula studio",
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservePage');    
    console.log(this.studyRoom);
  }
  getDays(){
    for(let i = 0; i<this.studyRoom.days_open.length; i++) {
      if (i == this.studyRoom.days_open.length-1) {
        this.daysOpen += this.studyRoom.days_open[i].substring(0,3)
      } else {
        this.daysOpen += this.studyRoom.days_open[i].substring(0,3) + "-";
      }
      
    }
    console.log(this.daysOpen);
  }

  getHours(){
    if (this.studyRoom.hours_open[0].from.charAt(0) === "0") {
      let temp = parseInt(this.studyRoom.hours_open[0].from.substring(0,2)) + 1 + ":00";
      this.minFrom = "00000900" + temp;
    }
    if (this.studyRoom.hours_open[0].to.charAt(0) === "0") {
      this.maxTo = "0" + parseInt(this.studyRoom.hours_open[0].to) + ":00";
    }
    this.minFrom = parseInt(this.studyRoom.hours_open[0].from.substring(0,2)) + 1 + ":00";
    this.maxTo = parseInt(this.studyRoom.hours_open[0].to.substring(0,2)) - 1 + ":00";
    console.log(this.minFrom);
    console.log(this.maxTo);
    
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Verifica disponibilità posto in corso...'
    });

    this.loading.present();
  }


  ionViewWillEnter() {
    this.getDays();
    this.getHours();
    }


}

