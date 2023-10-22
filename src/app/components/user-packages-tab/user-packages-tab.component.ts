import {Component, Input} from '@angular/core';
import {User} from "../../services/get-users.service";

@Component({
  selector: 'app-user-packages-tab',
  templateUrl: './user-packages-tab.component.html',
  styleUrls: ['./user-packages-tab.component.scss']
})
export class UserPackagesTabComponent {
  @Input() user!: User;
}
