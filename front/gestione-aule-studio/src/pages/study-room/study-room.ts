import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { StudyRoomProvider } from '../../providers/study-room/study-room';
import { AuthProvider } from '../../providers/auth/auth';
import { AdminPage } from '../admin/admin';

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
  days: any [];

  name: string;
  capacity: number;
  from: string;
  to: string;
  days_open = [];
  description: string;
  image: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public studyRoomService: StudyRoomProvider, public modalCtrl: ModalController,
    public alertCtrl: AlertController, public authService: AuthProvider, public loadingCtrl: LoadingController) {
      this.initializeDays();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudyRoomPage');
  }

  initializeDays() {
    this.days = [
      {id:1, name:'Lunedì', selected: false},
      {id:2, name:'Martedì', selected: false},
      {id:3, name:'Mercoledì', selected: false},
      {id:4, name:'Giovedì', selected: false},
      {id:5, name:'Venerdì', selected: false}
    ]
  }

  addStudyRoom(){
    this.showLoader();

    let order = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];
    
    //Funzione per ordinare i giorni nell'array
    function sortDays(a,b){
      return order.indexOf(a) - order.indexOf(b); 
    }

    this.days_open.sort(sortDays);

    let hours = {
      from: this.from,
      to: this.to
    }

    //this.hours_open.push(hours);

    let studyRoom = {
      name: this.name,
      capacity: this.capacity,
      days_open: this.days_open,
      hours_open: hours,
      description: this.description,
      image: this.image
    };

    this.studyRoomService.addStudyRoom(studyRoom).then((result) => {
      this.loading.dismiss();
      let confirm = this.alertCtrl.create({
        title: 'Aula aggiunta con successo!',
        message: 'Aula aggiunta correttamente!',
        buttons: [
          {
            text: 'Ok',
            handler: () => {this.navCtrl.popTo(AdminPage)}
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
        message: err._body,
        //message: err._body.substring(err._body.indexOf(":") + 2, err._body.lastIndexOf("\"")),
        buttons: ['Ok']
      });
      console.log(err);
      alert.present();             
    });
  }

  //Aggiorna l'array dei giorni selezionati dinamicamente
  //ev è un oggetto creato ogni volta che si switcha valore di una checkbox
  selectDay(day, ev){
    if(ev.value){
      this.days_open.push(day);
    } else {
      this.days_open.splice(this.days_open.indexOf(day), 1);
    }
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Creazione Aula Studio in corso...'
    });
    this.loading.present();
  }
}