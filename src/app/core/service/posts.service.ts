import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post';
import { Comment } from '../interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private readonly API_URL = 'https://jsonplaceholder.typicode.com';

  constructor(
    private http: HttpClient,
  ) { }

  getPostsByUser(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.API_URL}/users/${id}/posts`);
  }

  getCommentsByPost(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.API_URL}/comments?postId=${postId}`);
  }

  deletePost(postId: number) {
    return this.http.delete(`${this.API_URL}/posts/${postId}`);
  }
}
