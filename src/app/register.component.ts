import { Component, Input } from '@angular/core';
import { UserService} from './user.service'

@Component({
  selector: 'app-register',
  template: `
  <div class="row">
  <div class="col s12 m6">
    <form class="card">
      <div class="card-image">
        <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" style="width: 100%; height: 300px" >
        <label class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">edit</i>
        <input type="file" style="display: none" />
        </label>
      </div>
      <div class="card-content">
        <div class="row">
            <div class="input-field col s12">
            <input id="name" name="name" class="validate" required>
            <label for="name">Fullname</label>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12">
            <input id="email" type="email" name="email" class="validate" required>
            <label for="email">Email</label>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12">
            <input id="password" type="password" name="password" class="validate" required>
            <label for="password">Password</label>
            </div>
        </div>
        <div class="center-align">
            <button class="red btn wave-red">register</button>
        </div>
      </div>
    </form>
  </div>
</div>
  `,
})
export class RegisterComponent {
  

  constructor(private userService: UserService) { }

  register(){
    
  }

  
}
