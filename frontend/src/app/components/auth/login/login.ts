import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  standalone: false,
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  message: string = '';
  isError: boolean = false;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  onLogin() {
    this.isLoading = true;
    this.message = '';
    this.isError = false;

    this.authService.login(this.email, this.password).subscribe({
      next: (data) => {
        this.cdr.detectChanges();
        setTimeout(() => this.router.navigate(['/']), 1000);
      },
      error: (err) => {
        this.isLoading = false;
        this.isError = true;
        this.message = err.error?.message || 'Une erreur est survenue';
        this.cdr.detectChanges();
      },
    });
  }
}
