<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
=======
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';
import 'rxjs/add/operator/map';
>>>>>>> 3deb5a03ae799730c897d6a0416c28e36c620d03

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {

<<<<<<< HEAD
  constructor(public http: HttpClient) {
    console.log('Hello ProfileProvider Provider');
=======
  constructor(public http: Http, public authService: AuthProvider) {
  }

  deleteProfile(userId){
    var url = 'http://localhost:3000/removeProfile/'
    return new Promise ((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
      this.http.delete(url + userId, {headers: headers}).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });

    });
>>>>>>> 3deb5a03ae799730c897d6a0416c28e36c620d03
  }

}
