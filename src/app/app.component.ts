import { Component } from '@angular/core';

import { UserShellComponent } from './users/user-shell/user-shell.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserShellComponent],
  template: `
    <div class="container">
      <app-user-shell />
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'task-list';
}
