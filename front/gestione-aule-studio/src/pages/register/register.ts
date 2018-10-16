import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AuthProvider} from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { MainPage } from '../main/main';

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
  passwordConfirm: string;

  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public authService: AuthProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }    
  
  register() {

    if (this.password != this.passwordConfirm) {
      //Creo l'alert se le due password non corrispondono
      let alert = this.alertCtrl.create({
        title: 'Errore',
        message: 'Le password inserite non corrispondono!',
        buttons: ['Ok']
      });
      alert.present();
    }
    
    this.showLoader();
    console.log("Email: " + this.email);
    console.log("Password: " + this.password);
    console.log("Password Conferma: " + this.passwordConfirm);

    let details = {
      name: this.nome,
      surname: this.cognome,
      email: this.email,
      password: this.password,
      passwordConfirm: this.passwordConfirm
    };
     
    this.authService.createAccount(details).then ((result) => {
      this.loading.dismiss();
      let confirm =  this.alertCtrl.create({
        title: 'Registrazione effettuata!',
        message: 'Registrazione avvenuta con successo!',
        buttons: [
          {
            text: 'Vai alla pagina principale',
            handler: () => {this.navCtrl.setRoot(MainPage, {data: result});}
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
        console.log(err);
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

