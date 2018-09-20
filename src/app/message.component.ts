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
            <textarea id="message" name="info" ngModel ngModel class="materialize-textarea" required></textarea>
            <label for="message">Enter Message to {{reciever.fullname || 'visitor'}}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col s3">
        <a routerLink="/users">back</a>
      </div>
      <div class="col s3">
        <a (click)=closeSession()>close</a>
      </div>
      <div class="col s3">
        <button class="btn right">send</button>
      </div>
    </div>
    </form>
  </li>
  <li class="collection-item" *ngFor="let message of messages"><div>
    <b>{{message.sender_id.fullname || 'visitor'}}</b>
    <p>{{message.info}}</p>
    <small>{{message.timestamp | timeAgo}}</small>
  </div></li>
  </ul>
  `,
})
export class MessageComponent {//implements OnInit, OnDestroy{
  messages = [];
  session: String;
  recipient : String;
  recipient_id : String;
  reciever: Object = {fullname : 'Vendor'};

  constructor(
    private messageService: MessageService, 
    private userService: UserService, 
    private route: ActivatedRoute,
    private router: Router) { 
      let [id, asA] = new URL(location.href).pathname.split('/').reverse()
      this.messageService.init(asA, id)
      .then(({session, receiver: recipient}) => {
        this.recipient = asA;
        this.recipient_id = id;
        this.reciever = recipient;
        this.session = session.id;
        return this.messageService.fetch(session.id)
      })
      .then(([{messages}]) => {
        this.messages = (messages || []).reverse()
        this.listenForMessages()
      })
    }

  
    listenForMessages(){
      this.messageService
      .getMessage()
      .on('messages', function(messages) {
        console.log({messages})
      }.bind(this))
    }


  send(f : NgForm){
    //lookup user,
    let message = Object.assign(f.value, {recipient_id : this.recipient_id, session : this.session, recipient : this.recipient});
    let session = this.userService.session()
    this.messageService.create(message)
    this.messages =[Object.assign(message,{
      sender : session.asA,
      sender_id : session,
      timestamp : Date.now()
    }), ...this.messages];  
    f.reset();
  }

  closeSession(){
    this.messageService.destroy(this.recipient_id);
    this.router.navigate(['/users']);
  }
}
