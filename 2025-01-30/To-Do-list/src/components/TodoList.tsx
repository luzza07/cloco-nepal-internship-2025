
import React, { useState } from "react";
import TaskTable from "./TaskTable";
import TaskForm from "./TaskForm";
import DeleteConfirmation from "./DeleteConfirmation";
import { Task } from "../interfaces/Task";
import "./TodoList.css";

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const handleAddTask = () => {
    setEditingTask(undefined);
    setShowForm(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDeleteTask = (task: Task) => {
    setTaskToDelete(task);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      setTasks(tasks.filter((t) => t.id !== taskToDelete.id));
      setTaskToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setTaskToDelete(null);
  };

  const handleFormSubmit = (task: Task) => {
    if (editingTask) {
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    } else {
      setTasks([...tasks, task]);
    }
    setShowForm(false);
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <button className="add-button" onClick={handleAddTask}>
        Add Task
      </button>
      {showForm && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <TaskForm
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
              initialTask={editingTask}
            />
          </div>
        </div>
      )}
      <TaskTable tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />
      {taskToDelete && (
        <DeleteConfirmation
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default TodoList;