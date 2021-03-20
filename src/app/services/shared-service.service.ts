import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  private subject=new BehaviorSubject(null);
  msg="";
  path="";
  constructor() { }

  setUsername(username){
    let data=username;
    this.subject.next(data);
  }

  getUsername(){
    return this.subject.asObservable();
  }

  setPath(link){
    console.log(link);
    this.path=link;
    this.subject.next(this.path);
  }
  
  getPath(){
    return this.subject.asObservable();
  }
}
