import { useContext } from "react";
import { UserContext } from "../context/users/UserContext";

function useUsers() {
  const context = useContext(UserContext);

  if(!context) {
    throw new Error("useUsers must be used within UserProvider");
  }

  return context;
} 

export default useUsers