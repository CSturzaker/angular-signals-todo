import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <div class="card-header">
        {{ pageTitle }}
      </div>

      <div class="card-body" *ngIf="users().length">
        <div class="list-group">
          <button
            type="button"
            class="list-group-item"
            *ngFor="let user of users()"
            [ngClass]="{ active: user?.id === selectedUserId() }"
            (click)="onSelected(user.id)"
          >
            {{ user.name }}
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  userService = inject(UserService);

  pageTitle = 'User List';

  users = this.userService.users;
  selectedUserId = this.userService.selectedUserId;

  onSelected(id: number) {
    this.userService.setSelectedUser(id);
  }
}
