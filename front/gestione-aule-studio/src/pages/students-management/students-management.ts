import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { StudentsProvider } from '../../providers/students/students';
import { ReservationsManagementPage } from '../reservations-management/reservations-management';

/**
 * Generated class for the StudentsManagementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-students-management',
  templateUrl: 'students-management.html',
})
export class StudentsManagementPage {
  students;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public studentsService: StudentsProvider,
  public toastCtrl: ToastController) {
  }

  ionViewWillEnter(){
    this.studentsService.getStudents().then((data) => {
      this.students = data;
      console.log(this.students);
    }, (err) => {
      let alert = this.alertCtrl.create({
        title: 'Oooops!',
        message: 'C\'è stato un errore, non è stato possibile caricare le informazioni degli studenti',
        buttons: ['Ok']
      });
      alert.present();
    });
  }

  removeStudent(student){
    let confirm = this.alertCtrl.create({
      title: "Sei sicuro di voler procedere?",
      message: "L'operazione di eliminazione dello studente è irreversibile.",
      buttons: [
        {
          text: "Indietro"
        },

        {
          text: "Conferma",
          handler: () => {this.studentsService.deleteStudent(student._id).then((result) => {
            let toast = this.toastCtrl.create({
              message: 'Eliminazione studente',
              duration: 1000,
              position: 'middle'
            });

        let index = this.students.indexOf(student);
        
        if (index > -1) {
          this.students.splice(index, 1);
        }

    }, (err) => {
      let alert = this.alertCtrl.create({
        title: 'Oooops!',
        message: 'C\'è stato un errore, eliminazione non effettuata',
        buttons: ['Ok']
      });
         console.log(err);
         alert.present();
     });}
    
    }
  
  ]
   
  });
   
   confirm.present();
  }

  getStudents(ev) {
    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.students = this.students.filter((student) => {
        return (student.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentsManagementPage');
  }

  browseReservations(student){
    this.navCtrl.push(ReservationsManagementPage, {data: student});
  }
}
