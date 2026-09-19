import type { User } from "./types"

export type State = {
  users: User[];
  loading: boolean;
  error: string;
};

export const initialState: State = {
  users: [],
  loading: false,
  error: ""
};

export type Action = 
  | { type: "addUser", user: User}
  | { type: "deleteUser", id: number}
  | { type: "toggleUser", id: number}
  | { type: "updateUser", user: User}
  | { type: "loadStart"}
  | { type: "loadSuccess", users: User[]}
  | { type: "loadError", error: string}
  | { type: "clearError"}

export function userReducer(state: State, action: Action): State {
  if(action.type === "addUser") {
    return {
      ...state,
      users: [...state.users, action.user]
    }
  }

  if(action.type === "deleteUser") {
    return {
      ...state,
      users: state.users.filter(user => user.id !== action.id)
    }
  }

  if(action.type === "toggleUser") {
    return {
      ...state,
      users: state.users.map(user => 
        user.id === action.id
        ? {...user, active: !user.active}
        : user
      )
    }
  }

  if(action.type === "updateUser") {
    return {
      ...state,
      users: state.users.map(user => 
        user.id === action.user.id
        ? action.user
        : user
      )
    }
  }

  if(action.type === "loadStart") {
    return {
      ...state,
      loading: true,
      error: ""
    }
  }

  if(action.type === "loadSuccess") {
    return {
      ...state,
      users: action.users,
      loading: false,
      error: ""
    }
  }

  if(action.type === "loadError") {
    return {
      ...state,
      loading: false,
      error: action.error
    }
  }

  if(action.type === "clearError") {
    return {
      ...state,
      error: ""
    }
  }

  return state;
}