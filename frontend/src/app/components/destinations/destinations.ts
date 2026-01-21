import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DestinationService } from '../../services/destinations.service';
import { UnsplashService } from '../../services/unsplash.service';
import { Destination } from '../../models/destination.model';
import { empty } from 'rxjs';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.html',
  styleUrl: './destinations.scss',
  standalone: false,
})
export class DestinationsComponent implements OnInit {
  destinations: Destination[] = [];
  newDest = { country: '', imageUrl: '', budget: null as any, cities: '', isVisited: false };

  message: string = '';
  isError: boolean = false;
  isLoading = false;
  editDest: any = null;
  suggestedImages: string[] = [];

  constructor(
    private destService: DestinationService,
    private unsplash: UnsplashService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.isLoading = true;
    this.destService.getDestinations().subscribe({
      next: (data) => {
        this.destinations = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        this.isError = true;
        this.message = 'Impossible de charger vos destinations.';
        this.cdr.detectChanges();
      },
    });
  }

  add() {
    this.isLoading = true;
    this.message = '';
    this.isError = false;

    this.destService.createDestination(this.newDest).subscribe({
      next: () => {
        this.isLoading = false;
        this.message = 'Destination ajoutée !';
        this.isError = false;
        this.newDest = { country: '', imageUrl: '', budget: 0, cities: '', isVisited: false };
        this.load();
      },
      error: (err) => {
        this.isLoading = false;
        this.isError = true;
        this.message = err.error?.message || "Erreur lors de l'ajout.";
        this.cdr.detectChanges();
      },
    });
  }

  delete(id: string) {
    if (confirm('Supprimer cette destination ?')) {
      this.destService.deleteDestination(id).subscribe({
        next: () => this.load(),
        error: (err) => {
          this.isError = true;
          this.message = 'Erreur lors de la suppression';
        },
      });
    }
  }

  toggleVisited(dest: any) {
    this.destService.updateDestination(dest._id, { isVisited: !dest.isVisited }).subscribe({
      next: () => this.load(),
      error: (err) => {
        this.isError = true;
        this.message = 'Erreur de mise à jour';
      },
    });
  }

  startEdit(dest: any) {
    this.editDest = {
      ...dest,
      cities: Array.isArray(dest.cities) ? dest.cities.join(', ') : dest.cities,
    };
  }

  cancelEdit() {
    this.editDest = null;
  }

  saveUpdate() {
    this.destService.updateDestination(this.editDest._id, this.editDest).subscribe({
      next: () => {
        this.editDest = null;
        this.load();
      },
      error: (err) => {
        this.isError = true;
        this.message = 'Erreur de mise à jour';
      },
    });
  }

  searchPhotos() {
    if (!this.newDest.country) return;
    this.unsplash.searchImages(this.newDest.country).subscribe({
      next: (urls) => {
        this.suggestedImages = urls;
        this.cdr.detectChanges();
      },
      error: () => (this.suggestedImages = []),
    });
  }

  selectImage(url: string) {
    this.newDest.imageUrl = url;
    this.suggestedImages = [];
    this.cdr.detectChanges();
  }
}
