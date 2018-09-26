import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-reserve',
  templateUrl: 'reserve.html',
})
export class ReservePage {
  id;
  numeroPostiDisponibili;
  numeroPosti;
  titolo;
  isEnabled = true;
  immagine = new Image();

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.id = navParams.get('data');
  }

  //Funzione di creazione di un messaggio d'alert per l'utente
  confirmationAlert(){
    const alert = this.alertCtrl.create({
      title: 'Prenotazione Effettuata!',
      subTitle:'Puoi modificare o cancellare la tua prenotazione in qualsiasi momento',
      buttons: ['OK']
    });
    alert.present();
  }

  //Funzione per la conferma della prenotazione da parte dell'utente
  createReservation(){
      //Comunico all'utente l'avvenuta prenotazione
      this.confirmationAlert();
      //Riduco i posti disponibili di 1
      //Da sistemare inserendo un'interazione con il database per il numero dei posti
      this.numeroPostiDisponibili--;
      //Ritorno al menù principale
      this.navCtrl.popToRoot();    
  }

  //Funzione di load dell'aula in base a quella selezionata dall'utente
  selectClass(){
    switch(this.id){
      case 0:{

        this.titolo = "Polo Informatico Lodovici";
        //Interrogare il database per estrarre il numero di posti disponibili

        this.numeroPostiDisponibili = 16;
        this.numeroPosti = 30;

        this.immagine.src='../../assets/imgs/PoloLodovici.png';
        //Inserisco l'immagine nell'HTML
        document.getElementById("img").appendChild(this.immagine);
      
        break; 
      }
      case 1:{

        this.titolo = "Campus Universitario";
        //Interrogare il database per estrarre il numero di posti disponibili
        
        this.numeroPostiDisponibili = 5;
        this.numeroPosti = 40;

        this.immagine.src='../../assets/imgs/CampusUniversitario.jpg';
        //Inserisco l'immagine nell'HTML
        document.getElementById("img").appendChild(this.immagine);
      
        break; 
      }
      case 2:{
        
        this.titolo = "Polo Geologia";
        //Interrogare il database per estrarre il numero di posti disponibili
        this.numeroPostiDisponibili = 12;
        this.numeroPosti = 25;

        this.immagine.src='../../assets/imgs/PoloGeologia.jpg';
        //Inserisco l'immagine nell'HTML
        document.getElementById("img").appendChild(this.immagine);

      break; 
      }
      case 3:{
        this.titolo = "Polo El Fuego";
        //Interrogare il database per estrarre il numero di posti disponibili
        this.numeroPostiDisponibili = 0;
        this.numeroPosti = 15;

        this.immagine.src='../../assets/imgs/ElFuego.jpg';
        //Inserisco l'immagine nell'HTML
        document.getElementById("img").appendChild(this.immagine);

      break; 
      }
      case 4:{

        this.titolo = "Polo Gyros Pita";
        //Interrogare il database per estrarre il numero di posti disponibili
        this.numeroPostiDisponibili = 4;
        this.numeroPosti = 20;

        this.immagine.src='../../assets/imgs/GyrosPita.jpg';
        //Inserisco l'immagine nell'HTML
        document.getElementById("img").appendChild(this.immagine);
        
      break; 
      }
   }
  }

  //Funzione che controlla se ci sono posti disponibili, altrimenti disabilita il tasto della prenotazione
  checkAvailability(){
    console.log(this.numeroPostiDisponibili);
    if (this.numeroPostiDisponibili == 0){
      this.isEnabled = false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservePage');    
  }

  ionViewWillEnter() {
    this.selectClass();
    this.checkAvailability();
    }
}

