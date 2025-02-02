
import React, { useState } from "react";
import { Task } from "../interfaces/Task";
import "./TaskForm.css";

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  onCancel: () => void;
  initialTask?: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel, initialTask }) => {
  const [taskName, setTaskName] = useState(initialTask?.taskName || "");
  const [priority, setPriority] = useState(initialTask?.priority || "");
  const [status, setStatus] = useState(initialTask?.status || "");
  const [dueDate, setDueDate] = useState(initialTask?.dueDate || "");
  const [projectName, setProjectName] = useState(initialTask?.projectName || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const task: Task = {
      id: initialTask?.id || Date.now(),
      taskName,
      priority,
      status,
      dueDate,
      projectName,
    };
    onSubmit(task);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{initialTask ? "Edit Task" : "Add New Task"}</h2>
      <div className="form-group">
        <label>Task Name</label>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
          <option value="">Select Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <div className="form-group">
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="">Select Status</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="form-group">
        <label>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Project Name</label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="submit-btn">
          {initialTask ? "Update Task" : "Add Task"}
        </button>
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskForm;