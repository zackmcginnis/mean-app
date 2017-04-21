import { Component, ViewContainerRef, ViewEncapsulation, ChangeDetectorRef, OnInit, Input, OnChanges, ApplicationRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {VacationUpdateService} from '../../services/vacation-update.service';
import {ResultComponent} from '../result/result.component';
import {VacationListComponent} from '../vacation-list/vacation-list.component';
import {Router} from '@angular/router';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import {Guest, Vacation} from '../../helpers/classes';

@Component({
  selector: 'app-vacation',
  providers: [AuthService, VacationUpdateService],
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.css']
})
export class VacationComponent implements OnChanges {

  @Input() vacation: Vacation;
  vacationForm: FormGroup;
  savedGuests: Array<Guest> = [];
  result: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private updateService: VacationUpdateService,
    private cdr:ChangeDetectorRef,
    public ApplicationRef: ApplicationRef,
    public vlist: VacationListComponent,
    vcRef: ViewContainerRef, 
    public modal: Modal,
    private router: Router) {
    this.createForm();
    modal.overlay.defaultViewContainer = vcRef;

  }

  modalConfirmDeleteGuest(index) {
    this.modal.confirm()
            .isBlocking(true)
            //.okBtnClass("hidden")
            .showClose(true)      
            //.addButton('btn btn-default', 'Discard')
            //.addButton('btn btn-primary', 'Accept')               
            .size('sm')
            .title('Confirm deletion of guest')
            .body(`
                <h4>Are you sure you want to delete this guest?</h4>`)
            .open()
            .then((resultPromise) => {
                resultPromise.result.then((result) => {
                this.result = result;
                if(this.result == true){
                    this.deleteGuest(index);
                    this.onSubmit();
                }
            }, () => this.result = 'Rejected!');
            });             
  };

  modalConfirmDeleteVacation() {
    this.modal.confirm()
            .isBlocking(true)
            //.okBtnClass("hidden")
            .showClose(true)      
            //.addButton('btn btn-default', 'Discard')
            //.addButton('btn btn-primary', 'Accept')               
            .size('sm')
            .title('Confirm deletion of vacation')
            .body(`
                <h4>Are you sure you want to delete this vacation?</h4>`)
            .open()
            .then((resultPromise) => {
                resultPromise.result.then((result) => {
                this.result = result;
                if(this.result == true){
                  this.delete();
                }
            }, () => this.result = 'Rejected!');
            });             
  };  

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
   //this.cdr.detectChanges();
    this.setGuests(this.vacation.guests);

   // this.vacation = changes.vacation.currentValue;

  }

  get guests(): FormArray {
    return this.vacationForm.get('guests') as FormArray;
  };

  setGuests(guests: Guest[]) {
    if (guests == undefined){
      console.log("guests undefined...");
      const guestFGs = [];
      const guestFormArray = this.fb.array(guestFGs);;
      this.vacationForm.setControl('guests', guestFormArray);
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
    this.vacation.guests = this.calculateTotal(this.vacation, this.vacation.guests);

    if (this.vacation.newFlag) {
      //this.vacation.guests = this.calculateTotal(this.vacation, this.vacation.guests);
      this.authService.addVacation(this.vacation);
    } else {
      this.authService.updateVacation(this.vacation);
    }
    //this.ApplicationRef.tick(); 
    //this.refreshVacation(this.vacation);
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
      guests: guestsDeepCopy,
      newFlag: this.vacation.newFlag
    };
    saveVacation._id = this.vacation._id;
    return saveVacation;
  }

  deleteGuest(index){
    this.guests.removeAt(index);
  }

  revert() { 
  	this.ngOnChanges(); 
  }

  delete() {
    this.authService.deleteVacation(this.vacation);
    console.log("deleting existing vacation")
  }

  calculateTotal(vacation: Vacation, guests: Guest[]){
    let allGuests = vacation.guests;
    let price = vacation.price;
    let vacationDays = vacation.totalDays;
    let costPerDay: number;
    let guestTotal: number;

    costPerDay = price / vacationDays;

    for (let gg of allGuests){
      if (vacationDays == 0) return guests;

      gg.amountOwed = gg.guestDays * costPerDay;
    }
    return guests;
  }
}