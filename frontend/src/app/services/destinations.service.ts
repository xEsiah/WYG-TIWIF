import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Destination } from '../models/destination.model';

@Injectable({
  providedIn: 'root',
})
export class DestinationService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/destinations';

  getDestinations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createDestination(destination: any): Observable<any> {
    return this.http.post(this.apiUrl, destination);
  }

  updateDestination(id: string, destination: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, destination);
  }

  deleteDestination(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getLastDestination(): Observable<Destination> {
    return this.http.get<Destination>(`${this.apiUrl}/last`);
  }
}
