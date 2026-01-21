import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UnsplashService {
  private http = inject(HttpClient);
  private accessKey = environment.unsplashKey;
  private baseUrl = 'https://api.unsplash.com/search/photos';

  searchImages(query: string): Observable<string[]> {
    if (!query || query.length < 3) return of([]);

    const params = new HttpParams()
      .set('query', query)
      .set('client_id', this.accessKey)
      .set('per_page', '4');

    return this.http.get<any>(this.baseUrl, { params }).pipe(
      map((res) => res.results.map((img: any) => img.urls.regular)),
      catchError(() => of([])),
    );
  }
}
