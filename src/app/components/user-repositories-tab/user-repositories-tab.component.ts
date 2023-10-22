import {Component, inject, Input} from '@angular/core';
import {User} from "../../services/get-users.service";
import {GetRepositoriesService, Repository} from "../../services/get-repositories.service";
import {faStar} from "@fortawesome/free-regular-svg-icons";
import {faCheck, faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons/faCaretDown";
import {Commit, fetchGithub} from "../../services/get-commits.service";
import {faClose} from "@fortawesome/free-solid-svg-icons/faClose";

const dateTimeFormat = new Intl.DateTimeFormat('en', {
  // dateStyle: 'medium',
  month: 'short',
  year: 'numeric',
  weekday: 'short',
  day: 'numeric',
})

@Component({
  selector: 'app-user-repositories-tab',
  templateUrl: './user-repositories-tab.component.html',
  styleUrls: ['./user-repositories-tab.component.scss']
})
export class UserRepositoriesTabComponent {
  @Input() user!: User;
  dateTimeFormat = dateTimeFormat;

  private repositoriesService = inject(GetRepositoriesService)
  repositories!: (Repository & { commits: Commit[] })[];
  private cacheRepositories: Record<string, (Repository & { commits: Commit[] })[]> = {};
  sortPopUpIsdisplayed: boolean = false;

  sortButtons = [
    {active: false, sortFn: this.sortByDate.bind(this), name: 'Last Updated'},
    {active: true, sortFn: this.sortByName.bind(this), name: 'Name'},
    {active: false, sortFn: this.sortByStars.bind(this), name: 'Stars'},
  ]

  ngOnInit(): void {
    this.repositoriesService.getRepositories(this.user.repos_url).subscribe((repositories) => {
      const commitPromises: Promise<Commit[]>[] = repositories.map((repository) => {
        return fetchGithub(repository.commits_url.replace('{/sha}', '')).then((response) => {
          return response.json()
        });
      })

      Promise.allSettled(commitPromises).then((res) => {
        const commitsForEachRepo = res.map((result => {
          if (result.status === 'fulfilled') {
            return result.value
          }
          return [];
        }))
        this.repositories = repositories.map((repository, index) => {
          return {
            ...repository,
            commits: commitsForEachRepo[index]
          }
        })
        this.cacheRepositories[''] = this.repositories;
      })
    })
  }


  protected readonly faStar = faStar;
  protected readonly faChevronDown = faChevronDown;

  protected readonly faCaretDown = faCaretDown;

  filterResults(event: Event) {
    const word = (event?.target as HTMLInputElement).value.trim();
    this.repositories = this.cacheRepositories[''].filter((repository) => {
      return repository.name.includes(word)
    })

    this.cacheRepositories[word] = this.repositories;
  }

  sortByName() {
    this.sortButtons.forEach((button) => {
      button.active = false;
    })
    this.sortButtons.find(btn => btn.name === 'Name')!.active = true;
    this.repositories.sort((a, b) => {
      return a.name.localeCompare(b.name)
    })
  }

  sortByDate() {
    this.sortButtons.forEach((button) => {
      button.active = false;
    })
    this.sortButtons.find(btn => btn.name === 'Last Updated')!.active = true;
    this.repositories.sort((a, b) => {
      const dateA = new Date(b.commits.at(0)?.commit?.committer?.date as string).getTime();
      const dateB = new Date(a.commits.at(0)?.commit?.committer?.date as string).getTime();
      return dateA - dateB;
    })
  }

  sortByStars() {
    // right now it's not working, so I'm just sorting randomly
    this.sortButtons.forEach((button) => {
      button.active = false;
    })
    this.sortButtons.find(btn => btn.name === 'Stars')!.active = true;
    this.repositories.sort((a, b) => {
      return Math.random() - 0.5;
    })
  }

  protected readonly Date = Date;

  toggleSortPopUp(event: Event) {
    const pooUp = (event.target as HTMLElement).closest('.absolute');
    if (pooUp) return;
    this.sortPopUpIsdisplayed = !this.sortPopUpIsdisplayed;
  }

  protected readonly faCheck = faCheck;
  protected readonly faClose = faClose;

  closePopUp() {
    this.sortPopUpIsdisplayed = false;
  }
}
