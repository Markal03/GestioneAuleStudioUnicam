import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { StudentsProvider } from '../../providers/students/students';

/**
 * Generated class for the ReservationsManagementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reservations-management',
  templateUrl: 'reservations-management.html',
})
export class ReservationsManagementPage {
  student;
  reservations;

  constructor(public navCtrl: NavController, public navParams: NavParams, public studentsService: StudentsProvider, public alertCtrl: AlertController) {
    this.student = navParams.get('data');
  }

  ionViewWillEnter(){
    this.studentsService.getReservations(this.student.name).then((data) => {
      this.reservations = data;
    }, (err) => {
      let alert = this.alertCtrl.create({
        title: 'Oooops!',
        message: 'C\'è stato un errore, non è stato possibile caricare le informazioni degli studenti',
        buttons: ['Ok']
      });
      alert.present();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservationsManagementPage');
    console.log(this.student);
  }

}
