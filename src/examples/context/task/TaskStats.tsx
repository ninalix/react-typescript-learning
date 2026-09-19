import { useTasks } from "../../hooks/useTasks";
import { useMemo, useState } from "react";

function TaskStats() {
  const { state } = useTasks();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"title" | "completed">("title");

  const completed = useMemo(() => {
    return state.tasks.filter(task => task.completed).length;
  }, [state.tasks]);
  
  const visibleTasks = useMemo(() => {
    const filteredTasks = state.tasks.filter(task => 
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if(sortBy === "title") {
      filteredTasks.sort((a, b) => 
        a.title.localeCompare(b.title)
      );
    }

    if(sortBy === "completed") {
      filteredTasks.sort((a, b) =>
        Number(a.completed) - Number(b.completed)
      )
    }
    return filteredTasks;
  }, [state.tasks, searchTerm, sortBy]);

  const handleToggle = useCallback((id: number) => {
    setUsers(prev =>
      prev.map(user => 
        user.id === id
        ? {...user, active: !user.active}
        : user
      )
    )
  }, []);

  return(
    <>
      <p>Total: {state.tasks.length}</p>
      <p>Completed: {completed}</p>
    </>
  );
}

export default TaskStats