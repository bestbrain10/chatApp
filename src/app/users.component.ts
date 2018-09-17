import { Component } from '@angular/core';
import { UserService} from './user.service'
import { MessageService } from './message.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-users',
  template: `
    <ul class="collection">
      <li class="collection-item avatar" *ngFor="let user of users">
        <img [src]="user.picture" [alt]="user.fullname" class="circle">
        <span class="title">{{user.fullname}}</span>
        <a style="cursor: pointer" class="secondary-content" (click)="startChat(user)"><i class="material-icons">send</i></a>
      </li>
    </ul>
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
      this.messageService.init(user)
      .then(({session, receiver}) => {
        this.router.navigate(['/messages', user.id || user._id]);
      })
      .catch(console.log)

    //create chat session, store in sessionStorage
    //check if chat session exist, else remove
  }

}
