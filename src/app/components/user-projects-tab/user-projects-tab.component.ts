import {Component, inject, Input, OnInit} from '@angular/core';
import {User} from "../../services/get-users.service";

@Component({
  selector: 'app-user-projects-tab',
  templateUrl: './user-projects-tab.component.html',
  styleUrls: ['./user-projects-tab.component.scss']
})
export class UserProjectsTabComponent implements OnInit {
  @Input() user!: User;

  ngOnInit(): void {
  }
}
