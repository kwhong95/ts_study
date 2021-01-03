import { waitForInput } from "./input";
import { 
  Action,
  ActionDeleteTodo,
  ActionNewTodo, 
  AppState, 
  Priority, 
  PRIORITY_NAME_MAP 
} from "./type";
import { getIsVaildEnumValue } from "./util";

export abstract class Command {
  constructor(public key: string, private desc: string) {}
  toString() {
    return `${this.key}: ${this.desc}`;
  }
  abstract async run(state: AppState): Promise<Action | void>;
}

export class CommandPrintTodos extends Command {
  constructor() {
    super('p', '모든 할 일 출력하기');
  }
  async run(state: AppState): Promise<void> {
    for (const todo of state.todos) {
      const text = todo.toString();
      console.log(text);
    }
    await waitForInput('press any key: ');
  }
}

export class CommandNewTodo extends Command {
  constructor() {
    super('n', '할 일 추가하기');
  }
  async run(): Promise<ActionNewTodo| any> {
    const title = await waitForInput('title: ');
    const priorityStr = await waitForInput(`priority ${PRIORITY_NAME_MAP[Priority.High]}(${Priority.High}) ~ ${PRIORITY_NAME_MAP[Priority.Low]}(${Priority.Low}):`);
    const priority = Number(priorityStr);
    if (title && CommandNewTodo.getIsPriority(priority)) {
      return {
        type: 'newTodo',
        title,
        priority,
      };
    }
  }
  static getIsPriority(priority: number): priority is Priority {
    return getIsVaildEnumValue(Priority, priority);
  }
}

export class CommandDeleteTodo extends Command {
  constructor() {
    super('d', '할 일 제거하기');
  }
  async run(state: AppState): Promise<ActionDeleteTodo| any> {
    for ( const todo of state.todos ) {
      const text = todo.toString();
      console.log(text);
    }
    const idStr = await waitForInput('press todo id to delete: ');
    const id = Number(idStr);
    return {
      type: 'deleteTodo',
      id,
    };
  }
}