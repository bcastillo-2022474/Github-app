import {Component, inject, OnInit} from '@angular/core';
import {User} from "../../services/get-users.service";
import {Input} from "@angular/core";
import {GetRepositoriesService, Repository} from "../../services/get-repositories.service";
import {NgSelectComponent} from "@ng-select/ng-select";

const wait = (sec: number) => new Promise(resolve => setTimeout(resolve, sec * 1000));

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input('user') user!: User;
  repositories!: Repository[];
  private getRepositories = inject(GetRepositoriesService);
  isFocused = false;

  onFocus() {
    console.log('focus')
    if (this.isFocused) return;
    this.isFocused = true;
    this.getRepositories.getRepositories(this.user.repos_url).subscribe(repositories => {
      this.repositories = repositories;
    });
  }

  ngOnInit(): void {
  }

  copyUrl(event: MouseEvent, select: NgSelectComponent) {
    const button = (event.target as HTMLElement)?.closest?.('button');
    if (!button) return;

    const repo = this.repositories.find(({name}) => name === select.selectedValues[0]);
    if (!repo) return;


    const textarea = document.createElement('textarea');
    textarea.value = repo?.git_url ?? '';
    document.body.appendChild(textarea);

    // Select the text within the textarea
    textarea.select();
    textarea.setSelectionRange(0, repo?.git_url?.length);

    // Copy the selected text to the clipboard
    document.execCommand('copy');

    // Remove the temporary textarea
    document.body.removeChild(textarea);

    button.textContent = 'Copied!';
    wait(2).then(() => button.textContent = 'Clone');
  }

  getRepoNames(repositories: Repository[]): string[] {
    if (!repositories) return [];
    return repositories.map(({name}) => name)
  }
}
