import { Component, OnInit } from '@angular/core';
import {RouterModule, Routes, Router, ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-facebooklogin',
  templateUrl: './facebooklogin.component.html',
  styleUrls: ['./facebooklogin.component.css']
})

export class FacebookloginComponent implements OnInit {
    token: string;

    constructor(private authService: AuthService, private route:ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.check();

    }

    check(){
        this.token = this.route.snapshot.params['token']
        this.authService.facebook(this.token);
        this.router.navigate(['dashboard']); 
    }

}