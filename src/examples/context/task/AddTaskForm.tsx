import { useState } from "react";
import { useTasks } from "../../hooks/useTasks";

function AddTaskForm() {
  const { dispatch } = useTasks();
  const [title, setTitle] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    dispatch({
      type: "addTask",
      task: {
        id: Date.now(),
        title: title,
        completed: false
      }
    })

    setTitle("");
  }

  return(
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="input">Title</label>
        <input id="input" value={title} onChange={(e) => setTitle(e.target.value)}/>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddTaskForm