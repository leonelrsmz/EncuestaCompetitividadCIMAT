import { Injectable, Inject, Query } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
//import { URLSearchParams, RequestOptions } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const URL = environment.apiUrl;

export const handleError = (error: HttpErrorResponse) => {
    if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      return throwError('An error occurred:' + error.error.message);
    }
        // The backend returned an unsuccessful response code.
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
       // return an observable with a user-facing error message
    return throwError ('Ocurrió un error ; Por favor comuniquelo al administrador.');
  };
  
@Injectable()
export class ApiCallerService {

    constructor(private http: HttpClient) {}

    private _getHeaders(token: string = ''): any {
        const HEADERS = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Headers': 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
                'Access-Control-Allow-Credentials': 'true',
                'Allow': 'GET, POST, OPTIONS, PUT, DELETE',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + token
            })
        };
        return HEADERS;
    }
    
    // get 
    getQuery(query: string, token: string = ''): Observable<any> {
        const HEADERS = this._getHeaders(token);
        //console.log(`get: ${URL}${query}\n${JSON.stringify(HEADERS)}`);
        return this.http.get<any>(`${URL}${query}`, HEADERS);
    }

    // get with json
    // getQueryWithJson(query: string, params: any) {
    //     return this.http.get(`${URL}${query}?${params}`);
    // }

    //post with json
    postQueryWithJson(query: string, params: any, token: string = '') {
        const HEADERS = this._getHeaders(token);
        return this.http.post(`${URL}${query}`, params, HEADERS);
    }
    
    // postQuery(query: string, params: any) {
    //     return this.http.post(`${URL}${query}, params);
    // }
    
    //put with json
    putQueryWithJson(query: string, params: any, token: string = '') {
        const HEADERS = this._getHeaders(token);
        return this.http.put(`${URL}${query}`, params, HEADERS);
    }
    
    //delete with json
    deleteQueryWithJson(query: string, token: string = '') {
        const HEADERS = this._getHeaders(token);
        return this.http.delete(`${URL}${query}`, HEADERS);
    }

    // get 
    getQueryPipe(query: string, token: string = ''): Observable<any> {
        const HEADERS = this._getHeaders(token);
        return this.http.get<any>(`${URL}${query}`, HEADERS)
        .pipe(catchError(handleError));
    }
}
