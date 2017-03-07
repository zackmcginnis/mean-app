/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VacationListComponent } from './vacation-list.component';

describe('VacationListComponent', () => {
  let component: VacationListComponent;
  let fixture: ComponentFixture<VacationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
