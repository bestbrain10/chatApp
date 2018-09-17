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

  getMessage(session){
    return this.socket
            .fromEvent<any>("message")
            .pipe(filter(data => data.session == session))
            .pipe(map(data => data.messages));
  }

  create({info, recipient, recipient_id, session}){
    let {asA: sender, _id: sender_id} = this.userService.session();
    console.log({info, recipient, recipient_id, session, sender, sender_id});
    return this.socket.emit('message', {info, recipient, recipient_id, session, sender, sender_id})
  }

  send({info, recipient, recipient_id, session}){
    let {asA: sender, _id: sender_id} = this.userService.session();
    return fetch(this.api('message'), {
      method : 'POST', 
      body : JSON.stringify({info, recipient, recipient_id, session, sender, sender_id}),
      headers : {
        'content-type' : 'application/json'
      }
    }).then(res => res.json())
  }

  init(reciever){
    return new Promise((resolve, reject) => {
      let id = reciever.id || reciever._id || reciever;
      let item = sessionStorage.getItem(id);
      if(item){
        return resolve(JSON.parse(item))
      }else{
        fetch(this.api('message'),{method : 'POST'})
        .then(res => res.json())
        .then(session => {
          let data = {session, receiver : {asA : 'Vendor', ...reciever}};
          sessionStorage.setItem(id, JSON.stringify(data))
          return resolve(data);
        }, reject)
        .catch(reject)
      }
    })
  }



  destroy(receiver){
    return sessionStorage.removeItem(receiver);
  }


}
