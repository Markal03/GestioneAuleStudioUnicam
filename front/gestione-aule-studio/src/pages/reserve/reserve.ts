import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-reserve',
  templateUrl: 'reserve.html',
})
export class ReservePage {
  id;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.id = navParams.get('data');
    this.getId();
  }

  getId(){
    console.log(this.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservePage');
  }

}
