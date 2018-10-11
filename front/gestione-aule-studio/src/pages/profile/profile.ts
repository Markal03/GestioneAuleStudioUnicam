import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ProfileProvider }  from '../../providers/profile/profile';
import { HomePage } from '../home/home';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  result: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public profileProvider: ProfileProvider, public alertCtrl: AlertController, public toastCtrl: ToastController ) {
    this.result = this.navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    console.log(this.result.user._id);
  }

  //CRUD dati utente

  //Funzione per l'eliminazione del profilo utente
  deleteProfile() {
    var userId = this.result.user._id;

    let confirm = this.alertCtrl.create({
      title: "Sei sicuro di voler procedere?",
      message: "L'operazione di eliminazione del profilo è irreversibile.",
      buttons: [
        {
          text: "Indietro"
        },

        {
          text: "Conferma",
          handler: () => {this.profileProvider.deleteProfile(userId).then((result)=> {
            let toast = this.toastCtrl.create({
              message: 'Eliminazione profilo completata',
              duration: 1000,
              position: 'middle'
            });
            toast.onDidDismiss(() => {
              this.navCtrl.setRoot(HomePage);
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

  //Funzione per la modifica dell'immagine del profilo utente
  updateProfilePicture() {

  }
  //Funzione per la modifica password
  updatePassword() {
  }

}
