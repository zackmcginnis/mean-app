/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VacationUpdateService } from './vacation-update.service';

describe('VacationUpdateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VacationUpdateService]
    });
  });

  it('should ...', inject([VacationUpdateService], (service: VacationUpdateService) => {
    expect(service).toBeTruthy();
  }));
});
