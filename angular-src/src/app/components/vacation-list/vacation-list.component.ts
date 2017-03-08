import { Component, OnInit } from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import {Router} from '@angular/router';
import 'rxjs/add/operator/finally';
import {AuthService} from '../../services/auth.service';
import {Guest, Vacation} from '../../helpers/classes';

@Component({
  selector: 'app-vacation-list',
  templateUrl: './vacation-list.component.html',
  styleUrls: ['./vacation-list.component.css']
})
export class VacationListComponent implements OnInit {

  vacations: Observable<Vacation[]>;
  isLoading = false;
  selectedVacation: Vacation;

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    /*
    this.authService.getVacations().subscribe(profile => {
      this.user = profile.user;
    },
    err => {
      console.log(err);
      return false;
    });
    */
    this.getVacations();
  }

  getVacations() {
    this.isLoading = true;
    this.vacations = this.authService.getVacations()
                      // Todo: error handling
                      .finally(() => this.isLoading = false);
    this.selectedVacation = undefined;
  }

  select(vacation: Vacation) { 
  	this.selectedVacation = vacation; 
  }
}