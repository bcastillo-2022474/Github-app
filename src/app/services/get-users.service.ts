import {inject, Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_API_URL} from "../constants";

export type User = {
  login: string;
  id: number;
  avatar_url: string;
  url: string;
  repos_url: string;
  name: string;
  bio: string;
}

@Injectable({
  providedIn: 'root'
})
export class GetUsersService {

  private http = inject(HttpClient);

  getUsers() {
    return this.http.get<User[]>(BASE_API_URL + '/users')
  }

  getUser(user: string) {
    return this.http.get<User>(`${BASE_API_URL}/users/${user}`)
  }

}
