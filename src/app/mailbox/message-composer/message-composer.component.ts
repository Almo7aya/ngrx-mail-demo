import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MailMessage } from '../../mail-message';

@Component({
  selector: 'message-composer',
  templateUrl: './message-composer.component.html',
  styleUrls: ['./message-composer.component.scss']
})
export class MessageComposerComponent implements OnInit {

  messageForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      recipient: ['', Validators.required],
      subject: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  cancel() {
    // const mailbox: string = this.route.snapshot.parent.url[0].path;
    // this.router.navigateByUrl(mailbox);
  }

  sendDisabled() {
    return this.messageForm.status !== 'VALID';
  }

  send() {
    const dateSent = new Date();
    const message = new MailMessage();
    message.sender = 'Me';
    message.recipient = this.messageForm.value.recipient;
    message.subject = this.messageForm.value.subject;
    // message.setDateSent(dateSent);
    //
    // this.mailService.sendMessage(message).subscribe((response) => {
    //   if (this.mailbox.name === 'outbox') {
    //     this.mailbox.messages.push(response);
    //     this.router.navigateByUrl(`outbox/view/${response.id}`);
    //   } else {
    //     this.router.navigateByUrl(`inbox`);
    //   }
    // });
  }
}
