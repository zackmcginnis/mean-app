import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { Vacation, Guests } from '../models/data-model';
import { VacationService }           from './vacation.service';

@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.css']
})
export class VacationComponent implements OnChanges {

  @Input() vacation: Vacation;
  vacationForm: FormGroup;
  nameChangeLog: string[] = [];

  constructor(
    private fb: FormBuilder,
    private vacationService: VacationService) {
    this.createForm();
    this.logNameChange();
  }

  createForm() {
    this.vacationForm = this.fb.group({
      name: '',
      price: 0,
      guests: this.fb.array([])
    });
  }

  ngOnChanges() {
    this.vacationForm.reset({
      name: this.vacation.name,
      price: this.vacation.price,
      totalDays: this.vacation.totalDays
    });
    this.setGuests(this.vacation.guests);
  }

  get guests(): FormArray {
    return this.vacationForm.get('guests') as FormArray;
  };

  setGuests(guests: Guests[]) {
    const guestFGs = guests.map(guest => this.fb.group(guest));
    const guestFormArray = this.fb.array(guestFGs);
    this.vacationForm.setControl('guests', guestFormArray);
  }

  addGuest() {
    this.guests.push(this.fb.group(new Guests()));
  }

  onSubmit() {
    this.vacation = this.prepareSaveVacation();
    //calculate total days by all guests in vacation
    //assign to this.vacation
    var days: number = 0;
    for (var i=0; i<this.vacation.guests.length; i++){
      days += this.vacation.guests[i].guestDays;
    }
    this.vacation.totalDays = days;

    this.vacationService.updateVacation(this.vacation).subscribe(/* error handling */);
    this.ngOnChanges();
  }

  prepareSaveVacation(): Vacation {
    const formModel = this.vacationForm.value;
    // deep copy of form model guests
    const guestsDeepCopy: Guests[] = formModel.guests.map(
      (guest: Guests) => Object.assign({}, guest)
    );

    // return new `Vacation` object containing a combination of original vacation value(s)
    // and deep copies of changed form model values
    const saveVacation: Vacation = {
      id: this.vacation.id,
      name: formModel.name as string,
      price: formModel.price as number,
      totalDays: this.vacation.totalDays as number,
      // addresses: formModel.secretLairs // <-- bad!
      guests: guestsDeepCopy
    };
    return saveVacation;
  }

  revert() { 
  	this.ngOnChanges(); 
  }
  
  logNameChange() {
    const nameControl = this.vacationForm.get('name');
    nameControl.valueChanges.forEach(
      (value: string) => this.nameChangeLog.push(value)
    );
  }
}