import { Component } from '@angular/core';

@Component({
  selector: 'app-shell',
  template: `
    <div class="flex h-screen w-screen bg-base-200">
      <aside
        class="hidden md:flex w-64 shrink-0 flex-col bg-base-100 border-r border-base-300"
      >
        <div class="px-4 py-4 border-b border-base-300 font-semibold">
          Prototype
        </div>
        <nav class="flex-1 p-2">
          <ul class="menu w-full">
            <li>
              <a class="menu-active">
                <span class="material-icons text-base">check_circle</span>
                Todos
              </a>
            </li>
          </ul>
        </nav>
        <div
          class="px-4 py-3 border-t border-base-300 text-xs text-base-content/60"
        >
          Demo user
        </div>
      </aside>

      <main class="flex-1 overflow-auto">
        <div class="mx-auto max-w-3xl px-6 py-8">
          <ng-content />
        </div>
      </main>
    </div>
  `,
})
export class Shell {}
