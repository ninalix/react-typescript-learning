import { useReducer } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  active: boolean;
};

type State = {
  users: User[];
  loading: boolean;
  error: string;
};

const initialState: State = {
  users: [],
  loading: false,
  error: ""
};

type Action = 
  | { type: "addUser", user: User}
  | { type: "deleteUser", id: number}
  | { type: "toggleUser", id: number}
  | { type: "updateUser", user: User}
  | { type: "loadStart"}
  | { type: "loadSuccess", users: User[]}
  | { type: "loadError", error: string}

function reducer(state: State, action: Action) {
  switch(action.type) {
    case "addUser":
      return {
        ...state,
        users: [...state.users, action.user]
      };

    case "deleteUser":
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      };

    case "toggleUser":
      return {
        ...state,
        users: state.users.map(user => 
          user.id === action.id
            ? { ...user, active: !user.active }
            : user
        )
      };

    default: 
      return state;
  }

  // if(action.type === "addUser") {
  //   return {
  //     ...state,
  //     users: [...state.users, action.user]
  //   };
  // }

  // if(action.type === "deleteUser") {
  //   return {
  //     ...state,
  //     users: state.users.filter(user => user.id !== action.id)
  //   };
  // }

  // if(action.type === "toggleUser") {
  //   return {
  //     ...state,
  //     users: state.users.map(user => 
  //       user.id === action.id
  //         ? { ...user, active: !user.active }
  //         : user
  //     )
  //   };
  // }

  if(action.type === "updateUser") {
    return {
      ...state,
      users: state.users.map(user => 
        user.id === action.user.id
        ? action.user
        : user
      )
    };
  }

  if (action.type === "loadStart") {
    return {
      ...state,
      loading: true,
      error: ""
    };
  }

  if (action.type === "loadSuccess") {
    return {
      ...state,
      users: action.users,
      loading: false,
      error: ""
    };
  }

  if (action.type === "loadError") {
    return {
      ...state,
      loading: false,
      error: action.error
    };
  }

  return state;
}

function ReducerUserManagement() {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function fetchUsers() {
    dispatch({
      type: "loadStart"
    })

    try {
      const response = await fetch("");

      if(!response.ok) {
        throw new Error("Failed to get users.");
      }

      const data = await response.json();

      dispatch({
        type: "loadSuccess",
        users: data
      })
    } catch(error) {
      dispatch({
        type: "loadError",
        error: error instanceof Error
          ? error.message
          : "Failed to get users."
      });
    }
  }

  function handleAddUser(user: User) {
    dispatch({
      type: "addUser",
      user: user
    })
  }

  function handleDelete(id: number) {
    dispatch({
      type: "deleteUser",
      id: id
    })
  }

  function handleSave(updatedUser: User) {
    dispatch({
      type: "updateUser",
      user: updatedUser
    })
  }
}

export default ReducerUserManagement