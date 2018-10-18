import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { StudyRoomPage } from '../study-room/study-room';
import { StudyRoomProvider } from '../../providers/study-room/study-room';
import { AuthProvider } from '../../providers/auth/auth';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';

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
 studyRooms:any;
 loading: any;

 constructor(public navCtrl: NavController, public navParams: NavParams, public studyRoomService: StudyRoomProvider,public modalCtrl: ModalController,
  public alertCtrl: AlertController, public authService: AuthProvider, public loadingCtrl: LoadingController) {
    //this.initializeItems(); //Rimuovere quando è presente il backend
  }

  //Rimuovere quando è presente il backend
/*   initializeItems() {
    this.items = [
      {title: 'Polo Informatico Lodovici'},
      {title: 'Campus Universitario'},
      {title: 'Polo Scienze della Terra'},
      {title: 'Polo El Fuego'},
      {title: 'Polo Gyros Pita'}
  ];
  } */

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');

    //Popola la lista di aule disponibili con quelle presenti nel db
    //Da attivare quando è presente il backend

     this.studyRoomService.getStudyRooms().then((data) => {
      this.studyRooms = data;
      console.log('Aula studio:' + this.studyRooms);
    }, (err) => {
      console.log("Operazione non autorizzata");
    });
  }

  ionViewWillEnter(){
    this.studyRoomService.getStudyRooms().then((data) => {
      this.studyRooms = data;
      console.log('Aula studio:' + this.studyRooms);
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
/*     console.log('presenta il prompt');
    let prompt = this.alertCtrl.create({
      title:'Aggiungi un\'aula studio',
      message: 'Inserisci i dati:',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nome Aula'
        },
        {
          name: 'capacity',
          type: 'number',
          placeholder:'Numero posti disponibili'
        },
        {
          name: 'orarioApertura',
          placeholder:'Orario apertura'
        },
        {
          name: 'orarioChiusura',
          placeholder:'Orario chiusura'
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
                 this.studyRooms = result;
                 console.log("Aula studio creata");
               }, (err) => {
                 this.loading.dismiss();
                 console.log("Not allowed");             
               });
            }
          }
        }
      ]
    });

    prompt.present(); */
    this.navCtrl.push(StudyRoomPage);
  }

  removeStudyRoom(studyRoom){
    this.showLoader();

    this.studyRoomService.deleteStudyRoom(studyRoom._id).then((result) => {
      this.loading.dismiss();

        let index = this.studyRooms.indexOf(studyRoom);
        
        if (index > -1) {
          this.studyRooms.splice(index, 1);
        }

    }, (err) => {
      this.loading.dismiss();
        console.log("Permesso negato");
    });
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
