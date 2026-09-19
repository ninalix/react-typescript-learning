import { createContext, useReducer } from "react";
import type { State, Action } from "../../reducer/taskReducer"
import { taskReducer, initialState } from "../../reducer/taskReducer";

type TaskContextValue = {
  state: State;
  dispatch: React.Dispatch<Action>;
}

export const TaskContext = createContext<TaskContextValue | null>(null);

export function TaskProvider({children}: {children: React.ReactNode}) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return(
    <TaskContext.Provider value={{state, dispatch}}>
      {children}
    </TaskContext.Provider>
  );
}