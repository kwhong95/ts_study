import Todo from "./Todo";

export enum Priority {
  High,
  Medium,
  Low,
}

export interface AppState {
  todos: Todo[];
}