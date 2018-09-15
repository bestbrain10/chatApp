import { Component, Input } from '@angular/core';
import { UserService} from './user.service'
import {NgForm, FormsModule} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-register',
  template: `
    <form class="card" (submit)="register(f)" #f>
      <div class="card-image">
        <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" style="width: 100%; height: 300px" #image>
        <label class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">edit</i>
        <input type="file" name="picture" style="display: none" (change)="preview(input, image)" #input/>
        </label>
      </div>
      <div class="card-content">
        <div class="row">
            <div class="input-field col s12">
            <input id="name" name="fullname" class="validate" ngModel required>
            <label for="name">Fullname</label>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12">
            <input id="email" type="email" name="email" ngModel class="validate" required>
            <label for="email">Email</label>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12">
            <input id="password" type="password" name="password" ngModel class="validate" required>
            <label for="password">Password</label>
            </div>
        </div>
        <div class="row">
            <div class="col s12">
              <div class="row">
                <div class="input-field col s6">
                  <label>
                    <input name="asA" value="vendor" ngModel type="radio" checked />
                    <span>Vendor</span>
                  </label>
                </div>
                <div class="input-field col s6">
                  <label>
                    <input value="customer" name="asA" type="radio" ngModel />
                    <span>Customer</span>
                  </label>
                </div>  
            </div>
          </div>
        </div>
        <div class="center-align">
            <button class="red btn wave-red">register</button>
            <a routerLink="/login" class="indigo btn wave-indigo">login</a>
        </div>
      </div>
    </form>
  `,
})
export class RegisterComponent {
  

  constructor(private userService: UserService, private route: ActivatedRoute,
    private router: Router) { }

  register(f){
    f.querySelector('button').disabled = true;
    this.userService.register(new FormData(f))
    .then(user => {
      this.router.navigate(['/users']);
    }, console.log)
    .catch(console.log)
    .then(() => {
      f.querySelector('button').disabled = false;
    })
  }

  preview(input, image){
    if (input.files && input.files[0] && input.files[0].type.includes('image')) {
      const reader = new FileReader();
      reader.onload = function(e) {
        image.src  = e.target.result;
      }
      reader.readAsDataURL(input.files[0]);
    }else{
      image.src = "data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";
      input.value = ''
    }
  }
  
}
