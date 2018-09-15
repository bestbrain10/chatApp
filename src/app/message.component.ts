import { Component, Input, OnInit, OnDestroy } from '@angular/core';
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
            <textarea id="message" name="message" ngModel class="materialize-textarea"></textarea>
            <label for="message">Enter Message</label>
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
  <li class="collection-item"><div>
    <b>Livinus Igbaji</b>
    <p>Lorem Ipsum Dolor sit Amet</p>
    <small>1 sec ago</small>
  </div></li>
  </ul>
  `,
})
export class MessageComponent implements OnInit, OnDestroy{
  messages = [];

  constructor(
    private messageService: MessageService, 
    private userService: UserService, 
    private route: ActivatedRoute,
    private router: Router) { }

    sub;

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.messageService.fetch(params.session)
      .then(messages => {
        this.messages = messages;
      })
   }); 
  }

  ngOnDestroy() {
    this.sub = null;
  }

  send(f : NgForm){
    //lookup user,
    
  }
}
