import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { FilterBy } from '../interfaces/filter';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly API_URL = 'https://jsonplaceholder.typicode.com';

  constructor(
    private http: HttpClient,
  ) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/users/`);
  }

  filterUsers(filterBy: FilterBy[]): Observable<User[]> {
    let searchQuery: string = '?';
    for (let index = 0; index < filterBy.length; index++) {
      searchQuery = searchQuery + filterBy[index].fieldName + '=' + filterBy[index].searchValue + '&';
    }
    searchQuery = searchQuery.substring(0, searchQuery.length - 1)

    return this.http.get<User[]>(`${this.API_URL}/users${searchQuery}`);
  }
}
