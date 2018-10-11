import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
/* import { LoginPage } from '../login/login'; */
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  result: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //Setto la pagina Main come root in modo da non poter tornare indietro
    //this.navCtrl.setRoot(MainPage);
    this.result = this.navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
    console.log(this.result);
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
}
