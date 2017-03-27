import { Component, OnInit } from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import {Router} from '@angular/router';
import 'rxjs/add/operator/finally';
import {AuthService} from '../../services/auth.service';
import {Guest, Vacation} from '../../helpers/classes';
import {VacationPipe} from '../../helpers/pipes';

@Component({
  selector: 'app-vacation-list',
  providers: [AuthService],
  templateUrl: './vacation-list.component.html',
  styleUrls: ['./vacation-list.component.css']
})
export class VacationListComponent implements OnInit {

  vacations: Array<Vacation> = []; //try Vacation[]
  isLoading = false;
  selectedVacation: Vacation;
  newvacation = new Vacation;

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
    this.authService.getVacations()
      .subscribe(
        vacations => {
          this.vacations = vacations;
      })
    this.isLoading = false
    this.selectedVacation = undefined;
  }

  select(vacation: Vacation) { 
  	this.selectedVacation = vacation; 
  }

  createVacation(){
    this.selectedVacation = this.newvacation;
    this.selectedVacation.name = "New Vacation";
  }
}
/*
{
  "name": "testvacation",
  "price": 24423,
  "guests": [{
    "name": "jeff",
    "days": 2,
    "amount": 0
    },
    {
    "name": "joe",
    "days": 3,
    "amount": 0
    }, 
    {
    "name": "jan",
    "days": 4,
    "amount": 0
    }]
}
*/