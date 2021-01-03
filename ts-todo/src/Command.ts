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
import chalk from "chalk";

export abstract class Command {
  constructor(public key: string, private desc: string) {}
  toString() {
    return chalk`{blue.bold ${this.key}}: ${this.desc}`;
  }
  abstract run(state: AppState): Promise<Action | void>;
}

export class CommandPrintTodos extends Command {
  constructor() {
    super('p', chalk`모든 할 일 {red.bold 출력}하기`);
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
    super('n', chalk`할 일 {red.bold 추가}하기`);
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
    super('d', chalk`할 일 {red.bold 제거}하기`);
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