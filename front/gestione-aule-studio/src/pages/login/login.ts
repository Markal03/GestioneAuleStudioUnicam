import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, AlertController } from 'ionic-angular';
import { MainPage } from '../main/main';
import { AuthProvider } from '../../providers/auth/auth';
import { AdminPage } from '../admin/admin';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  email: string;
  password: string;
  loading: any;
  result: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController, public authService: AuthProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

    this.showLoader();
 
    //Check if already authenticated
     this.authService.checkAuthentication().then((res) => {
        console.log("Already authorized");
        this.loading.dismiss();
        this.result = res;
        if(this.result.user.admin){
          this.navCtrl.setRoot(AdminPage);
        } else {
        this.navCtrl.setRoot(MainPage, {data: res});
        }

    }, (err) => {
        console.log("Not already authorized");
        this.loading.dismiss();
    });  
  }

  login(){

    this.showLoader();

    let credentials = {
      email: this.email,
      password: this.password
  };

   this.authService.login(credentials).then((result) => {
      this.loading.dismiss();
      this.result = result;
      if(this.result.user.admin){
        this.navCtrl.setRoot(AdminPage);
      } else {
        this.navCtrl.setRoot(MainPage, {data: result});
      }
  }, (err) => {
    let alert = this.alertCtrl.create({
      title: 'Errore',
      message: 'Username o password errati!',
      buttons: ['Ok']
    });
    alert.present();
      this.loading.dismiss();
      console.log(err);
  }); 

  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Autenticazione in corso...'
    });

    this.loading.present();
  }

}
