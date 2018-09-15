import { Injectable } from '@angular/core';
import swal from 'sweetalert'
import { Socket } from 'ng-socket-io';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api =  (endpoint: String = '') => `http://localhost:4000/${endpoint}`;  

  constructor() { }


  login({email = '', password = '', asA}){
    
    return fetch(this.api(`${asA}/login`), {
      method : 'POST',
      body : JSON.stringify({email, password}),
      headers : {
        'content-type' : 'application/json'
      }
    }).then(res => res.json())
    .then(data => {
      if(data){
        sessionStorage.setItem('session', JSON.stringify({asA, ...data}))
        return Promise.resolve(data)
      }else{
        swal({
          icon : 'error',
          text : 'Wrong email or password'
        })
        return Promise.reject(data)
      }
    }, err => {
      swal({
        icon : 'error',
        text : err.toString()
      })
    })
  }

  session(){
    return JSON.parse(sessionStorage.getItem('session'))
  }

  register(data){
    return fetch(this.api(`${data.get('asA')}`), {
      method : 'POST',
      body : data
    }).then(res => res.json())
    .then(response => {
      if(response){
        sessionStorage.setItem('session', JSON.stringify({asA : data.get('asA'), ...response}))
        return Promise.resolve(response)
      }else{
        swal({
          icon : 'error',
          text : 'Please use correct details'
        })
        return Promise.reject(response)
      }
    }, err => {
      swal({
        icon : 'error',
        text : err.toString()
      })
    })
  }

  fetch(){
    return fetch(this.api('vendor')).then(res => res.json())
  }

  prep(user){
    return Object.assign(user, {picture : user.picture ? this.api(`uploads/${user.picture}`) : 'data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='})
  }
}
