import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  username:string;
  password:string;
  passwordConferma:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }    
  
  register() {

    console.log("Username: " + this.username);
    console.log("Password: " + this.password);
    console.log("Password Conferma: " + this.passwordConferma);

    if (this.password != this.passwordConferma) {
      //Creo l'alert se le due password non corrispondono
      let alert = this.alertCtrl.create({
        title: 'Errore',
        message: 'Le password inserite non corrispondono!',
        buttons: ['Ok']
      });
      alert.present();
    }

  }
}
