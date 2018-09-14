import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-login',
  template: `
  <div class="row">
  <div class="col s12 m6">
    <form class="card">
      <div class="card-content">
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
            <button class="red btn wave-red">login</button>
            <button class="teal btn wave-teal">visit</button>
        </div>
      </div>
    </form>
  </div>
</div>
  `,
})
export class LoginComponent {


  constructor() { }

  
}
