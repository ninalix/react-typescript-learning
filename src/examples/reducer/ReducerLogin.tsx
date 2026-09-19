import { useReducer } from "react";

type State = {
  username: string;
  password: string;
  showPassword: boolean;
};

const initialState: State = {
  username: "",
  password: "",
  showPassword: false
};

type Action = 
  | { type: "setUsername", value: string}
  | { type: "setPassword", value: string}
  | { type: "togglePassword"}

function reducer(state: State, action: Action) {
  if(action.type === "setUsername") {
    return {
      ...state,
      username: action.value
    }
  }

  if(action.type === "setPassword") {
    return {
      ...state,
      password: action.value
    }
  }

  if(action.type === "togglePassword") {
    return {
      ...state,
      showPassword: !state.showPassword
    }
  }

  return state;
}

function ReducerLogin() {
  const [state, dispatch] = useReducer(reducer, initialState);
}