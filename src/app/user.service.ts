import { Injectable } from '@angular/core';
import swal from 'sweetalert'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'; 
import { Socket } from 'ng-socket-io';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api =  (endpoint: String = '') => `http://localhost:4000/${endpoint}`;  

  constructor(private socket: Socket) { }


  login({email = '', password = '', asA}){    
    return new Promise((resolve, reject) => {
      fetch(this.api(`${asA}/login`), {
        method : 'POST',
        body : JSON.stringify({email, password}),
        headers : {
          'content-type' : 'application/json'
        }
      }).then(res => res.json())
      .then(data => {
        if(data){
          let setData = {asA, ...data};
          sessionStorage.setItem('session', JSON.stringify(setData))
          this.socket.emit('join', setData, () => {
            
          })
          return resolve(setData)
        }else{
          swal({
            icon : 'error',
            text : 'Wrong email or password'
          })
          return reject(data)
        }
      }, err => {
        swal({
          icon : 'error',
          text : err.toString()
        })
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
        this.socket.emit('join', {asA : data.get('asA'), ...response})
        return Promise.resolve({asA : data.get('asA'), ...response})
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
    let endpoint = this.session().asA.toLowerCase() == 'vendor' ? `vendor/${this.session()._id}/customers` : 'vendor';
    return fetch(this.api(endpoint)).then(res => res.json())
  }

  init(){
    let data = this.session()
    if(data){
      this.socket.emit('join', data)
    }
  }

  prep(user){
    return Object.assign(user, {picture : user.picture ? this.api(`uploads/${user.picture}`) : 'data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='})
  }
}
