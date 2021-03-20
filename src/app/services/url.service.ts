import { Injectable, Inject } from '@angular/core';
import { DOCUMENT, LocationStrategy } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(@Inject(DOCUMENT) private readonly document:any) { }

  getUrl(){
    console.log(this.document.location.origin);
    return `${this.document.location.origin}`;
  }
}
