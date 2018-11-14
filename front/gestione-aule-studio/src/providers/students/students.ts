import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';
import { Http, Headers } from '@angular/http';

/*
  Generated class for the StudentsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StudentsProvider {

  constructor(public http: Http, public authService: AuthProvider) {
  }

  getStudents(){
    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
      this.http.get('http://localhost:3000/usersList', {headers: headers })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err.json());
        });
    });
  }

  deleteStudent(user_id){
    return new Promise ((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
      this.http.delete("http://localhost:3000/deleteUser/" + user_id, {headers: headers}).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err.json());
      });

    });
  }
}
