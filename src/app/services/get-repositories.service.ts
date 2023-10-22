import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export type Repository = {
  message: string;
  description: string;
  html_url: string;
  git_url: string;
  name: string;
  full_name: string;
  visibility: "public" | "private";
  language: string;
  watchers_count: number;
  forks: number;
  commits_url: string;
}

@Injectable({
  providedIn: 'root'
})
export class GetRepositoriesService {
  private http = inject(HttpClient)

  getRepositories(reposUrl: string): Observable<Repository[]> {
    return this.http.get<Repository[]>(reposUrl);
  }

}
