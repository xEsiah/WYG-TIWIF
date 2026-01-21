import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`);
  }

  updateAvatar(pfpUrl: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile/avatar`, { pfpUrl });
  }

  addFollow(username: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/subscriptions`, { username });
  }

  removeFollow(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/subscriptions/${id}`);
  }
  updateUsername(username: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile/username`, { username });
  }
}
