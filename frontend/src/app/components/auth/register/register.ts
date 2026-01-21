import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
  standalone: false,
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  repeatPassword = '';
  message = '';
  isError = false;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onRegister() {
    if (this.password !== this.repeatPassword) {
      this.isError = true;
      this.message = 'Les mots de passe ne correspondent pas.';
      return;
    }

    this.isLoading = true;
    this.message = '';
    this.isError = false;

    this.authService.register(this.username, this.email, this.password).subscribe({
      next: () => {
        this.isLoading = false;
        this.message = 'Inscription réussie ! Redirection...';
        setTimeout(() => this.router.navigate(['/']), 1500);
      },
      error: (err) => {
        this.isLoading = false;
        this.isError = true;
        this.message = err.error?.message || 'Erreur lors de l’inscription';
      },
    });
  }
}
