import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { StudyRoomProvider } from '../../providers/study-room/study-room';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the StudyRoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-study-room',
  templateUrl: 'study-room.html',
})
export class StudyRoomPage {

  studyRooms: any;
  loading: any;

  name: string;
  capacity: string;
  from: string;
  to: string;
  Lunedi : string; //provvisorio
  days_open = [];
  hours_open = [];
  description: string;
  image: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public studyRoomService: StudyRoomProvider, public modalCtrl: ModalController,
    public alertCtrl: AlertController, public authService: AuthProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudyRoomPage');
  }

    //TOFIX
  addStudyRoom(){
    this.showLoader();

    let studyRoom = {
      name: this.name,
      capacity: this.capacity,
      days_open: this.days_open.push(this.Lunedi),
      hours_open: this.hours_open.push(this.from, this.to),
      description: this.description,
      image: this.image
    };

    console.log(studyRoom);
    this.studyRoomService.addStudyRoom(studyRoom).then((result) => {
      this.loading.dismiss();
      let confirm = this.alertCtrl.create({
        title: 'Aula aggiunta con successo!',
        message: 'Aula aggiunta correttamente!',
        buttons: [
          {
            text: 'Ok',
            handler: () => {confirm.dismiss();}
          }
        ]
      });
      this.studyRooms = result;
      confirm.present();
      console.log("Aula studio creata");
    }, (err) => {
      this.loading.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Oooops!',
        message: 'C\'è stato un errore, aggiunta aula non effettuata',
        buttons: ['Ok']
      });
      console.log(err);
      alert.present();             
    });
  }


  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Creazione account in corso...'
    });
    this.loading.present();
  }
}
