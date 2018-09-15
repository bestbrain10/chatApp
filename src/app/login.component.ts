import { Component, Input } from '@angular/core';
import { UserService} from './user.service'
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  template: `
  <div class="row">
  <div class="col s12 m6 offset-m3">
    <form class="card" (ngSubmit) = "login(f)" #f="ngForm">
      <div class="card-content">
        <div class="row">
            <div class="input-field col s12">
            <input id="email" type="email" ngModel name="email" class="validate" required>
            <label for="email">Email</label>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12">
            <input id="password" type="password" ngModel name="password" class="validate" required>
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
            <button class="red btn wave-red">login</button>
            <a class="indigo btn wave-indigo">register</a>
            <a class="teal btn wave-teal" (click)="visitorLogin()">visit</a>
        </div>
      </div>
    </form>
  </div>
</div>
  `,
})
export class LoginComponent {

  constructor(private userService: UserService) { }

  login(f: NgForm){

    this.userService.login(f.value)
    .then(res => res.json())
    .then(console.log, console.log)
    .catch(console.log)

  }

  visitorLogin(){
    this.userService.login({asA : 'visitor'})
    .then(res => res.json())
    .then(console.log, console.log)
    .catch(console.log)

  }
}
