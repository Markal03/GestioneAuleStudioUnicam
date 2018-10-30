import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding, ModalController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { StudyRoomPage } from '../study-room/study-room';
import { StudyRoomProvider } from '../../providers/study-room/study-room';
import { AuthProvider } from '../../providers/auth/auth';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { EditStudyRoomPage } from '../edit-study-room/edit-study-room';


/**
 * Generated class for the StudyRoomsManagementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-study-rooms-management',
  templateUrl: 'study-rooms-management.html',
})
export class StudyRoomsManagementPage {
  items;
  studyRooms: any;
  loading: any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, public studyRoomService: StudyRoomProvider,public modalCtrl: ModalController,
   public alertCtrl: AlertController, public authService: AuthProvider, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
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
     let confirm = this.alertCtrl.create({
      title: "Sei sicuro di voler procedere?",
      message: "L'operazione di eliminazione dell'aula studio è irreversibile.",
      buttons: [
        {
          text: "Indietro"
        },

        {
          text: "Conferma",
          handler: () => {this.studyRoomService.deleteStudyRoom(studyRoom.name).then((result) => {
            
              let toast = this.toastCtrl.create({
                message: 'Eliminazione aula studio completata',
                duration: 1000,
                position: 'middle'
              });

              let index = this.studyRooms.indexOf(studyRoom);
         
              if (index > -1) {
              this.studyRooms.splice(index, 1);
              toast.present();
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
 
   editStudyRoom(studyRoom){
     console.log("ciao");
     this.navCtrl.push(EditStudyRoomPage, {data: studyRoom});
   }
 
   getStudyRooms(ev) {
    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.studyRooms = this.studyRooms.filter((studyRoom) => {
        return (studyRoom.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }    
   showLoader(){
 
     this.loading = this.loadingCtrl.create({
       content: 'Creazione Aula...'
     });
 
     this.loading.present();
 
   }
 }
