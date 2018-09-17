import { Component } from '@angular/core';
import {MessageService} from './message.service';
import { UserService} from './user.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
  <ul class="collection with-header">
  <li class="collection-header">
  <form #f="ngForm" (ngSubmit)="send(f)">
      <div class="row">
      <div class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <textarea id="message" name="info" ngModel ngModel class="materialize-textarea"></textarea>
            <input type="hidden" [value]="recipient" ngModel name="recipient" />
            <input type="hidden" [value]="recipient_id" ngModel name="recipient_id" />
            <input type="hidden" [value]="session" ngModel name="session" />
            <label for="message">Enter Message to {{reciever.fullname || 'visitor'}}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col s6">
        <a routerLink="/users">back</a>
      </div>
      <div class="col s6">
        <button class="btn right">send</button>
      </div>
    </div>
    </form>
  </li>
  <li class="collection-item" *ngFor="let message of messages"><div>
    <b>{{message.sender.fullname || 'visitor'}}</b>
    <p>{{message.info}}</p>
    <small>1 sec ago</small>
  </div></li>
  </ul>
  `,
})
export class MessageComponent {//implements OnInit, OnDestroy{
  messages = [];
  session: String;
  recipient : String;
  recipient_id : String;
  reciever: Object = {ulllname : 'Vendor'};

  constructor(
    private messageService: MessageService, 
    private userService: UserService, 
    private route: ActivatedRoute,
    private router: Router) { 
      this.messageService.init(this.recipient_id)
      .then(({session, receiver: recipient}) => {
        console.log({session, recipient})
        this.recipient_id = new URL(location.href).pathname.split('/')[2];
        this.recipient = recipient.asA;
        this.reciever = recipient;
        this.session = session.id;
        
        return this.messageService.fetch(session.id)
      })
      .then(messages => this.messages = messages)
    }

    // ngOnInit() {
    //   this.messageService
    //       .getMessage(this.session)
    //       .subscribe(msg => {
    //         this.messages = msg;
    //       });
    // }
  
    
  send(f : NgForm){
    //lookup user,
    this.messageService.create(f.value)  
  }
}
