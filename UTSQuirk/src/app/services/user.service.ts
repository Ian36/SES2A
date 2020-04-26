import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:3000/user/';
  constructor(private http: HttpClient) { }

  getUser(user: User): Observable<User> {
    const endpoint = this.url + 'login';
    return this.http.post<User>(endpoint, user, httpOptions);
  }

  getUsers(): Observable<any> {
    const endpoint = this.url;
    return this.http.get<any>(endpoint, httpOptions);
  }
}
