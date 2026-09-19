import { createContext, useReducer } from "react";
import type { ReactNode } from "react";
import type { State } from "../../reducer/user-management/userReducer";
import type { Action } from "../../reducer/user-management/userReducer";
import { userReducer, initialState } from "../../reducer/user-management/userReducer";

type UserContextValue = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

export const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({children}: { children: React.ReactNode}) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      { children }
    </UserContext.Provider>
  );
}