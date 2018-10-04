import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AuthProvider} from '../../providers/auth/auth'

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

  nome: string;
  cognome: string;
  email: string;
  password: string;
  passwordConferma: string;

  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public authService: AuthProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }    
  
  register() {

    console.log("Email: " + this.email);
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

    let details = {
      nome: this.nome,
      cognome: this.cognome,
      email: this.email,
      password: this.password,
      passwordConferma: this.passwordConferma
    };
     
  this.authService.createAccount(details).then ((result) => {

  })

  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Creazione account in corso...'
    });

    this.loading.present();
    }
  }

