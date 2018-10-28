import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ReservationProvider } from '../../providers/reservation/reservation';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public reservationProvider: ReservationProvider) {
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
      //Comunico all'utente l'avvenuta prenotazione
      this.confirmationAlert();
      //Riduco i posti disponibili di 1
      //Da sistemare inserendo un'interazione con il database per il numero dei posti
      this.numeroPostiDisponibili--;
      //Ritorno al menù principale
      this.navCtrl.popToRoot();    
  }



  //Funzione che controlla se ci sono posti disponibili, altrimenti disabilita il tasto della prenotazione
  checkAvailability(){
    console.log(this.numeroPostiDisponibili);
    if (this.numeroPostiDisponibili == 0){
      this.isEnabled = false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservePage');    
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
    this.minFrom = parseInt(this.studyRoom.hours_open[0].from.substring(0,2)) + 1 + ":00";
    this.maxTo = parseInt(this.studyRoom.hours_open[0].to.substring(0,2)) - 1 + ":00";
  }

  ionViewWillEnter() {
    this.checkAvailability();
    this.getDays();
    this.getHours();
    }
}

