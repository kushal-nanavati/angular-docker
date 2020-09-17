import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  private subject=new BehaviorSubject(null);
  msg="";
  constructor() { }

  setUsername(username){
    let data=username;
    this.subject.next(data);
  }

  getUsername(){
    return this.subject.asObservable();
  }
}
