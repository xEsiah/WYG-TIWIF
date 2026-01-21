import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
  standalone: false,
})
export class ProfilComponent implements OnInit {
  user: any;
  followerCount: number = 0;
  friendUsername: string = '';
  message: string = '';
  isError: boolean = false;
  isEditingName = false;
  tempUsername: string = '';

  avatars = [
    'assets/avatar1.png',
    'assets/avatar2.png',
    'assets/avatar3.png',
    'assets/avatar4.png',
  ];

  constructor(
    private userService: UserService,
    public authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.userService.getProfile().subscribe({
      next: (data) => {
        this.user = data;
        this.followerCount = data.followerCount || 0;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erreur profil:', err),
    });
  }

  changeAvatar(url: string) {
    this.userService.updateAvatar(url).subscribe({
      next: () => {
        this.user.pfpUrl = url;
        this.message = 'Avatar mis à jour !';
        this.isError = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.message = "Erreur lors du changement d'avatar";
        this.isError = true;
        this.cdr.detectChanges();
      },
    });
  }

  onAddFollow() {
    this.userService.addFollow(this.friendUsername).subscribe({
      next: () => {
        this.friendUsername = '';
        this.loadProfile();
      },
      error: (err) => {
        this.message = err.error.message;
        this.isError = true;
      },
    });
  }

  onRemoveFollow(id: string) {
    this.userService.removeFollow(id).subscribe({
      next: () => this.loadProfile(),
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  startEditName() {
    this.tempUsername = this.user.username;
    this.isEditingName = true;
  }

  cancelEditName() {
    this.isEditingName = false;
  }

  saveUsername() {
    this.userService.updateUsername(this.tempUsername).subscribe({
      next: () => {
        this.user.username = this.tempUsername;
        this.isEditingName = false;
        this.message = 'Pseudo mis à jour !';
        this.isError = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.message = err.error.message || 'Erreur de mise à jour';
        this.isError = true;
        this.cdr.detectChanges();
      },
    });
  }
}
