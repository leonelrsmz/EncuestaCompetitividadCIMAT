import { Injectable } from '@angular/core';
import { ApiCallerService } from './api-caller.service';
import { ItemModel } from '../models/item.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  public controller = 'api/Items/';

  constructor(private apiCaller: ApiCallerService,
              private authService: AuthService) { }
  
  public insert(params: ItemModel) {
    const token = this.authService.userToken;
    return this.apiCaller.postQueryWithJson(`${this.controller}Insert`, params, token);
  }
  
  public getAll() {
    const token = this.authService.userToken;
    return this.apiCaller.getQuery(`${this.controller}`, token);
  }

  public get(param: string) {
    const token = this.authService.userToken;
    return this.apiCaller.getQuery(`${this.controller}${param}`, token);
  }
  
  public update(params: ItemModel) {
    const token = this.authService.userToken;
    return this.apiCaller.putQueryWithJson(`${this.controller}Update/${params.itemNumber}`, params, token);
  }

  public delete(param: string) {
    const token = this.authService.userToken;
    return this.apiCaller.deleteQueryWithJson(`${this.controller}Delete/${param}`, token);
  }
}
