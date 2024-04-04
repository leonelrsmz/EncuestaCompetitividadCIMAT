import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) { }

  canActivate( ): boolean {
    if (!this.authService.isAuthenticate()) {
      return true;
    } else {
      this.router.navigateByUrl('/home');
      return false;
    }
  }
}
