import { Component } from '@angular/core';
import { AuthGuard } from './core/guards/auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'POC-Cimat';

  constructor() {}
}
