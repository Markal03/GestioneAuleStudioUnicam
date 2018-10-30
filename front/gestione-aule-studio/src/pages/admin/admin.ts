import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { StudentsManagementPage } from '../students-management/students-management';
import { HomePage } from '../home/home';
import { AuthProvider } from '../../providers/auth/auth';
import { StudyRoomsManagementPage } from '../study-rooms-management/study-rooms-management';


@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

 constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthProvider) {
  }

  studyRoomsManagement(){
    this.navCtrl.push(StudyRoomsManagementPage);
  }

  studentsManagement(){
    this.navCtrl.push(StudentsManagementPage);
  }

  logout(){
    this.authService.logout();
    this.navCtrl.setRoot(HomePage);
  }
}
