import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor() { }

  $modalSwitch = new EventEmitter<any>();
  $searchSmartTb = new EventEmitter<any>();

}
