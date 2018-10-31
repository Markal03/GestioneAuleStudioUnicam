import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthProvider } from '../auth/auth';

import 'rxjs/add/operator/map';
import { Header } from 'ionic-angular';
/*
  Generated class for the ReservationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReservationProvider {

  constructor(public http: Http, public authService: AuthProvider) {
  }

  public getUserReservations() {
    var url = "http://localhost:3000/getReservations";

    return new Promise((resolve, reject ) => {
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
      this.http.get(url, {headers: headers})
        .map((res) => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        } )
    });
  }

  public addReservation(reservation) {
    var url="http://localhost:3000/bookStudyRoom";

    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);
      this.http.post(url, JSON.stringify(reservation), {headers: headers})
        .map(res => res.json())
        .subscribe(res=> {
          resolve(res);
        }, (err)=>{
          reject(err);
        });
    });
  }

  public updateReservation(reservation, reservationId) {
    var url ="http://localhost:3000/modifyReservation/";

    return new Promise ((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
      headers.append('Content-type', 'Application/json')
      this.http.put(url + reservationId, JSON.stringify(reservation), {headers: headers}).subscribe((res) => {
        console.log(res);
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  public deleteReservation(reservationId) {
    var url ="http://localhost:3000/deleteReservation/";

    return new Promise ((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
      this.http.delete(url + reservationId, {headers: headers}).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });

    });
  }

  public getDateAndTime() {
    var url = "http://localhost:3000/getTime";
    return new Promise((resolve, reject ) => {
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
      this.http.get(url, {headers: headers})
        .map((res) => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        } )
    });

  }

  

}
