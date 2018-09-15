import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  api =  (endpoint: String = '') => `localhost:4000/${endpoint}`;  

  constructor() { }

  login({email = '', password = '', asA}){
    return fetch(this.api(`${asA}/login`), {
      method : 'POST',
      body : JSON.stringify({email, password}),
      headers : {
        'content-type' : 'application/json'
      }
    })
  }

  session(){

  }

  register(){

  }

  fetch(){

  }
}
