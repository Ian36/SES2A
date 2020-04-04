import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API = 'http://localhost:3000/api/user/';
  constructor(private http: HttpClient) { }

  registerUser(user) {
    return this.http.post<any>(this.API + 'register', user);
  }

  loginUser(user) {
    return this.http.post<any>(this.API + 'login', user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getLoggedInUser() {
    return this.http.post<any>(this.API + 'token', this.getToken());
  }
}
