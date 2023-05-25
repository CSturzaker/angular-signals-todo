import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

import { toSignal } from '@angular/core/rxjs-interop';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient);
  userUrl = 'https://jsonplaceholder.typicode.com/users';

  private users$ = this.http.get<User[]>(this.userUrl);

  users = toSignal(this.users$, { initialValue: [] as User[]});
  selectedUserId = signal(0);

  setSelectedUser(id: number) {
    this.selectedUserId.set(id);
  }

}


