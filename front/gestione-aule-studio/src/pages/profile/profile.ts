import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  //CRUD dati utente

  //Funzione per l'eliminazione del profilo utente
  deleteProfile() {
  }

  //Funzione per la modifica dell'immagine del profilo utente
  updateProfilePicture() {

  }
  //Funzione per la modifica password
  updatePassword() {
  }

}
