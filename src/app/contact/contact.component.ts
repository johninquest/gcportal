import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SlackService } from '../services/slack.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  cNames = new FormControl(''); 
  cSender = new FormControl('', [Validators.email]); 
  cSubject = new FormControl('');
  cMessage = new FormControl('');

  constructor(private slackservice: SlackService) { }

  resetInputs() {
    this.cNames.reset();
    this.cSender.reset();
    this.cSubject.reset();
    this.cMessage.reset();
  }

  sendToSlack() {
    const payloadData: string = JSON.stringify({
      'attachments':[
        {
           'fallback':`Subject: ${this.cSubject.value}`,
           'pretext':`Subject: ${this.cSubject.value}`,
           /* "color":"#D00000", */
           'fields':[
            {
              'title':'Sender',
              'value':this.cNames.value,
              'short':false
           },
              {
                'title':'E-mail',
                'value':this.cSender.value,
                'short':false
             },
             {
                 'title':'Message',
                 'value':this.cMessage.value,
                 'short':false
              }
           ]
        }
     ] });
    this.slackservice.sendData(payloadData)
      .subscribe( 
        res => { res }, 
        err => { if(err === 200) { this.resetInputs(); } } 
          );
    }

  ngOnInit() { }

}
