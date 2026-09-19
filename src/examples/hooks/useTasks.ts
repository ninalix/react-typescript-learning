import { useContext } from "react";
import { TaskContext } from "../context/task/TaskContext"

export function useTasks() {
  const context = useContext(TaskContext);

  if(!context) {
    throw new Error("useTasks must be used within TaskProvider");
  }

  return context;
}