import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.html',
  styleUrl: './subscriptions.scss',
  standalone: false,
})
export class SubscriptionsComponent implements OnInit {
  subscriptions: User[] = [];
  newSubscriptionUsername: string = '';
  isLoading: boolean = false;
  message: string = '';
  isError: boolean = false;

  constructor(
    public authService: AuthService,
    private userService: UserService,
    public router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.load();
  }

  isHomePath(): boolean {
    return this.router.url === '/';
  }

  load() {
    this.isLoading = true;
    this.authService.getUserProfile().subscribe({
      next: (user) => {
        this.subscriptions = user.subscriptions || [];
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (message) => {
        this.isLoading = false;
        this.handleError('Erreur de chargement');
        this.cdr.detectChanges();
      },
    });
  }

  add() {
    if (!this.newSubscriptionUsername.trim()) return;
    this.isLoading = true;
    this.message = '';
    this.isError = false;

    this.userService.addFollow(this.newSubscriptionUsername).subscribe({
      next: () => {
        this.load();
        this.message = 'Utilisateur suivi !';
        this.newSubscriptionUsername = '';
      },
      error: (err) => {
        this.isLoading = false;
        this.handleError(err.error?.message || 'Erreur');
        this.cdr.detectChanges();
      },
    });
  }

  delete(subscriptionId: string) {
    if (confirm('Arrêter de suivre cet utilisateur ?')) {
      this.authService.removeSubscription(subscriptionId).subscribe({
        next: () => this.load(),
        error: () => this.handleError('Erreur'),
      });
    }
  }

  private handleError(msg: string) {
    this.isError = true;
    this.message = msg;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }
}
