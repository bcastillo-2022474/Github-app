import {Component, inject, Input, OnInit} from '@angular/core';
import {Commit, GetCommitsService} from "../../services/get-commits.service";
import {faStar} from "@fortawesome/free-regular-svg-icons";
import {faBook, faCodeFork} from "@fortawesome/free-solid-svg-icons";
import {GetRepositoriesService, Repository} from "../../services/get-repositories.service";
import {User} from "../../services/get-users.service";


@Component({
  selector: 'app-user-overview-tab',
  templateUrl: './user-overview-tab.component.html',
  styleUrls: ['./user-overview-tab.component.scss']
})
export class UserOverviewTabComponent implements OnInit {
  @Input() user!: User;

  private commitsService = inject(GetCommitsService)
  private repositoriesService = inject(GetRepositoriesService)
  repositories!: Repository[];
  commits!: Commit[];

  ngOnInit(): void {
    this.repositoriesService.getRepositories(this.user.repos_url).subscribe((repositories) => {
      this.repositories = repositories;
    })

    this.commitsService.getAllCommits(this.user.repos_url).subscribe((commits) => {
      this.commits = commits;
      this.makeMapCommits(commits);
    })
  }

  mapDates!: Record<string, number>;

  getClassName(day: string) {
    const didCommitThatDay = Boolean(this.mapDates[day]);
    if (!didCommitThatDay) return ''
    const greenValue = Math.min(this.mapDates[day] * 100 + 100, 1000);
    return `bg-green-${greenValue}`
  }

  months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  generateYearDates(): string[] {
    const startDate = new Date(new Date().getFullYear(), 0, 1); // January 1 of the current year
    const endDate = new Date(new Date().getFullYear(), 11, 31); // December 31 of the current year

    const dates: string[] = [];
    for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
      const formattedDate = currentDate.toISOString().slice(0, 10);
      dates.push(formattedDate);
    }

    return dates;
  }


  protected readonly faStar = faStar;
  protected readonly faBook = faBook;
  protected readonly faCodeFork = faCodeFork;


  makeMapCommits(commits: Commit[]) {

    commits.forEach(console.log)
    this.mapDates = commits.filter(commit => commit.message !== "Git Repository is empty.").map(({commit}) => {
      const {date} = commit.committer
      return date.slice(0, date.length - 10)
    }).reduce((map: Record<string, number>, curr) => {
      map[curr] = (map[curr] || 0) + 1
      return map
    }, {})
  }

  getArraySeparateEvery(number: number, strings: string[]) {
    const result: string[][] = [];
    for (let i = 0; i < strings.length; i += number) {
      result.push(strings.slice(i, i + number));
    }
    return result;
  }
}
