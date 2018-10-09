import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding } from 'ionic-angular';
import { StudyRoomPage } from '../study-room/study-room';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initializeItems();

  }

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

  addItem(item){
    this.navCtrl.push(StudyRoomPage);
  }

  removeItem(item){
    //TODO
  }

  editItem(item){
    //TODO
  }
}
