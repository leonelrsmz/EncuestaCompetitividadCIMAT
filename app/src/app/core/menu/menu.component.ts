import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-menu1',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    let displayTxt = true;
    $(document).ready(function() {
      $('#sidebarCollapse').on('click', function() {
          $('#sidebar').toggleClass('active');
          if (displayTxt) {
            $( "#sidebarCollapsetxt" ).hide();
          } else {
            $( "#sidebarCollapsetxt" ).show();
          }
          displayTxt = !displayTxt;
      });
      $('#sidebarCollapse').click();
    });
   }
   
  logout() {
    this.authService.logout();
  }
}