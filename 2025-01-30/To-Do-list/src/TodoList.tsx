import  { useState } from 'react';

const TodoList  = () => {
  
  const [tasks, setTasks] = useState<{ id: number; text: string; isEditing: boolean }[]>([]);


  const [newTask, setNewTask] = useState<string>('');

  const addTask = () => {
    if (newTask.trim() === '') return;
    const task = {
      id: Date.now(),
      text: newTask,
      isEditing: false,
    };
    setTasks([...tasks, task]);
    setNewTask('');
  };


  const startEditing = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: true } : task
      )
    );
  };


  const saveEdit = (id: number, newText: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText, isEditing: false } : task
      )
    );
  };


  const deleteTask = (id: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.isEditing ? (
              <>
                <input
                  type="text"
                  defaultValue={task.text}
                  onBlur={(e) => saveEdit(task.id, e.target.value)}
                />
                <button onClick={() => saveEdit(task.id, task.text)}>Save</button>
              </>
            ) : (
              <>
                {task.text}
                <button onClick={() => startEditing(task.id)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;