import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-reserve',
  templateUrl: 'reserve.html',
})
export class ReservePage {
  id;
  numeroPosti;
  titolo;
  immagine = new Image();

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

  ionViewWillEnter() {
    switch(this.id){
      case 0:{

        this.titolo = "Polo Informatico Lodovici";
        //Interrogare il database per tirare fuori il numero di posti disponibili
        this.numeroPosti = "13/30";
        this.immagine.src='../../assets/imgs/PoloLodovici.png';
        //Inserisco l'immagine nell'HTML
        document.getElementById("img").appendChild(this.immagine);
      
        break; 
      }
      case 1:{

        this.titolo = "Campus Universitario";
        //Interrogare il database per tirare fuori il numero di posti disponibili
        this.numeroPosti = "24/50";
        this.immagine.src='../../assets/imgs/CampusUniversitario.jpg';
        //Inserisco l'immagine nell'HTML
        document.getElementById("img").appendChild(this.immagine);
      
        break; 
      }
      case 2:{
        
        this.titolo = "Polo Geologia";
        //Interrogare il database per tirare fuori il numero di posti disponibili
        this.numeroPosti = "12/25";
        this.immagine.src='../../assets/imgs/PoloGeologia.jpg';
        //Inserisco l'immagine nell'HTML
        document.getElementById("img").appendChild(this.immagine);

      break; 
      }
      case 3:{
        this.titolo = "Polo El Fuego";
        //Interrogare il database per tirare fuori il numero di posti disponibili
        this.numeroPosti = "3/2";
        this.immagine.src='../../assets/imgs/ElFuego.jpg';
        //Inserisco l'immagine nell'HTML
        document.getElementById("img").appendChild(this.immagine);

      break; 
      }
      case 4:{

        this.titolo = "Polo Gyros Pita";
        //Interrogare il database per tirare fuori il numero di posti disponibili
        this.numeroPosti = "1/20";
        this.immagine.src='../../assets/imgs/GyrosPita.jpg';
        //Inserisco l'immagine nell'HTML
        document.getElementById("img").appendChild(this.immagine);
        
      break; 
      }
    }
  }
}
