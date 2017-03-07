import { Component, OnInit } from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import 'rxjs/add/operator/finally';
import { Vacation }        from '../models/vacation-model';
import { VacationService } from '../vacation/vacation.service';

@Component({
  selector: 'app-vacation-list',
  templateUrl: './vacation-list.component.html',
  styleUrls: ['./vacation-list.component.css']
})
export class VacationListComponent implements OnInit {

  vacations: Observable<Vacation[]>;
  isLoading = false;
  selectedVacation: Vacation;

  constructor(private vacationService: VacationService) { }

  ngOnInit() { 
  	this.getVacations(); 
  }

  getVacations() {
    this.isLoading = true;
    this.vacations = this.vacationService.getVacations()
                      // Todo: error handling
                      .finally(() => this.isLoading = false);
    this.selectedVacation = undefined;
  }

  select(vacation: Vacation) { 
  	this.selectedVacation = vacation; 
  }
}