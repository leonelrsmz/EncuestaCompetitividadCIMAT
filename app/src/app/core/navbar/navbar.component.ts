import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loading: boolean;
  isAdmin: boolean;

  constructor(private authService: AuthService) {
                this.isAdmin = (authService.getRole() === 1) ? true : false;
              }

  ngOnInit(): void {
  }

  logout() {
    this.loading = true;
    this.authService.logout();
  }
}
