import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';

import { UserService } from '../users/user.service';
import { ToDo } from './todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient);
  userService = inject(UserService);

  todoUrl = 'https://jsonplaceholder.typicode.com/todos?userId=';

  userTasks = signal<ToDo[]>([]);
  private userTask$ = toObservable(this.userService.selectedUserId).pipe(
    switchMap((userId) =>
      this.http
        .get<ToDo[]>(this.todoUrl + userId)
        .pipe(tap((tasks) => this.userTasks.set(tasks)))
    )
  );

  readOnlyuserTasks = toSignal(this.userTask$, { initialValue: [] as ToDo[] });

  markComplete(task: ToDo) {
    this.userTasks.mutate(() => (task.completed = true));
  }
}
