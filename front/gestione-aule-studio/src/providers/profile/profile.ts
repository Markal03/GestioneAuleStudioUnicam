import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';
import 'rxjs/add/operator/map';

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {

  constructor(public http: Http, public authService: AuthProvider) {
  }

  getUserInfos(){
    var url = 'http://localhost:3000/getUserInfos/';
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.get(url, {headers: headers})
        .map( res => res.json())
        .subscribe( data => {
          resolve(data);
        }, (err)=> {
          reject(err.json());
        });
    });

  }

  deleteProfile(){
    var url = 'http://localhost:3000/removeProfile/';
    return new Promise ((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
      this.http.delete(url, {headers: headers}).subscribe((res) => {
        console.log(res);
        resolve(res);
      }, (err) => {
        reject(err.json());
      });

    });
  }

  updatePassword(passwords) {
    var url = 'http://localhost:3000/modifyPassword/';
    return new Promise ((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
      headers.append('Content-type', 'Application/json')
      this.http.put(url, JSON.stringify(passwords), {headers: headers}).subscribe((res) => {
        console.log(res);
        resolve(res);
      }, (err) => {
        reject(err.json());
      });
    });
  }

  updateUserImage(image){
    //TODO
  }
}
