import { useTasks } from "../../hooks/useTasks"

function TaskList() {
  const {state, dispatch} = useTasks();

  return(
    <>
      {state.tasks.map(task => (
        <div key={task.id}>
          {task.title}
          <button onClick={() => dispatch({
            type: "toggleTask",
            id: task.id
          })}>{task.completed ? "Undo" : "Complete"}</button>
          <button onClick={() => dispatch({
            type: "deleteTask",
            id: task.id
          })}>Delete</button>
        </div>
      ))}
    </>
  );
}

export default TaskList