import { Injectable, computed, effect, signal } from '@angular/core';

export interface Todo {
  id: string;
  text: string;
  done: boolean;
}

const STORAGE_KEY = 'prototype.todos.v1';

function load(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

@Injectable({ providedIn: 'root' })
export class TodoStore {
  private readonly _todos = signal<Todo[]>(load());

  readonly todos = this._todos.asReadonly();
  readonly remaining = computed(
    () => this._todos().filter((t) => !t.done).length,
  );

  constructor() {
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._todos()));
    });
  }

  add(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    this._todos.update((list) => [
      ...list,
      { id: crypto.randomUUID(), text: trimmed, done: false },
    ]);
  }

  toggle(id: string) {
    this._todos.update((list) =>
      list.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  }

  remove(id: string) {
    this._todos.update((list) => list.filter((t) => t.id !== id));
  }

  clearCompleted() {
    this._todos.update((list) => list.filter((t) => !t.done));
  }
}
