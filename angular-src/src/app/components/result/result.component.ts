import { Component, OnInit, OnChanges, ChangeDetectorRef, Input, SimpleChange, NgZone } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {PdfService} from '../../services/pdf.service';
import {VacationUpdateService} from '../../services/vacation-update.service';
import {Guest, Vacation} from '../../helpers/classes';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'app-result',
  providers: [AuthService, VacationUpdateService, PdfService,],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnChanges, OnInit {

	@Input() vacation: Vacation;
	@Input() guests: Guest[];
  	vacationForm: FormGroup;
  	subscription: Subscription;

  	constructor(private pdfService: PdfService, private authService: AuthService, private updateService: VacationUpdateService) 
  	{}
  
  	ngOnInit(){

  	}

    ngOnChanges(changes) {
    	console.log(changes)
    	this.vacation = changes.vacation.currentValue;
    }

    //download pdf of result onto local machine
    	//must first generate pdf of result data
    downloadPdf(){

    }

    //generate pdf of result data
      //collect email addresses for each guest, place in array
    	//connect service to send email (mailchimp?)
    		//create template for email (hello, your friend xxxxxx has sent you a price breakdown for your upcoming vacation)
    sendPdf(){

    }
}
