import {Component, inject, OnInit} from '@angular/core';
import {GetUsersService, User} from "../../services/get-users.service";
import {ActivatedRoute} from "@angular/router";
import {mergeMap} from "rxjs";
import {Repository} from "../../services/get-repositories.service";
import {faStar} from "@fortawesome/free-regular-svg-icons";
import {faBook, faCodeFork, faBars, faPlus, faTerminal, faCubes, faCube} from "@fortawesome/free-solid-svg-icons";
import {faGithub} from "@fortawesome/fontawesome-free-brands";
import {IconProp, Params} from "@fortawesome/fontawesome-svg-core";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons/faChevronDown";
import {faCodeCommit} from "@fortawesome/free-solid-svg-icons/faCodeCommit";
import {faCodePullRequest} from "@fortawesome/free-solid-svg-icons/faCodePullRequest";
import {faBoxArchive} from "@fortawesome/free-solid-svg-icons/faBoxArchive";
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";
import {fetchGithub} from "../../services/get-commits.service";

type Tab = {
  icon: IconProp;
  name: string;
  active: boolean;
  count?: number;
  hasCount: boolean;
}


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})


export class UserComponent implements OnInit {
  tabs: Tab[] = [
    {icon: faBook, name: 'Overview', hasCount: false, active: false,},
    {icon: faCodeFork, name: 'Repositories', hasCount: true, count: 0, active: false},
    {icon: faCubes, name: 'Projects', hasCount: false, count: 0, active: false},
    {icon: faCube, name: 'Packages', hasCount: false, count: 0, active: false},
    {icon: faStar, name: 'Stars', active: false, hasCount: true, count: 0},
  ]
  private usersService = inject(GetUsersService)
  private route = inject(ActivatedRoute)
  public user!: User
  currentRoute!: string;
  currentTabName!: string;


  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.tabs.forEach(tab => tab.active = false);
      this.currentTabName = params['tab'] || 'overview';
      this.tabs.forEach(tab => {
        if (params['tab'] === tab.name.toLowerCase()) tab.active = true;
      })

      if (params['tab'] === undefined) {
        this.tabs.find(tab => tab.name === 'Overview')!.active = true;
      }
    });

    this.currentRoute = this.route.snapshot.url.join('/');

    this.route.params.pipe(
      mergeMap(({user}) => this.usersService.getUser(user)),
    ).subscribe((user) => {
      this.user = user;
      fetchGithub(user.repos_url).then(res => res.json()).then((repos: Repository[]) => {
        this.tabs.find(tab => tab.name === 'Repositories')!.count = repos.length;
      })
    });

  }


  protected readonly faBars = faBars;
  protected readonly faGithub = faGithub as IconProp;
  protected readonly faPlus = faPlus;
  protected readonly faChevronDown = faChevronDown;
  protected readonly faCodeCommit = faCodeCommit;
  protected readonly faCodePullRequest = faCodePullRequest;
  protected readonly faBoxArchive = faBoxArchive;
  protected readonly faTerminal = faTerminal;
  protected readonly faSearch = faSearch;

  getTabName(name: string) {
    if (name === 'Overview') return '';
    return name.toLowerCase();
  }
}
