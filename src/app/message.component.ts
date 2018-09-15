import { Component, Input, OnInit } from '@angular/core';
import {Message} from './message.model'
import {MessageService} from './message.service';
import { UserService} from './user.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {SocketService} from './socket.service'

@Component({
  selector: 'app-message',
  template: `
  <ul class="collection with-header">
  <li class="collection-header">
  
  </li>
  <li class="collection-item"><div>
    <h4>Livinus Igbaji</h4>
    <p>Lorem Ipsum Dolor sit Amet</p>
    <small>1 sec ago</small>
  </div></li>
  </ul>
  `,
})
export class MessageComponent implements OnInit{
  messages = [];

  constructor(
    private messageService: MessageService, 
    private userService: UserService, 
    private route: ActivatedRoute,
    private socket: SocketService,
    private router: Router) { }



  ngOnInit() {
    
  }
}
