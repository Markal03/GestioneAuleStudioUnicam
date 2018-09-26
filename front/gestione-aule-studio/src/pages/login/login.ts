import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { MainPage } from '../main/main';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  username:string;
  password:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    console.log("Username: " + this.username);
    console.log("Password: " + this.password);

    //TODO
    //Controllo se l'Username e la Password sono presenti nel database e sono corretti
    //Controllo se l'account inserito è un account Amministratore o Utente

    //Pusho MainPage sulla pila delle pagine e la setto come root in modo da non poter tornare indietro
    this.navCtrl.push(MainPage);
    this.navCtrl.setRoot(MainPage);
  }
}
