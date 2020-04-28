import { Injectable } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PostService {
  url = 'http://localhost:3000/posts/';

  constructor(private http: HttpClient) { }

  getPosts(user: User): Observable<Post[]> {
    const endpoint = this.url + user.userId;
    return this.http.get<Post[]>(endpoint);
  }
}
