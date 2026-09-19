import { useReducer } from "react";

type Action = 
  | { type: "increment" }
  | { type: "decrement"}
  | { type: "reset" }
  | { type: "add", amount: number}

function reducer(state: number, action: Action) {
  if(action.type === "increment") {
    return state + 1;
  }

  if(action.type === "decrement") {
    return state -1;
  }

  if(action.type === "reset") {
    return 0;
  }

  if(action.type === "add") {
    return state + action.amount;
  }

  return state;
}

function ReducerCounter() {
  const [count, dispatch] = useReducer(reducer,0);

  return(
    <>
      <p>Count: {count}</p>
      <button onClick={() => dispatch({type: "increment"})}>+</button>
      <button onClick={() => dispatch({type: "decrement"})}>-</button>
      <button onClick={() => dispatch({type: "reset"})}>Reset</button>
      <button onClick={() => dispatch({type: "add", amount: 5})}>Add</button>
    </>
  );
}

export default ReducerCounter