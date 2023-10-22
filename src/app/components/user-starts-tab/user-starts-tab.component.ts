import {Component, Input} from '@angular/core';
import {User} from "../../services/get-users.service";

@Component({
  selector: 'app-user-starts-tab',
  templateUrl: './user-starts-tab.component.html',
  styleUrls: ['./user-starts-tab.component.scss']
})
export class UserStartsTabComponent {
  @Input() user!: User;
}
