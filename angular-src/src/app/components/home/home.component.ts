import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {WindowRef} from '../../helpers/WindowRef';

//declare const FB: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

// token: any;
// logged: boolean = false;
// fbInfo: any;
errorMsg: any;

constructor(private router:Router, private authService: AuthService, private window:WindowRef) { 

}

ngOnInit() {

    // FB.init({
    //     appId      : '1269113989876166',
    //     cookie     : true,  // enable cookies to allow the server to access
    //                         // the session
    //     xfbml      : true,  // parse social plugins on this page
    //     version    : 'v2.8' // use graph api version 2.5
    // });

    // FB.getLoginStatus(response => {
    //     this.statusChangeCallback(response);
    // }); 

};

	facebook(){
		console.log(this.window.nativeWindow.location.host);
		console.log(this.window.nativeWindow.location.protocol);
		this.window.nativeWindow.location = this.window.nativeWindow.location.protocol + '//' + 'localhost:3000' + '/auth/facebook';
		//this.window.nativeWindow.location = '/auth/facebook'; //for deploy
	};



// custom(data: any){
// 	console.log(data);
// };



// me() {
//     FB.api('/me?fields=id,name,first_name,email,gender,picture.width(150).height(150),age_range,friends',
//         (result => {
//             if (result && !result.error) {           
//                 console.log(result);
//                 this.findUser(result);

//             } else {
//             	console.log("unable to find facebook user")
//                 console.log(result.error);
//             }
//         }));
// };
/*
me() {
    FB.api('/me?fields=id,name,first_name,email,gender,picture.width(150).height(150),age_range,friends',
        function(result) {
            if (result && !result.error) {           
                //console.log(result);
                this.custom(result);

            } else {
            	console.log("unable to find facebook user")
                console.log(result.error);
            }
        });
};
*/
// statusChangeCallback(response: any) {
//     if (response.status === 'connected') {
//         console.log('connected');
//         //console.log('connected', response.authResponse); //token, userid
//         this.logged = true;
//         this.me();
//         //user is logged in to facebook.  check to see if info is in our database

//         //this.router.navigate(['dashboard']);
//     } else {
//     	this.logged = false;
//         //this.router.navigate(['']);
//     }
// };


// login() {
//   FB.login((result: any) => {
//     this.logged = true;
//     //this.token = result.authResponse.accessToken;
//     console.log(result);// token, userid
//     this.me();
//     //this.me();

//     //user is logged
//   }, { scope: 'public_profile, user_friends, email' });
// };



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


/*
	this.authService.authenticateUser(user).subscribe(data => {
	  if(data.success){
	    this.authService.storeUserData(data.token, data.user);
	    this.flashMessage.show('You are now logged in', {
	      cssClass: 'alert-success',
	      timeout: 5000});
	    this.router.navigate(['dashboard']);
	  } else {
	    this.flashMessage.show(data.msg, {
	      cssClass: 'alert-danger',
	      timeout: 5000});
	    this.router.navigate(['login']);
	  }
	});
*/
};