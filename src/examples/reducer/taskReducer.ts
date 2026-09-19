export type Task = {
  id: number;
  title: string;
  completed: boolean;
}

export type State = {
  tasks: Task[];
}

export const initialState: State = {
  tasks: []
};

export type Action = 
  | { type: "addTask", task: Task }
  | { type: "deleteTask", id: number }
  | { type: "toggleTask", id: number }

export function taskReducer(state: State, action: Action): State {
  switch(action.type) {
    case "addTask":
      return {
        ...state,
        tasks: [...state.tasks, action.task]
      };

    case "deleteTask":
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.id)
      };

    case "toggleTask": 
      return {
        ...state,
        tasks: state.tasks.map(task => (
          task.id === action.id
          ? {...task, completed: !task.completed}
          : task
        ))
      };

    default:
      return state;
  }
}