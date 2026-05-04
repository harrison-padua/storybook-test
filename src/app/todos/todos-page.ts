import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoStore } from './todo-store';

@Component({
  selector: 'app-todos-page',
  imports: [FormsModule],
  template: `
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold">Todos</h1>
      <span class="text-sm text-base-content/60">
        {{ store.remaining() }} of {{ store.todos().length }} remaining
      </span>
    </div>

    <div class="card bg-base-100 border border-base-300 mb-4">
      <div class="card-body">
        <h2 class="card-title text-lg">Add a todo</h2>
        <form
          class="join w-full"
          (ngSubmit)="submit()"
        >
          <input
            type="text"
            class="input join-item w-full"
            placeholder="What needs doing?"
            [(ngModel)]="draft"
            name="draft"
            aria-label="New todo"
          />
          <button
            type="submit"
            class="btn btn-primary join-item"
            [disabled]="!draft().trim()"
          >
            Add
          </button>
        </form>
      </div>
    </div>

    @if (store.todos().length === 0) {
      <div class="card bg-base-100 border border-base-300">
        <div class="card-body items-center py-16 text-center">
          <h2 class="card-title text-lg">No todos yet</h2>
          <p class="text-base-content/60">
            Add your first one above to get started.
          </p>
        </div>
      </div>
    } @else {
      <div class="card bg-base-100 border border-base-300">
        <div class="card-body p-0">
          <ul class="list">
            @for (todo of store.todos(); track todo.id) {
              <li class="list-row items-center">
                <label
                  class="label cursor-pointer justify-start gap-3 list-col-grow"
                >
                  <input
                    type="checkbox"
                    class="checkbox"
                    [checked]="todo.done"
                    (change)="store.toggle(todo.id)"
                    [attr.aria-label]="'Mark ' + todo.text"
                  />
                  <span
                    class="label-text {{
                      todo.done ? 'line-through text-base-content/40' : ''
                    }}"
                  >
                    {{ todo.text }}
                  </span>
                </label>
                <button
                  type="button"
                  class="btn btn-ghost btn-sm btn-square text-error"
                  (click)="store.remove(todo.id)"
                  aria-label="Delete todo"
                  title="Delete todo"
                >
                  <span class="material-icons text-base">delete</span>
                </button>
              </li>
            }
          </ul>
        </div>
        @if (store.todos().length - store.remaining() > 0) {
          <div class="border-t border-base-300 px-4 py-3 flex justify-end">
            <button
              type="button"
              class="btn btn-ghost btn-sm"
              (click)="store.clearCompleted()"
            >
              Clear completed
            </button>
          </div>
        }
      </div>
    }
  `,
})
export class TodosPage {
  protected readonly store = inject(TodoStore);
  protected readonly draft = signal('');

  submit() {
    this.store.add(this.draft());
    this.draft.set('');
  }
}
