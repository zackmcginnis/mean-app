import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of }         from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';

import { Vacation, vacations } from '../models/vacation-model';

@Injectable()
export class VacationService {

  constructor() { }
  
  delayMs = 500;
  // Fake server get; assume nothing can go wrong
  getVacations(): Observable<Vacation[]> {
    return of(vacations).delay(this.delayMs); // simulate latency with delay
  }
  // Fake server update; assume nothing can go wrong
  updateVacation(vacation: Vacation): Observable<Vacation>  {
    const oldVacation = vacations.find(h => h.id === vacation.id);
    const newVacation = Object.assign(oldVacation, vacation); // Demo: mutate cached hero
    return of(newVacation).delay(this.delayMs); // simulate latency with delay
  }
}
