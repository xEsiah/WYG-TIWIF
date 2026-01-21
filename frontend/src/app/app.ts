import { Component, signal } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    public router: Router,
  ) {}

  isHomePage(): boolean {
    return this.router.url === '/';
  }
}
