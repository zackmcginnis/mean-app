/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VacationComponent } from './vacation.component';

describe('VacationComponent', () => {
  let component: VacationComponent;
  let fixture: ComponentFixture<VacationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
