import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  from, Observable
} from "rxjs";
import {Repository} from "./get-repositories.service";
import {TOKEN} from "../constants";

export function fetchGithub(url: string) {
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`
    }
  })
}

export type Commit = {
  message: string;
  commit: {
    committer: {
      date: string;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class GetCommitsService {

  private http = inject(HttpClient)


  constructor() {
  }

  getAllCommits(reposURL: string): Observable<Commit[]> {
    async function getCommits() {
      const repos: Repository[] = await fetchGithub(reposURL).then((res) => res.json());
      const listOfCommitsPerRepository = await Promise.allSettled(
        repos.map((repo) => {
          return fetchGithub(repo.commits_url.replace("{/sha}", "")).then((res) => {
            if (res.status === 200) return res.json();
            return [];
          });
        })
      );

      const commits: Commit[] = listOfCommitsPerRepository
        .filter((res) => res.status !== "rejected")
        .map((res) => {
          if (res.status === "fulfilled") return res.value;
        })
        .flat();

      return commits;
    }

    return from(getCommits())
  }

}
