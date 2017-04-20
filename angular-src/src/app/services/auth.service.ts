import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import {Guest, Vacation} from '../helpers/classes';

declare const FB: any;

@Injectable()
export class AuthService {
  authToken: any;
  fbBool: any;
  user: any;
  vacations: any;
  guest: any;
  isDep: boolean;
  logged: boolean = false; //fb

  constructor(private http:Http) { 

    this.isDep = true;  //change to false if developing locally


    FB.init({
        appId      : '1269113989876166',
        cookie     : true,  // enable cookies to allow the server to access
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.8' // use graph api version 2.5
    });
  }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    console.log("browser...", user)
    let ep = this.prepEndpoint('api/register');
    //return this.http.post('http://localhost:3000/api/register', user,{headers: headers})
    return this.http.post(ep, user,{headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('api/authenticate');
    return this.http.post(ep, user,{headers: headers})
      .map(res => res.json());
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('api/profile');
    return this.http.get(ep,{headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired();
  }

  loggedInFB(){
    if (this.fbBool){
      return true;
    }else {
      return false;
    }
  }

  hasData(guests){
    if (guests == undefined){
    return false;
    } else {
      return true;
    }
  }

  logout(){
    this.authToken = null;
    this.fbBool = false;
    this.user = null;
    localStorage.clear();
  }

///////////////vacation service functions 
  addVacation(vacation){
    let headers = new Headers();
    this.loadToken();
    vacation.newFlag = false;
    console.log(vacation)
    let ep = this.prepEndpoint('api/vacations');
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.post(ep, vacation, {headers: headers})
      .map(res => res.json())
      .subscribe(
        data => console.log(data),
        err => console.log(err),
        () => console.log('yay')
      );
  }

  getVacations(): Observable<any> {
    let headers = new Headers();
    this.loadToken();
    let ep = this.prepEndpoint('api/vacations');
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get(ep,{headers: headers})
      .map(res => res.json())
  }

  updateVacation(vacation){
    let headers = new Headers();
    this.loadToken();
    let ep = this.prepEndpoint('api/vacations/edit');
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.put(ep, vacation, {headers: headers})
      .map(res => res.json())
      .subscribe(
        data => console.log(data),
        err => console.log(err),
        () => console.log('yay')
      );
  }

  deleteVacation(vacation){
    let headers = new Headers();
    this.loadToken();
    let ep = this.prepEndpoint('api/vacations/delete');
    headers.append('Authorization', this.authToken);
    console.log("deleting this vacation", vacation)
    headers.append('Content-Type','application/json');
    return this.http.put(ep, vacation, {headers: headers})
      .map(res => res.json())
      .subscribe(
        data => console.log(data),
        err => console.log(err),
        () => console.log('yay')
      );
  }

///////////////guest service functions
  addGuest(guest){
    let headers = new Headers();
    this.loadToken();
    let ep = this.prepEndpoint('api/vacations/guests');
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.post(ep, guest,{headers: headers})
      .map(res => res.json());
  }

  getGuests(): Observable<any>{
    let headers = new Headers();
    this.loadToken();
    let ep = this.prepEndpoint('api/vacations/guests');
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get(ep,{headers: headers})
      .map(res => res.json());
  }

  updateGuests(guest){
    let headers = new Headers();
    this.loadToken();
    let ep = this.prepEndpoint('api/vacations');
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get(ep,{headers: headers})
      .map(res => res.json());
  }

  deleteGuest(guest){
    let headers = new Headers();
    this.loadToken();
    let ep = this.prepEndpoint('api/vacations');
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get(ep,{headers: headers})
      .map(res => res.json());
  }

  sendPdf(file){
    let headers = new Headers();
    this.loadToken();
    let ep = this.prepEndpoint('api/email');
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.post(ep, file, {headers: headers})
      .map(res => res.json())
      .subscribe(
        data => console.log(data),
        err => console.log(err),
        () => console.log('yay')
      );
      ;
  }

//facebook login (front end handling fb user data/token (sub-optimal))
  // findFB(fbData){
  //   let headers = new Headers();
  //   headers.append('Content-Type','application/json');
  //   let ep = this.prepEndpoint('api/facebook');
  //   return this.http.post(ep, fbData,{headers: headers})
  //     .map(res => res.json());
  // }

  // loggedInFB(){
  //   FB.getLoginStatus(response => {
  //     this.statusChangeCallback(response);
  //   });
  // }

  // statusChangeCallback(response: any) {
  //     if (response.status === 'connected') {
  //       this.logged = true;
  //       return true;
  //     } else {
  //       this.logged = false;
  //       return false;
  //     }
  // }

  //facebook (backend implementation)
  // loginFlowFB(){
  //   let headers = new Headers();
  //   headers.append('Content-Type','application/json');
  //   let ep = this.prepEndpoint('api/auth/facebook');
  //   return this.http.get(ep,{headers: headers})
  //     .map(res => res.json());
  // };

  facebook(token){
    localStorage.setItem('id_token', token);
    this.authToken = token;
    this.fbBool = true;
  };

  prepEndpoint(ep){
    if(this.isDep){
      return ep;
    } else {
      //return 'http://localhost:8080/'+ep;
      return 'http://localhost:3000/'+ep;
    }
  }

}
