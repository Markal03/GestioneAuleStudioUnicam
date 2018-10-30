import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
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
  loading;
  students;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public studentsService: StudentsProvider,
    public loadingCtrl: LoadingController) {
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
    this.showLoader();
    this.studentsService.deleteStudent(student.name).then((result) => {
      this.loading.dismiss();

        let index = this.students.indexOf(student);
        
        if (index > -1) {
          this.students.splice(index, 1);
        }

    }, (err) => {
      this.loading.dismiss();
        console.log(err);
    });
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

  showLoader(){
 
    this.loading = this.loadingCtrl.create({
      content: 'Eliminazione Studente...'
    });

    this.loading.present();

  }
}
