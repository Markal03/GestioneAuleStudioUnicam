import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {}

  //pusho la pagina di login sulla pila delle pagine
  loginPage(){
    this.navCtrl.push(LoginPage);
  }

  //pusho la pagina di registrazione sulla pila delle pagine
  registerPage(){
    this.navCtrl.push(RegisterPage);
  }

}
