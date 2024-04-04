import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/core/services/validators.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { UserInsFireBaseModel, UserModel } from 'src/app/core/models/user.model';
import { logging } from 'protractor';
import { ReturnServiceModel } from 'src/app/core/models/return-service.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  user: UserModel;
  token: string;
  loading: boolean;
  error: boolean;
  errorMessage: string;
  userCredential: any;

  constructor(private fBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.form = this.fBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.form.reset({
      email: '',//'cesar@gmail.com',
      password: ''//'212121'
    });
  }

  get invalidEmail() {
    return this.form.get('email').invalid && this.form.get('email').touched;
  }

  get invalidPassword() {
    return this.form.get('password').invalid && this.form.get('password').touched;
  }

  onLogin() {
    if (this.form.invalid) {
      return Object.values( this.form.controls ).forEach( control => {
        if (control instanceof FormGroup) {
          Object.values( control.controls ).forEach( control2 => control2.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    } else {
      this.loading = true;
      this.error = false;
      this.user = new UserModel();
      this.user.Username = this.form.get('email').value;
      this.user.Password = this.form.get('password').value;
      //console.log(`============> Login Component ${this.user} <============`);
      this.authService.login(this.user).subscribe((data: any) => {
        if (data) {
          //console.log(JSON.stringify(data));
          const statusCode = data['statusCode'];
          if (statusCode === 200) {
            //console.log(statusCode);
            this.token = data['AccessToken'];
            this.form.reset();
            this.loading = false;
            this.router.navigateByUrl('/');
          } else {
            this.loading = false;
            this.error = true;
            this.errorMessage = data['error'];
          }
        }
      }, (errorResonse) => {
        this.loading = false;
        this.error = true;
        // tslint:disable-next-line: quotemark
        this.errorMessage = errorResonse["message"];
      });
    }
  }

  async onEmailLogin() {
    this.loading = true;
    this.error = false;
    this.user = new UserModel();
    this.user.Username = this.form.get('email').value;
    this.user.Password = this.form.get('password').value;
    await this.authService.logoutFirebase();
    await this.authService.loginEmail(this.user);
    const result = await this.authService.getCurrentUser();
    if (result) {
      //console.log('Firebase Login Email: ' + userResult.email);
      this.form.reset();
      this.loading = false;
      this.authService.pushTokenFirebase(result['Aa']);
      this.router.navigateByUrl('/home');
    } else {
      this.loading = false;
      this.error = true;
      this.errorMessage = 'error';
    }
  }

  async onGoogleLogin() {
    this.loading = true;
    this.error = false;
    await this.authService.logoutFirebase();
    await this.authService.loginGoogle();
    const result = await this.authService.getCurrentUser();
    if (result) {
      this.loading = false;
      this.authService.pushTokenFirebase(result['Aa']);
      let model: UserInsFireBaseModel = new UserInsFireBaseModel();
      model.Name = result['displayName'];
      model.Email = result['email'];
      model.Company = '';
      model.RolId = 2;
      model.UId = result['uid'];
      let res: ReturnServiceModel = await this.authService.registerFireBase(model).toPromise();
      if (res.statusCode === 200) {
        //console.log(statusCode);
        this.token = res.data['accessToken'];
        this.loading = false;
        this.router.navigateByUrl('/home');
      } else {
        this.loading = false;
        this.error = true;
        this.errorMessage = res.errorMessage;
      }
    }
  }

  async onFacebookLogin() {
    this.loading = true;
    this.error = false;
    await this.authService.logoutFirebase();
    await this.authService.loginGoogle();
    const result = await this.authService.loginFacebook();
    if (result) {
      this.loading = false;
      this.authService.pushTokenFirebase(result['Aa']);
      this.router.navigateByUrl('/home');
    } else {
      this.loading = false;
      this.error = true;
      this.errorMessage = 'error';
    }
  }
}
