import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ng-socket-io';
import { UserService } from './user.service'

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient, private socket: Socket, private userService: UserService) { }
  api =  (endpoint: String = '') => `http://localhost:4000/${endpoint}`;

  fetch(session){
    // return  this.socket
    // .fromEvent<any>("message")
    // .pipe(map(data => data.msg ));
    return fetch(this.api(`message/${session}`)).then(res => res.json())
  }

  create({info, recipient, recipient_id, session}){
    let {asA: sender, _id: sender_id} = this.userService.session();
    return this.socket.emit('message', {info, recipient, recipient_id, session, sender, sender_id})
  }

  init(reciever){
    return new Promise((reject, resolve) => {
      let id = reciever.id || reciever._id
      let item = sessionStorage.getItem(id);
      if(item){
        resolve(JSON.parse(item))
      }else{
        fetch(this.api('message'),{method : 'POST'})
        .then(res => res.json())
        .then(session => {
          sessionStorage.setItem(id, JSON.stringify({session, receiver : {asA : 'Vendor', ...reciever}}))
          resolve({session, reciever});
        }, reject)
        .catch(reject)
      }
    })
  }



  destroy(receiver){
    return sessionStorage.removeItem(receiver);
  }


}
