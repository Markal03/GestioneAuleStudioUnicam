import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { StudyRoomPage } from '../study-room/study-room';
import { StudyRoomProvider } from '../../providers/study-room/study-room';
import { AuthProvider } from '../../providers/auth/auth';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { EditStudyRoomPage } from '../edit-study-room/edit-study-room';

/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {
 items;
 studyRooms: any;
 loading: any;

 constructor(public navCtrl: NavController, public navParams: NavParams, public studyRoomService: StudyRoomProvider,public modalCtrl: ModalController,
  public alertCtrl: AlertController, public authService: AuthProvider, public loadingCtrl: LoadingController) {
  }

   ionViewWillEnter(){
    this.studyRoomService.getStudyRooms().then((data) => {
      this.studyRooms = data;
    }, (err) => {
      let alert = this.alertCtrl.create({
        title: 'Oooops!',
        message: 'C\'è stato un errore, non è stato possibile caricare le informazioni delle aule',
        buttons: ['Ok']
      });
      alert.present();
    });
  } 

  addStudyRoom(){
    this.navCtrl.push(StudyRoomPage);
  }

  removeStudyRoom(studyRoom){
    this.showLoader();
    this.studyRoomService.deleteStudyRoom(studyRoom.name).then((result) => {
      this.loading.dismiss();

        let index = this.studyRooms.indexOf(studyRoom);
        
        if (index > -1) {
          this.studyRooms.splice(index, 1);
        }

    }, (err) => {
      this.loading.dismiss();
        console.log("Aula non trovata");
    });
  }

  editStudyRoom(studyRoom){
    console.log("ciao");
    this.navCtrl.push(EditStudyRoomPage, {data: studyRoom});
  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Creazione Aula...'
    });

    this.loading.present();

  }
}
