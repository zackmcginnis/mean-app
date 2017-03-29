import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Guest, Vacation} from '../../helpers/classes';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, OnChanges {

	@Input() 
	vacation: Vacation;
  	vacationForm: FormGroup;
  	guests: Array<Guest> = [];

  	constructor(private authService: AuthService) 
  	{}

    ngOnInit() {
  	}

    ngOnChanges(changes: SimpleChanges) {
        // only run when property "data" changed
        if (changes['vacation']) {
            this.guests = this.updateVacation(this.vacation);
        }
    }

    updateVacation(vacation: Vacation) {

        if (!vacation) return;

        const updatedGuests = vacation.guests;

        return updatedGuests;
    }

    download(){

    }

    sendAll(){
    	
    }
}
