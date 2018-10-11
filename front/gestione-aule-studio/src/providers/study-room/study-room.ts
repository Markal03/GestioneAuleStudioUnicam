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
  
  addStudyRoom(studyRoom){
    return new Promise((resolve, reject) =>{

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.token);

        this.http.post('http://localhost:3000/addStudyRoom', JSON.stringify(studyRoom), {headers: headers})
          .map(res => res.json())
          .subscribe(res=> {
            resolve(res);
          }, (err)=>{
            reject(err);
          });
    });
  }

}
