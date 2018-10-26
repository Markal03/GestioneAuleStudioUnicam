import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ReservePage } from '../reserve/reserve';
import { StudyRoomProvider } from '../../providers/study-room/study-room';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  id;
  studyRooms: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public studyRoomProvider: StudyRoomProvider, public alertCtrl: AlertController) {
  }

  initializeItems() {
    this.studyRoomProvider.getStudyRooms().then((data) => {
      this.studyRooms = data;
      console.log(this.studyRooms);
    }, (err) => {
      let alert = this.alertCtrl.create({
        title: 'Oooops!',
        message: 'C\'è stato un errore, non è stato possibile caricare le informazioni delle aule',
        buttons: ['Ok']
      });
      alert.present();
    });

  }

  getStudyRoom(ev) {
    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.studyRooms = this.studyRooms.filter((studyRoom) => {
        return (studyRoom.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

   reserve(studyRoom) {
    this.navCtrl.push(ReservePage, {data: studyRoom});
  }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
  ionViewWillEnter() {
    this.initializeItems();
  }

}
