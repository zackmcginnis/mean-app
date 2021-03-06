import { Component, OnInit, OnChanges, ChangeDetectorRef, ViewContainerRef, ViewEncapsulation, Input, SimpleChange, NgZone } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {PdfService} from '../../services/pdf.service';
import {VacationUpdateService} from '../../services/vacation-update.service';
import {Guest, Vacation, EmailObject} from '../../helpers/classes';
import { Subscription }   from 'rxjs/Subscription';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import * as jspdf from 'jspdf';

@Component({
  selector: 'app-result',
  providers: [AuthService, VacationUpdateService, PdfService],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnChanges, OnInit {

	@Input() vacation: Vacation;
	@Input() guests: Guest[];
  	vacationForm: FormGroup;
  	subscription: Subscription;
  	send: boolean = false;
  	user: Object;
    result: any;

  	constructor(vcRef: ViewContainerRef, public modal: Modal, private pdfService: PdfService, private authService: AuthService, private updateService: VacationUpdateService) 
  	{
        modal.overlay.defaultViewContainer = vcRef;
    }
  
    modalConfirm() {
        this.modal.confirm()
                .isBlocking(true)
                //.okBtnClass("hidden")
                .showClose(true)      
                //.addButton('btn btn-default', 'Discard')
                //.addButton('btn btn-primary', 'Accept')               
                .size('sm')
                .title('Confirm send email with PDF attachment to guests')
                .body(`
                    <h4>Are you sure you want to send the pricing breakdown for this vacation to all of your guests?</h4>`)
                .open()
                .then((resultPromise) => {
                    resultPromise.result.then((result) => {
                    this.result = result;
                    if(this.result == true){
                        this.sendAll();
                    }
                }, () => this.result = 'Rejected!');
                });             
    };



    // this.modal.alert()
    //     .size('lg')
    //     .title('Confirm send email with PDF attachment to guests')
    //     .body(`
    //         <h4>Are you sure you want to send the pricing breakdown for this vacation to all of your guests?</h4>
    //         <b>Deliver to:</b>
    //         <ul>
    //             <div *ngFor="let guest of guests"> 
    //                 <div>              
    //                 <li>{{guest.guestEmail}}</li>
    //                 </div>             
    //             </div>
    //         </ul>`)
    //     .okBtnClass("hidden")
    //     .showClose(false)
    //     .addButton('btn btn-default', 'Cancel', this.closeModalCancel)
    //     .addButton('btn btn-primary', 'Ok', this.closeModalOk)
    //     .open();
    // }


  	ngOnInit(){
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
    err => {
      console.log(err);
      return false;
    });
  	}

    ngOnChanges(changes) {
    	console.log(changes)
    	this.vacation = changes.vacation.currentValue;
    }

    //download pdf of result onto local machine
    	//must first generate pdf of result data
    downloadPdf(){

    let doc = new jspdf();
    doc.text(10, 10, 'PRICE BREAKDOWN OF YOUR VACATION');
    doc.text(10, 20, '---------------------------------------------------');
    var height: number = 20;
    var count: number = 0;
    var page: number = 1;
    	for(let g of this.guests){
    		let name = "Name: " +g.guestName;
    		let price = "Vacation Price: $" +(Math.round(100*this.vacation.price)/100).toString();
 			let totaldays = "Total Days Booked By All (cumulative): "+this.vacation.totalDays.toString();
 			let perday = "Price Per Vacation Day: $" +(Math.round(100*(this.vacation.price / this.vacation.totalDays))/100).toString();
 			let gdays = "Days Booked By This Guest: " +g.guestDays.toString();
 			let amount = "Amount Owed By This Guest: $" +(Math.round(100*(g.amountOwed))/100).toString();

 				if (count != 0 && count % 3 == 0){
 					doc.addPage();
 					page++;
 					height = 20;
 					var pagestring = 'PRICE BREAKDOWN OF YOUR VACATION - Page '+page.toString();
 					doc.text(10, 10, pagestring);
    				doc.text(10, 20, '---------------------------------------------------');
 				} 

    			height += 10;

    		    doc.text(20, height, name);
    		    height += 10;
    			doc.text(20, height, price);
    		    height += 10;
    			doc.text(20, height, totaldays);
    		    height += 10;
    			doc.text(20, height, perday);
    		    height += 10;
    			doc.text(20, height, gdays);
    			height += 10;
    			doc.text(20, height, amount);
    			height += 10;
    			doc.text(20, height, '---------------------------------------------------');

    			count++;
    	}

    	if(this.send == true) {
    		return doc;
    	} else {
    	doc.save('vacation-price-breakdown.pdf');
    }

    }



    //generate pdf of result data
      //collect email addresses for each guest, place in array
    	//connect service to send email (mailchimp?)
    		//create template for email (hello, your friend xxxxxx has sent you a price breakdown for your upcoming vacation)
    sendAll(){
    	this.send = true;
    	let guestEmails = [];

    	//generate pdf
    	let file = this.downloadPdf();
    	console.log(this.user);

    	//gather emails of guests
    		for(let g of this.guests){
    			guestEmails.push(g.guestEmail);
    		}

    		let emailObject = new EmailObject;
    		emailObject.pdfDoc = file.output('datauristring');;
    		emailObject.emailList = guestEmails;

    		this.authService.sendPdf(emailObject);
    		console.log(emailObject);
    	//
    	this.send = false;
    }


}
