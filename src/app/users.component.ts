import { Component } from '@angular/core';
import { UserService} from './user.service'
import { MessageService } from './message.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-users',
  template: `
    <ul class="collection" *ngIf="users.length; else elseBlock">
      <li class="collection-item avatar" *ngFor="let user of users">
        <img [src]="user.picture" [alt]="user.fullname" class="circle">
        <span class="title">{{user.fullname || 'Visitor'}}</span>
        <div *ngIf="user.id">
          <br>
          <span>{{user.id}}</span>
        </div>
        <a style="cursor: pointer" class="secondary-content" (click)="startChat(user)"><i class="material-icons">send</i></a>
      </li>
    </ul>

    <ng-template #elseBlock>
      <div class="center-align">
          <h1>No Recent Chats</h1>
      </div>
    </ng-template>
  `,
})
export class UsersComponent  {//implements OnInit{
  users = [];

  constructor(private userService: UserService, private messageService: MessageService, private route: ActivatedRoute, private router: Router) {
    this.userService.fetch()
    .then(users => {
      this.users = users.map(user => this.userService.prep(user))
    })
   }

  

  startChat(user){
    let recipient = this.messageService.checkReciever(user)
    this.router.navigate(['/messages', recipient, user._id]);
  }

}
