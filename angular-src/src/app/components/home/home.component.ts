import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {WindowRef} from '../../helpers/WindowRef';

declare const FB: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

// token: any;
logged: boolean = false;
fbPic: any;
fbName: any;
errorMsg: any;

constructor(private router:Router, private authService: AuthService, private window:WindowRef) { 

}

ngOnInit() {

    FB.init({
        appId      : '1269113989876166',
        cookie     : true,  // enable cookies to allow the server to access
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.8' // use graph api version 2.5
    });

	this.loggedInFB();

};

	facebook(){
		//console.log(this.window.nativeWindow.location.host);
		//console.log(this.window.nativeWindow.location.protocol);
		this.window.nativeWindow.location = this.window.nativeWindow.location.protocol + '//' + 'localhost:3000' + '/auth/facebook';
		//this.window.nativeWindow.location = '/auth/facebook'; //for deploy
	};

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

	logoutAndLogin(){
		FB.logout(response => {
      		console.log("user is now logged out");
      		this.logoutLocal();
    	});
	}

	logoutLocal(){
		this.authService.logout();
		console.log("log out of app")
		this.facebook();
		console.log("navigating to fb login")
	};


//is FB user in DB
	// findUser(fbData){
	// 	this.authService.findFB(fbData).subscribe(result => {
	// 		if(result.success){
	// 			console.log("checking to see if your fb account is registered with our app...");

	// 			this.router.navigate(['dashboard']);
	// 		} else {
	// 			console.log("we could not find an account in our database associated with your facebook information...");
	// 			console.log("creating new account with your current facebook credentials...");

	// 			this.router.navigate(['dashboard']);
	// 		}
	// 	});
	// };

};