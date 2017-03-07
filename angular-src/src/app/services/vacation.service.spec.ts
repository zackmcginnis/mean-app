/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VacationService } from './vacation.service';

describe('VacationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VacationService]
    });
  });

  it('should ...', inject([VacationService], (service: VacationService) => {
    expect(service).toBeTruthy();
  }));
});
