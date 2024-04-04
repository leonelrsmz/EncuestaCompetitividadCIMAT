import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class BaseService {
    public URL = environment.apiUrl;

    public _getHeaders(token: string = ''): any {
        const HEADERS = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                Accept: 'application/json',
                'Access-Control-Allow-Headers': 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
                'Access-Control-Allow-Credentials': 'true',
                Allow: 'GET, POST, OPTIONS, PUT, DELETE',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
                'Access-Control-Allow-Origin': '*',
                Authorization: 'Bearer ' + token
            })
        };
        return HEADERS;
    }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
   public handleError<T>(operation = 'Unknow', result?: T) {
    //console.log(`operation: ${operation}`);
    return (error: any): Observable<T> => {
      // TODO: Send the error to remote logging infrastructure or...
      console.error(error); // log to console instead.

      // TODO: Better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the application keep running by returning an empty rslt
      return of(result as T);
    };
  }
}
