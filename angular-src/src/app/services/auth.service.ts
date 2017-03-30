import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import {Guest, Vacation} from '../helpers/classes';


@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  vacations: any;
  guest: any;

  constructor(private http:Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    console.log("browser...", user)
    //return this.http.post('http://localhost:3000/users/register', user,{headers: headers})
    return this.http.post('users/register', user,{headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('users/authenticate', user,{headers: headers})
      .map(res => res.json());
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('users/profile',{headers: headers})
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

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

///////////////vacation service functions 
  addVacation(vacation){
    let headers = new Headers();
    this.loadToken();
    vacation.newFlag = false;
    console.log(vacation)
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.post('users/vacations', vacation, {headers: headers})
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
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('users/vacations',{headers: headers})
      .map(res => res.json())
  }

  updateVacation(vacation){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.put('users/vacations/edit', vacation, {headers: headers})
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
    headers.append('Authorization', this.authToken);
    console.log("deleting this vacation", vacation)
    headers.append('Content-Type','application/json');
    return this.http.put('users/vacations/delete', vacation, {headers: headers})
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
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.post('users/vacations/guests', guest,{headers: headers})
      .map(res => res.json());
  }

  getGuests(): Observable<any>{
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('users/vacations/guests',{headers: headers})
      .map(res => res.json());
  }

  updateGuests(guest){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('users/vacations',{headers: headers})
      .map(res => res.json());
  }

  deleteGuest(guest){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('users/vacations',{headers: headers})
      .map(res => res.json());
  }

}
