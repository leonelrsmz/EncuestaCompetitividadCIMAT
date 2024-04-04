import { Injectable } from '@angular/core';
import { ApiCallerService } from './api-caller.service';
import { UserInsFireBaseModel, UserModel } from '../models/user.model';
import { first, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AngularFireAuth } from '@angular/fire/auth';
//import { auth } from 'firebase';
import firebase from 'firebase/app';
import { parseJwt } from '../helpers/jwtDecode';
import { BaseService } from './base.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ReturnServiceModel } from '../models/return-service.model';
import { HttpClient } from '@angular/common/http';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  userToken: string;
  name: string;
  userId: string;

  roleId: number;

  public controller = 'api/Account/';

  constructor(private apiCaller: ApiCallerService,
              public afAuth: AngularFireAuth,
              private http: HttpClient) {
    super();

    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
  }
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('userId');
    localStorage.removeItem('expTkn');
    localStorage.removeItem('provider');
    localStorage.removeItem('rolId');
  }
  public login(user: UserModel) {
    //console.log(`============> LoginService: ${user} <============`);
    return this.apiCaller.postQueryWithJson(`${this.controller}Authenticate`, user)
    .pipe(
      map(data => {
        const statusCode = data['statusCode'];
        if (statusCode === 200) {
          const result = data['data'];
          this.pushToken(result.accessToken);
        }
        return data;
      })
    );
  }
  public register(user: UserModel) {
    return this.apiCaller.postQueryWithJson(`${this.controller}Create`, user)
    .pipe(
      map(data => {
        const statusCode = data['statusCode'];
        if (statusCode === 200) {
          const result = data['data'];
          this.pushToken(result.token);
        }
        return data;
      })
    );
  }
  private pushToken(token: string) {
    this.userToken = token;
    const decoded = helper.decodeToken(token);
    localStorage.setItem('token', this.userToken);
    localStorage.setItem('name', decoded.Name);
    localStorage.setItem('userId', decoded.UserId);
    localStorage.setItem('expTkn', decoded.exp);
    localStorage.setItem('rolId', decoded.RolId);
  }
  private popToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    if (localStorage.getItem('name')) {
      this.name = localStorage.getItem('name');
    } else {
      this.name = '';
    }
    if (localStorage.getItem('userId')) {
      this.userId = localStorage.getItem('userId');
    } else {
      this.userId = '';
    }
    if (localStorage.getItem('rolId')) {
      this.roleId = +localStorage.getItem('rolId');
    } else {
      this.roleId = 0;
    }
  }
  public isAuthenticate(): boolean {
    if (this.userToken.length < 2) {
      this.logout();
      return false;
    }
    // exp to Date GMT
    const d2 = new Date(0);
    const expiration = d2.setUTCSeconds( Number(localStorage.getItem('expTkn')) );

    // test
    const expiryTime = new Date(expiration);
    const currentTime = new Date();

    if (expiryTime > currentTime) {
      return true;
    }
    this.logout();
    return false;
  }

  dateToTicks(date) {
    const epochOffset = 621355968000000000;
    const ticksPerMillisecond = 10000;

    const ticks = date.getTime() * ticksPerMillisecond + epochOffset;

    return ticks;
  }
  //  firebase
  async loginEmail(user: UserModel){
    try{
      // this.afAuth.onAuthStateChanged((userResult) => {
      //   this.userFirebase = userResult;
      //   localStorage.setItem('name', userResult.email);
      //   console.log('5 - Firebase Login Email: ' + this.userFirebase.email);
      //   this.router.navigateByUrl('/home');
      // })
      const result = await this.afAuth.signInWithEmailAndPassword(user.Username, user.Password);

          // const userResult = data['user'];
          // const decoded = helper.decodeToken(userResult['Aa']);
          // localStorage.setItem('token', userResult['Aa']);
          // localStorage.setItem('name', userResult.email);
          // localStorage.setItem('userId', userResult.uid);
          // localStorage.setItem('expTkn', decoded.exp);
          // console.log('Firebase Login Email: ' + userResult.email);
          // this.router.navigateByUrl('/home');
      return result;
    }
    catch (error){
      console.log(error);
    }
  }
  public pushTokenFirebase(token: string) {
    this.userToken = helper.decodeToken(token);
    let firebase = this.userToken['firebase'];
    let provider = firebase['sign_in_provider'];
    localStorage.setItem('token', token);
    if (this.userToken['name'])
    {
      localStorage.setItem('name', this.userToken['name']);
    }
    else
    {
      if (this.userToken['email'])
      {
        localStorage.setItem('name', this.userToken['email']);
      }
      else
      {
          localStorage.setItem('name', 'Usuario Invitado');
      }
    }
    localStorage.setItem('userId', this.userToken['user_id']);
    localStorage.setItem('expTkn', this.userToken['exp']);
    localStorage.setItem('provider', provider);
  }
  async logoutFirebase(){
    try{
      await this.afAuth.signOut();
      this.logout();
    }
    catch (error){
      console.log(error);
    }
  }
  async registerFirebase(user: UserModel){
    try{
      const result = await this.afAuth.createUserWithEmailAndPassword(user.Username, user.Password);
      return result;
    }
    catch (error){
      console.log(error);
    }
  }
  getCurrentUser(){
    try{
      return this.afAuth.authState.pipe(first()).toPromise();
    }
    catch (error){
      console.log(error);
    }
  }
  async loginGoogle(){
    try{
      return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider);
    }
    catch (error){
      console.log(error);
    }
  }
  async loginFacebook(){
    try{
      return this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider);
    }
    catch (error){
      console.log(error);
    }
  }
  //  firebase
  public test() {
    return this.apiCaller.getQuery(`https://localhost:44339/weatherforecast`);
  }
  public registerFireBase(user: UserInsFireBaseModel): Observable<ReturnServiceModel> {
    return this.http.post<ReturnServiceModel>(`${this.URL}${this.controller}UserInsFireBase`, user)
      .pipe(
        map(data => {
          const statusCode = data['statusCode'];
          if (statusCode === 200) {
            const result = data['data'];
            this.pushToken(result.accessToken);
          }
          return data;
        }),
        catchError(
          this.handleError('POSTUSERINSFIREBASEURL', null)));
  }

  public getRole() {
    this.roleId = +localStorage.getItem('rolId');
    return this.roleId;
  }
}
