import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

declare const FB: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logged: boolean = false;
  fbPic: any;
  fbName: any;
  //loggedIntoAppWithFB: boolean = false;

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService) { }

  ngOnInit() {

    FB.init({
        appId      : '1269113989876166',
        cookie     : true,  // enable cookies to allow the server to access
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.8' // use graph api version 2.5
    });

    this.loggedInFB();
    //this.loggedIntoAppWithFB = this.authService.loggedInFB();
  }

  onLogoutClick(){
    this.authService.logout();

    this.flashMessage.show('You are logged out', {
      cssClass:'alert-success',
      timeout: 3000
    });
    this.router.navigate(['/login']);
    return false;
  }

  loggedInFB(){
    FB.getLoginStatus(response => {
      this.statusChangeCallback(response);
    });
  }

  statusChangeCallback(response: any) {
    if (response.status === 'connected') {
      //console.log("logged in to a facebook account");
      this.logged = true;
      this.me();
    } else {      
      //console.log("not logged in to a facebook account");
      this.logged = false;
    }
  }

  me() {
      FB.api('/me?fields=id,name,first_name,email,gender,picture.width(150).height(150),age_range,friends',
          (result => {
              if (result && !result.error) {        
                  this.fbPic = result.picture.data.url;
                  this.fbName = result.name;
                  //console.log(this.fbPic);
              } else {
                console.log("unable to find facebook user")
                  console.log(result.error);
              }
          }));
  };

}
