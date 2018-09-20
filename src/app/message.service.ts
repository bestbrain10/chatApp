import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { filter, map } from 'rxjs/operators';
import { Socket } from 'ng-socket-io';
import { UserService } from './user.service'

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient, private socket: Socket, private userService: UserService) { }
  api =  (endpoint: String = '') => `http://localhost:4000/${endpoint}`;

  fetch(session){
    return fetch(this.api(`message/${session}`)).then(res => res.json())
  }

  getMessage(){
    this.socket.on('messages', function(messages) {
      console.log({messages})
    }.bind(this))
    return this.socket
  }

  create({info, recipient, recipient_id, session}){
    let {asA : sender, _id: sender_id } = this.userService.session()
    return this.socket.emit('message', {info, recipient, recipient_id, session, sender, sender_id})
  }

  
  
  init(asA, reciever){
    return new Promise((resolve, reject) => {
      let item = sessionStorage.getItem(reciever);
      if(item){
        return resolve(JSON.parse(item))
      }else{
        fetch(this.api('message'),{method : 'POST',
        body : JSON.stringify({asA, reciever}),
        headers : {'content-type' : 'application/json'}})
        .then(res => res.json())
        .then(([session, recipient]) => {
          let data = {session, receiver : {asA, ...recipient}};
          sessionStorage.setItem(reciever, JSON.stringify(data))
          return resolve(data);
        }, reject)
        .catch(reject)
      }
    })
  }

  checkReciever(user){
    if(this.userService.session().asA.toLowerCase() == 'vendor' ){
      return user.id ? 'Visitor' : 'Customer';
    }else{
      return 'Vendor';
    }
  }


  destroy(receiver){
    return sessionStorage.removeItem(receiver);
  }


}
