import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorsService } from '../../core/services/validators.service';
import { RegisterModel } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  user: RegisterModel;
  token: string;
  loading: boolean;
  error: boolean;
  errorMessage: string;

  constructor(private fBuilder: FormBuilder,
              private validatorService: ValidatorsService,
              private authService: AuthService,
              private router: Router) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.form = this.fBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', [Validators.required]],
    }, {
      validators: this.validatorService.passwordConfirm('password', 'confirm')
    });
    // this.form.reset({
    //   name: 'Jahairo Acevedo',
    //   email: 'jahairo.acevedo@neoris.com',
    //   password: '123456',
    //   confirm: '123456'
    // });
  }

  get invalidName() {
    return this.form.get('name').invalid && this.form.get('name').touched;
  }

  get invalidEmail() {
    return this.form.get('email').invalid && this.form.get('email').touched;
  }

  get invalidPassword() {
    return this.form.get('password').invalid && this.form.get('password').touched;
  }

  get invalidConfirm() {
    const password = this.form.get('password').value;
    const confirm = this.form.get('confirm').value;
    return (password === confirm) ? false : true;
  }

  onRegister() {
    if (this.form.invalid) {
      return Object.values( this.form.controls ).forEach( control => {
        if (control instanceof FormGroup) {
          Object.values( control.controls ).forEach( control2 => control2.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      } );
    } else {
      this.loading = true;
      this.error = false;
      this.user = new RegisterModel();
      this.user.Name = this.form.get('name').value;
      this.user.Username = this.form.get('email').value;
      this.user.Password = this.form.get('password').value;
      this.authService.register(this.user).subscribe((data: any) => {
        if (data) {
          //console.log(JSON.stringify(data));
          const statusCode = data['statusCode'];
          if (statusCode === 200) {
            //console.log(statusCode);
            this.token = data['token'];
            this.form.reset();
            this.loading = false;
            this.router.navigateByUrl('/home');
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
}