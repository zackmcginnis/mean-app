import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import {Guest, Vacation} from '../helpers/classes';

@Injectable()
export class VacationUpdateService {
  // Observable string sources
  private vacationUpdatedSource = new Subject<Vacation>();
  // Observable string streams
  vacationUpdated$ = this.vacationUpdatedSource.asObservable();

  // Service message commands
  updateVacation(vacation: Vacation) {
  	console.log("from update service", vacation)
    this.vacationUpdatedSource.next(vacation);
  }

}
