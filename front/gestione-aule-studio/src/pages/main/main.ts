import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
/* import { LoginPage } from '../login/login'; */
import { HomePage } from '../home/home';
import { ReservationProvider } from '../../providers/reservation/reservation';


@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  result: any;
  reservations: any;
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public reservationProvider: ReservationProvider) {
    //Setto la pagina Main come root in modo da non poter tornare indietro
    //this.navCtrl.setRoot(MainPage);
    this.result = this.navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
    console.log(this.result);
  }

  getUserReservations() {
    this.reservationProvider.getUserReservations().then((result) => {
      this.reservations = result;
      console.log(this.reservations);
    }, (err) => {
      let alert = this.alertCtrl.create({
        title: 'Oooops!',
        message: 'C\'è stato un errore, non è stato possibile caricare le prenotazioni dell\'utente',
        buttons: ['Ok']
      });
      alert.present();
    });
  }

  deleteReservation(reservationId) {
    let confirm = this.alertCtrl.create({
      title: "Sei sicuro di voler procedere?",
      message: "L'operazione di eliminazione della prenotazione è irreversibile.",
      buttons: [
        {
          text: "Indietro"
        },

        {
          text: "Conferma",
          handler: () => {this.reservationProvider.deleteReservation(reservationId).then((result)=> {
            let toast = this.toastCtrl.create({
              message: 'Eliminazione prenotazione completata',
              duration: 1000,
              position: 'middle'
            });
            toast.onDidDismiss(() => {
              this.getUserReservations();
            });
            toast.present();
          }, (err) => {
            let alert = this.alertCtrl.create({
              title: 'Oooops!',
              message: 'C\'è stato un errore, eliminazione non effettuata',
              buttons: ['Ok']
            });
            console.log(err);
            alert.present();
          });}
        }
      ]

    });

    confirm.present();
    
  }

  profile(){
    //Vado al profilo mettendolo sulla pila
    this.navCtrl.push(ProfilePage, {data: this.result});
  }

  logout(){
    //Torno all'homepage mettendola sulla pila e la setto come Root
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.push(HomePage);
  
  }

  ionViewWillEnter() {
    this.getUserReservations();
  }
}
