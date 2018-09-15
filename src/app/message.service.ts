import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }
  api =  (endpoint: String = '') => `localhost:4000/${endpoint}`;

  fetch(){
    return this.http.get(this.api());
  }

  create(message){
    return this.http.post(this.api(), message)
  }

  init(reciever){
    return new Promise((reject, resolve) => {
      let item = sessionStorage.getItem(reciever);
      if(item){
        resolve(JSON.parse(item))
      }else{
        fetch(this.api('/message'),{method : 'POST'})
        .then(res => res.json())
        .then(session => {
          sessionStorage.setItem(reciever, JSON.stringify(session))
        }, reject)
        .catch(reject)
      }
    })
  }

  destroy(receiver){
    return sessionStorage.removeItem(receiver);
  }


}
