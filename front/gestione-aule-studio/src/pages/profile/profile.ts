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
  public result: any;
  public userInfos: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public profileProvider: ProfileProvider, public alertCtrl: AlertController, public toastCtrl: ToastController ) {
    this.result = this.navParams.get('data');
  }

 /* ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.profileProvider.getUserInfos(this.result.user._id).then((data) => {
      this.userInfos = data;
      console.log(this.userInfos);
    }, (err) => {
      let alert = this.alertCtrl.create({
        title: 'Oooops!',
        message: 'C\'è stato un errore, non è stato possibile caricare le informazioni del profilo',
        buttons: ['Ok']
      });
      alert.present();
    });

  }*/

  ionViewWillEnter() {
    console.log('ionViewWillEnter ProfilePage');
    this.profileProvider.getUserInfos().then((data) => {
      this.userInfos = data;
      console.log(this.userInfos);
    }, (err) => {
      let alert = this.alertCtrl.create({
        title: 'Oooops!',
        message: 'C\'è stato un errore, non è stato possibile caricare le informazioni del profilo',
        buttons: ['Ok']
      });
      alert.present();
    });
  }

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
    var userId = this.result.user._id;
    let updatePasswordAlert = this.alertCtrl.create({
      title: 'Modifica Passowrd',
      message: 'Inserisci la tua vecchia password e la nuova e clicca su \'Modifica\' per procedere',
      inputs: [
        {
          name: 'oldPassword',
          placeholder: 'Vecchia Password',
          type: 'password'
        },
        
        {
          name: 'newPassword',
          placeholder: 'Nuova Password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Indietro'
        },
        {
          text: 'Modifica',
          handler: (data)=> {this.profileProvider.updatePassword(userId, data).then((result)=> {
            let toast = this.toastCtrl.create({
              message: 'Password modificata correttamente',
              duration: 1000,
              position: 'middle'
            });
            toast.present();
          }, (err) => {
            let alert = this.alertCtrl.create({
              title: 'Oooops!',
              message: err._body,
              buttons: ['Ok']
            });
            console.log(err);
            alert.present();
          });}
        }
      ]
    });
    updatePasswordAlert.present();
  }

}
