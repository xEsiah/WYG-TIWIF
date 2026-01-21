import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap, BehaviorSubject, map } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _HTTP = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/auth';

  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'User';

  private userSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  user$ = this.userSubject.asObservable();

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private getUserFromStorage(): User | null {
    const data = localStorage.getItem(this.USER_KEY);
    try {
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUsername(): string {
    const user = this.userSubject.value;
    return user ? user.username : 'Invité';
  }

  login(email: string, password: string): Observable<any> {
    return this._HTTP.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((data: any) => {
        localStorage.setItem(this.TOKEN_KEY, data.token);
        const userData = { _id: data.userId, username: data.username } as User;
        localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
        this.userSubject.next(userData);
      }),
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this._HTTP.post(`${this.apiUrl}/register`, { username, email, password }).pipe(
      tap((data: any) => {
        localStorage.setItem(this.TOKEN_KEY, data.token);
        const userData = { _id: data.userId, username: data.username } as User;
        localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
        this.userSubject.next(userData);
      }),
    );
  }

  logout() {
    localStorage.clear();
    this.userSubject.next(null);
  }

  getUserProfile(): Observable<User> {
    return this._HTTP.get<User>(`${this.apiUrl}/profile`);
  }

  addSubscription(username: string): Observable<any> {
    return this._HTTP.post(`${this.apiUrl}/subscriptions`, { username });
  }

  removeSubscription(subscriptionId: string): Observable<any> {
    return this._HTTP.delete(`${this.apiUrl}/subscriptions/${subscriptionId}`);
  }
}
