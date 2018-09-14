import { Component } from '@angular/core';
import {Message} from './message.model';
import {MessageService} from './message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private service: MessageService) { }
  message: String;

  ngOnInit() { 
     this.service.fetch()
    .subscribe((data: Message[]) => this.messages = data);
   }
  messages: Message[] = [];

  send(e){
    if(e.key == 'Enter'){
      this.service.create(e.target.vaalue)
      e.target.innerHTML = ''
    }
  }
}
