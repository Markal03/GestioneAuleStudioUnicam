import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ReservationProvider } from '../../providers/reservation/reservation';
import { MainPage } from '../main/main';




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

  //Variabili per la gestione delle ore 
  minFrom: string;
  minTo: string;
  maxTo: string;
  maxFrom: string;
  minday: string;
  maxday: string;
  chosenDate: Date;

  loading: any;
  dateAndTime: any;

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

  isBookableOnDay() {
    let days = ["Domenica", "Lunedì" ,"Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
    this.chosenDate = new Date(this.reservationDay);
    return this.studyRoom.days_open.includes(days[this.chosenDate.getDay()]);
  }

  //Funzione per la conferma della prenotazione da parte dell'utente
  createReservation(){
    if (!(this.hourFrom) || !(this.hourTo) || !(this.reservationDay)) {
      let alert = this.alertCtrl.create({
        title: 'Oooops!',
        message: 'Inserisci tutti i campi richiesti!',
        buttons: ['Ok']
      });
      alert.present();
    } else {
      if (!this.isBookableOnDay()) {  
        let alert = this.alertCtrl.create({
          title: 'Oooops!',
          message: 'L\'aula studio non è aperta nel giorno selezionato!',
          buttons: ['Ok']
        });
        alert.present();
      } else {
        this.showLoader();
        let reservationDetails = {
          study_room_name: this.studyRoom.name,
          study_room_address: this.studyRoom.address,
          day: this.formatIonicDate(this.reservationDay),
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
            message: err.message,
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

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservePage');    
    console.log(this.studyRoom);
    console.log(this.formatServerDateToIonic("14-11-2018"));
  }

  getServerDateTime() {
    this.reservationProvider.getDateAndTime().then((result) => {
      this.dateAndTime = result;
      this.setAvailableDays();
      console.log(this.dateAndTime);
    }, (err) => {
      let alert = this.alertCtrl.create({
        title: 'Oooops!',
        message: 'C\'è stato un errore, non è stato possibile ricevere data e ora dal server',
        buttons: ['Ok']
      });
      alert.present();
    });

    console.log(this.formatIonicDate("2018-11-02"));
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

  setBaseHours(){
    this.minFrom = this.studyRoom.hours_open.from;
    this.maxFrom = this.setToHour(this.studyRoom.hours_open.to);
    this.minTo = this.setFromHour(this.studyRoom.hours_open.from);
    this.maxTo = this.studyRoom.hours_open.to;
  }

  setAvailableDays() {
    this.minday = this.formatServerDateToIonic(this.dateAndTime.day);
    this.maxday = this.dateAndTime.day.substring(this.dateAndTime.day.lastIndexOf("-") + 1, this.dateAndTime.day.length);
  }

  setAvailableFromHours(ev) {
    let pickedDate: string;
      pickedDate = this.formatIonicDate(this.reservationDay);
      console.log(pickedDate);
      if (pickedDate === this.dateAndTime.day && this.dateAndTime.time > this.studyRoom.hours_open.from) {
        this.minFrom = this.dateAndTime.time.substring(0, 2) + ":00";
        if (!this.hourTo) {
          this.maxFrom = this.setToHour(this.studyRoom.hours_open.to);
       } else {
          this.maxFrom = this.setToHour(this.hourTo);
        }
     } else {
      this.minFrom = this.studyRoom.hours_open.from;
      if (!this.hourTo) {
        this.maxFrom = this.setToHour(this.studyRoom.hours_open.to);
      } else {
        this.maxFrom = this.setToHour(this.hourTo);
      }
     }
     this.minTo = this.setFromHour(ev.hour + ":00");

    console.log(this.hourFrom)
    console.log(ev);
  }



  setAvailableToHours(ev) {
      this.minTo = this.setFromHour(this.hourFrom);
      this.maxTo = this.studyRoom.hours_open.to;
      this.maxFrom = this.setToHour(ev.hour + ":00");
  }

  setFromHour(hourString) {
    let temp = parseInt(hourString.substring(0,2)) + 1;
    let hour: string;
    if (temp < 10 ) {
      hour = "0" + temp.toString() + ":00";
    } else {
      hour = temp + ":00";
    }

    return hour;
  }

  setToHour(hourString) {
    let temp = parseInt(hourString.substring(0,2)) - 1;
    let hour: string;
    if (temp < 10 ) {
      hour = "0" + temp.toString() + ":00";
    } else {
      hour = temp + ":00";
    }

    return hour;
  }

  checkReservationDay() {

    if (!this.reservationDay) {
      let alert = this.alertCtrl.create({
        title: 'Oooops!',
        message: 'Seleziona la data della prenotazione per procedere',
        buttons: ['Ok']
      });
      alert.present();
      return;
    } else {
      let pickedDate: string;
      pickedDate = this.formatIonicDate(this.reservationDay);
      console.log(pickedDate);
      if (pickedDate === this.dateAndTime.day && this.dateAndTime.time > this.studyRoom.hours_open.from) {
        this.minFrom = this.dateAndTime.time.substring(0, 2) + ":00";
      }
    }
  }
  
  resetHours() {
    let pickedDate: string;
    pickedDate = this.formatIonicDate(this.reservationDay);
    console.log(pickedDate);
    if (pickedDate === this.dateAndTime.day && this.dateAndTime.time > this.studyRoom.hours_open.from) {
      this.hourFrom = this.dateAndTime.time.substring(0, 2) + ":00";
    } else {
      this.hourFrom = this.studyRoom.hours_open.from;
    }
    this.hourTo=  this.studyRoom.hours_open.to;
  }

  checkReservationFrom() {
    
    if (!this.hourFrom) {
      let alert = this.alertCtrl.create({
        title: 'Oooops!',
        message: 'Seleziona l\'ora di inizio della prenotazione per procedere',
        buttons: ['Ok']
      });
      alert.present();
      return;
    }

  }

  formatIonicDate(stringDate) {
    let year = stringDate.substring(0, 4);
    let month = stringDate.substring(5, 7);
    let day = stringDate.substring(8, stringDate.length);

    if (day.charAt(0) === "0") {
      day = day.slice(1);
    }

    if(month.charAt(0) === "0"){
      month = month.slice(1);
    }
    
    return day + "-" + month + "-" + year;
  }

  formatServerDateToIonic(stringDate) {
    let day = stringDate.substring(0, stringDate.indexOf("-"));
    let month = stringDate.substring(stringDate.indexOf("-") + 1, stringDate.lastIndexOf("-"));
    let year = stringDate.substring(stringDate.lastIndexOf("-") + 1, stringDate.length);

    if (day.length < 2) {
      day = "0" + day;
    }
    if (month.length < 2) {
      month = "0" + month;
    }

    return year + "-" + month + "-" + day;
  }
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Verifica disponibilità posto in corso...'
    });

    this.loading.present();
  }


  ionViewWillEnter() {
    this.getDays();
    this.setBaseHours();
    this.getServerDateTime();
  }

}

