import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AuthProvider} from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

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

    this.showLoader();
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
      name: this.nome,
      surname: this.cognome,
      email: this.email,
      password: this.password,
      passwordConferma: this.passwordConferma
    };
     
    this.authService.createAccount(details).then ((result) => {
      this.loading.dismiss();
      let confirm =  this.alertCtrl.create({
        title: 'Registrazione effettuata!',
        message: 'Registrazione avvenuta con successo, puoi effettuare il login',
        buttons: [
          {
            text: 'Vai al login',
            handler: () => {this.navCtrl.push(LoginPage);}
          }
        ]
      });
      confirm.present();
      }, (err) => {
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Oooops!',
          message: 'C\'è stato un errore, registrazione non effettuata',
          buttons: ['Ok']
        });
        alert.present();
      });
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Creazione account in corso...'
    });

    this.loading.present();
  }

}

