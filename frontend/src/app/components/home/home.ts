import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DestinationService } from '../../services/destinations.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  standalone: false,
})
export class HomeComponent implements OnInit {
  lastDest: any = null;

  constructor(
    public authService: AuthService,
    private destService: DestinationService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.loadLastDestination();
    }
  }

  loadLastDestination() {
    this.destService.getLastDestination().subscribe({
      next: (dest) => {
        this.lastDest = dest;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err),
    });
  }
}
