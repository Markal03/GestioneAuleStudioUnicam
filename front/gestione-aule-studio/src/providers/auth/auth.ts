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
        console.log('token: \n');
        console.log(this.storage.get('token'));
        //Load token if exists
        this.storage.get('token').then((value) => {
            //TODO il token qui è null ma segna che si è comunque loggati
            this.token = value;
            console.log(this.token);
            let headers = new Headers();
            headers.append('Authorization', this.token);

            this.http.get('http://localhost:3000/protected', {headers: headers})
                .subscribe(res => {
                  let data = res.json();
                    resolve(data);
                }, (err) => {
                    reject(err);
                });
 
        });        
 
    });
 
  }
 
  createAccount(details){
 
    return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        var body =  JSON.stringify(details);
        var url = 'http://localhost:3000/register';
        headers.append('Content-Type', 'application/json');
        this.http.post(url, body, {headers: headers})
          .subscribe(res => {

            let data = res.json();
            this.token = data.token;
            this.storage.set('token', data.token);
            resolve(data);
 
          }, (err) => {
            err.json();
            reject(err.json());
          });
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

