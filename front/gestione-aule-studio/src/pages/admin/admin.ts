import { Component } from '@angular/core';
<<<<<<< HEAD
import { IonicPage, NavController, NavParams, ItemSliding } from 'ionic-angular';
import { StudyRoomPage } from '../study-room/study-room';
=======
import { IonicPage, NavController, NavParams, ItemSliding, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { StudyRoomPage } from '../study-room/study-room';
import { StudyRoomProvider } from '../../providers/study-room/study-room';
import { AuthProvider } from '../../providers/auth/auth';
>>>>>>> 3deb5a03ae799730c897d6a0416c28e36c620d03

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
 studyRoom:any;
 loading: any;

 constructor(public navCtrl: NavController, public navParams: NavParams, public studyRoomService: StudyRoomProvider,public modalCtrl: ModalController,
  public alertCtrl: AlertController, public authService: AuthProvider, public loadingCtrl: LoadingController) {
    this.initializeItems();

  }

  //Provvisorio
  initializeItems() {
    this.items = [
      {title: 'Polo Informatico Lodovici'},
      {title: 'Campus Universitario'},
      {title: 'Polo Scienze della Terra'},
      {title: 'Polo El Fuego'},
      {title: 'Polo Gyros Pita'}
  ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }

<<<<<<< HEAD
  addItem(item){
    this.navCtrl.push(StudyRoomPage);
=======
  addStudyRoom(){
    console.log('presenta il prompt');
    let prompt = this.alertCtrl.create({
      title:'Aggiungi un\'aula studio',
      message: 'Inserisci i dati:',
      inputs: [
        {
          name: 'nome',
          placeholder: 'Nome Aula'
        },
        {
          name: 'numeroPosti',
          placeholder:'Numero posti disponibili'
        }
      ],
      buttons: [
        {
          text: 'Annulla'
        },
        {
          text: 'Aggiungi Aula',
          handler: studyRoom => {
            if (studyRoom){
               this.showLoader();

               this.studyRoomService.addStudyRoom(studyRoom).then((result) => {
                 this.loading.dismiss();
                 this.studyRoom = result;
                 console.log("Aula studio creata");
               }, (err) => {
                 this.loading.dismiss();
                 console.log("not allowed");

               
               });
            }
          }
        }
      ]
    });
    prompt.present();
>>>>>>> 3deb5a03ae799730c897d6a0416c28e36c620d03
  }

  removeStudyRoom(studyRoom){
    //TODO
  }

  editStudyRoom(studyRoom){
    //TODO
  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Creazione Aula...'
    });

    this.loading.present();

  }
}
