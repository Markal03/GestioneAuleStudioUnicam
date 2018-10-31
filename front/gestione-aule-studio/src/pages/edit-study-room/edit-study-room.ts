import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { StudyRoomProvider } from '../../providers/study-room/study-room';
import { AuthProvider } from '../../providers/auth/auth';
import { AdminPage } from '../admin/admin';

/**
 * Generated class for the EditStudyRoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-study-room',
  templateUrl: 'edit-study-room.html',
})
export class EditStudyRoomPage {
  studyRoom;
  editedStudyRoom;

  loading: any;
  days: any [];

  name: string;
  capacity: string;
  from: string;
  to: string;
  days_open = [];
  description: string;
  image: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public studyRoomService: StudyRoomProvider, public modalCtrl: ModalController,
    public alertCtrl: AlertController, public authService: AuthProvider, public loadingCtrl: LoadingController) {
    this.studyRoom = navParams.get('data');
    this.initializeDays();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditStudyRoomPage');
    this.from = this.studyRoom.hours_open.from;
    this.to = this.studyRoom.hours_open.to;
  }

  initializeDays() {
    this.days = [
      {id:1, name:'Lunedì', selected: false},
      {id:2, name:'Martedì', selected: false},
      {id:3, name:'Mercoledì', selected: false},
      {id:4, name:'Giovedì', selected: false},
      {id:5, name:'Venerdì', selected: false}
    ]
    this.checkDays();
  }

  isChecked(day){
      if (day.selected) {
      return this.days.indexOf(day) >= 0;
      }
  }

  checkDays(){
    
    if (this.studyRoom.days_open.includes("Lunedì")){
      this.days[0].selected = true;
      this.days_open.push(this.days[0].name);
    }
    if (this.studyRoom.days_open.includes("Martedì")){
      this.days[1].selected = true;
      this.days_open.push(this.days[1].name);
    }
    if (this.studyRoom.days_open.includes("Mercoledì")){
      this.days[2].selected = true;
      this.days_open.push(this.days[2].name);
    }
    if (this.studyRoom.days_open.includes("Giovedì")){
      this.days[3].selected = true;
      this.days_open.push(this.days[3].name);
    }
    if (this.studyRoom.days_open.includes("Venerdì")){
      this.days[4].selected = true;
      this.days_open.push(this.days[4].name);
    }

  }

  selectDay(day, ev){
    if(ev.value){
      this.days_open.push(day);
    } else {
      this.days_open.splice(this.days_open.indexOf(day), 1);
    }
  }

  editStudyRoom(){
    this.showLoader();

    let hours = {
      from: this.from,
      to: this.to
    }


    console.log(this.days_open);

    let editedStudyRoom = {
      name: this.name,
      capacity: this.capacity,
      days_open: this.days_open,
      hours_open: hours,
      description: this.description,
      image: this.image
    }
    
    this.studyRoomService.editStudyRoom(editedStudyRoom).then((result) => {
      this.loading.dismiss();
      let confirm = this.alertCtrl.create({
        title: 'Aula modificata con successo!',
        message: 'Aula modificata correttamente!',
        buttons: [
          {
            text: 'Ok',
            handler: () => {this.navCtrl.popTo(AdminPage)}
          }
        ]
      });
      confirm.present();
      console.log("Aula studio modificata");
    }, (err) => {
      this.loading.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Oooops!',
        message: 'C\'è stato un errore, modifica aula non effettuata',
        buttons: ['Ok']
      });
      console.log(err);
      alert.present();             
    });
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Modifica Aula Studio in corso...'
    });
    this.loading.present();
  }
}
