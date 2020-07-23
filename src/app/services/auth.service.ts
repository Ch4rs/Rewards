import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://192.168.0.21/auth-api/api';
  constructor(private http:HttpClient) { }
  login(user:User): Observable<string> {
    return this.http.post<{ token: string }>(`${this.url}/login`,user).pipe(map(response => response.token )
    );
  } 
  register(user:User): Observable<string> {
    return this.http.post<{ message: string }>(`${this.url}/register`,user).pipe(map(response => response.message )
    );
  } 
}
