import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReservePage } from '../reserve/reserve';

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

  items;
  id;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initializeItems();
  }

  initializeItems() {
    this.items = [
      'Polo Informatico Lodovici',
      'Campus Universitario',
      'Polo Scienze della Terra',
      'Polo El Fuego',
      'Polo Gyros Pita'
    ]
  }

  getItems(ev) {
    this.initializeItems();
    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

   reserve(item) {
    this.id = item;
    this.navCtrl.push(ReservePage, {data: this.id});
  }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
