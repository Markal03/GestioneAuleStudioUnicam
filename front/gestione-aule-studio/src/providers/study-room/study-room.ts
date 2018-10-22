import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthProvider } from '../auth/auth';

import 'rxjs/add/operator/map';


/*
  Generated class for the StudyRoomProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StudyRoomProvider {

  constructor(public http: Http, public authService: AuthProvider) {
    console.log('Hello StudyRoomProvider Provider');
  }
  
  getStudyRooms(){
    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
      this.http.get('http://localhost:3000/adminSection', {headers: headers })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  addStudyRoom(studyRoom){
    return new Promise((resolve, reject) =>{
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.token);
        console.log('Aula studio json:' + JSON.stringify(studyRoom));
        this.http.post('http://localhost:3000/addStudyRoom', JSON.stringify(studyRoom), {headers: headers})
          .map(res => res.json())
          .subscribe(res=> {
            resolve(res);
          }, (err)=>{
            reject(err);
          });
    });
  }

  deleteStudyRoom(name){
      return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Authorization', this.authService.token);
        this.http.delete('http://localhost:3000/deleteStudyRoom/' + name , {headers: headers}).subscribe((res) => {
          resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }
  
  editStudyRoom(studyRoom){
    return new Promise ((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authoriazion', this.authService.token);
      this.http.put('http://localhost:300/modifyStudyRoom/', JSON.stringify(studyRoom), {headers: headers})
      .map(res => res.json())
          .subscribe(res=> {
            resolve(res);
          }, (err)=>{
            reject(err);
          });
    });
  }
}
