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

  delete(message){
    return this.http.delete(this.api(message))
  }

  update(message, body){
    return this.http.put(this.api(message), body)
  }


}
