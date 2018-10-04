import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  public token: any;

  constructor(public http: Http, public storage: Storage) {
 
  }
 
  //TODO: Rivedere per la route
  checkAuthentication(){
 
    return new Promise((resolve, reject) => {
 
        //Load token if exists
        this.storage.get('token').then((value) => {
 
            this.token = value;
 
            let headers = new Headers();
            headers.append('Authorization', this.token);
 
            this.http.get('http://localhost:3000/login', {headers: headers})
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
 
        });        
 
    });
 
  }
 
  createAccount(details){
 
    return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
 
        this.http.post('http://localhost:3000/register', JSON.stringify(details), {headers: headers})
          .subscribe(res => {
            let data = res.json();
            this.token = data.token;
            this.storage.set('token', data.token);
            resolve(data);
 
          }, (err) => {
            reject(err);
          });
          console.log(details);
    });
 
  }
 
  login(credentials){
 
    return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
 
        this.http.post('http://localhost:3000/login', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {
 
            let data = res.json();
            this.token = data.token;
            this.storage.set('token', data.token);
            resolve(data);
            
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
 
    });
 
  }
 
  logout(){
    this.storage.set('token', '');
  }
 
}

