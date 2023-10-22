import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {GetUsersService, User} from "../../services/get-users.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users!: User[]
  getUsersService = inject(GetUsersService);
  cache: { [key: string]: User[] } = {};
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.getUsersService.getUsers().subscribe(users => {
      this.users = users;
      this.cache[''] = users;
    });
  }

  filterUsers($event: Event) {
    const value = ($event.target as HTMLInputElement).value;
    this.cache[value] = this.cache[value] || this.cache[''].filter(({login}) => login.toLowerCase().includes(value.toLowerCase()));
    this.users = this.cache[value];
  }
}
