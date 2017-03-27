import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Guest, Vacation} from '../../helpers/classes';

@Component({
  selector: 'app-vacation',
  providers: [AuthService],
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.css']
})
export class VacationComponent implements OnChanges {

  @Input() vacation: Vacation;
  vacationForm: FormGroup;
  savedGuests: Array<Guest> = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService) {
    this.createForm();
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
      totalDays: this.vacation.totalDays,
    });
    this.setGuests(this.vacation.guests);
  }

  // getGuestsFromServer() {
  //   this.authService.getGuests()
  //     .subscribe(
  //       savedGuests => {
  //         this.savedGuests = savedGuests
  //         console.log(this.savedGuests)
  //     }) 
  // }

  get guests(): FormArray {
    return this.vacationForm.get('guests') as FormArray;
  };

  setGuests(guests: Guest[]) {
    if (guests == undefined){
      const guestFGs = null;
      const guestFormArray = null;
      //this.vacationForm.setControl('guests', guestFormArray);
    } else {
      const guestFGs = guests.map(guest => this.fb.group(guest));
      const guestFormArray = this.fb.array(guestFGs);
      this.vacationForm.setControl('guests', guestFormArray);
    }
  }

  addGuest() {
    this.guests.push(this.fb.group(new Guest()));
  }

  //submitting changes/edits to old vacation
  onSubmit() {
    this.vacation = this.prepareSaveVacation();
    //calculate total days by all guests in vacation
    //assign to this.vacation
    var days: number = 0;
    for (var i=0; i<this.vacation.guests.length; i++){
      days += this.vacation.guests[i].guestDays;
    }
    this.vacation.totalDays = days;
    if (this.vacation.newFlag) {
      this.authService.addVacation(this.vacation);
      console.log("creating new vacation")
    } else {
      this.authService.updateVacation(this.vacation);
      console.log("updating existing vacation")
    }
    this.ngOnChanges();
  }


  prepareSaveVacation(): Vacation {
    const formModel = this.vacationForm.value;
    // deep copy of form model guests
    const guestsDeepCopy: Guest[] = formModel.guests.map(
      (guest: Guest) => Object.assign({}, guest)
    );

    // return new `Vacation` object containing a combination of original vacation value(s)
    // and deep copies of changed form model values
    const saveVacation: Vacation = {
      name: formModel.name as string,
      price: formModel.price as number,
      totalDays: this.vacation.totalDays as number,
      // addresses: formModel.secretLairs // <-- bad!
      guests: guestsDeepCopy,
      newFlag: this.vacation.newFlag
    };
    return saveVacation;
  }

  deleteGuest(){

  }

  revert() { 
  	this.ngOnChanges(); 
  }
}