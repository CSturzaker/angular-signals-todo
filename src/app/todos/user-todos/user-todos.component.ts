import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoService } from '../todo.service';

import { ToDo } from '../todo';

@Component({
  selector: 'app-user-todos',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card" *ngIf="userTasks().length">
      <div class="card-header">
        {{ pageTitle() }}
      </div>

      <div class="card-body">
        <div style="height: 40px;" class="row" *ngFor="let task of userTasks()">
          <div class="col-md-6">{{ task.title }}</div>
          <div class="col-md-2">{{ task.completed }}</div>
          <div class="col-md-4">
            <button
              class="btn btn-primary"
              *ngIf="!task.completed"
              (click)="markComplete(task)"
            >
              Mark as Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./user-todos.component.scss'],
})
export class UserTodosComponent {
  todoService = inject(TodoService);


  userTasks = this.todoService.userTasks;
  completedCount = computed(() => this.userTasks().filter(task => task.completed).length)
  pageTitle = computed(() => `User Task - ${this.completedCount()} completed`);

  markComplete(task: ToDo) {
    this.todoService.markComplete(task);
  }
}
