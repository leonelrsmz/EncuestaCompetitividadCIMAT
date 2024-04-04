import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ReturnServiceModel } from '../models/return-service.model';
import { UserSearchModel } from '../models/user.model';
import { AuthService } from './auth.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  public POSTUSERSALLURL = 'api/User/UsersAll';

  constructor(private http: HttpClient,
    private authService: AuthService) {
      super();
    }

    public postUser(params: UserSearchModel): Observable<ReturnServiceModel> {
      return this.http.post<ReturnServiceModel>(`${this.URL}${this.POSTUSERSALLURL}`, params).pipe(catchError(this.handleError('POSTUSERSALLURL', null)));
    }
}
