import { Component, Input } from '@angular/core';
import {Message} from './message.model'
import {MessageService} from './message.service';

@Component({
  selector: 'app-message',
  template: `
  <div class="row">
  <div class="col s12 m6 offset-m3">
    <div class="card">
      <div class="card-content">
        <span class="card-title">{{message.user}}</span>
        <p>{{message.message}}</p>
      </div>
    </div>
  </div>
</div>
  `,
})
export class MessageComponent {
  @Input() message: Message;

  constructor(private service: MessageService) { }

  delete(){
    this.service.delete(this.message)
  }

  update(){
    this.service.update(1, this.message)
  }
}
