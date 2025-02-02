
import React from "react";
import { Task } from "../interfaces/Task";
import "./TaskTable.css";

interface TaskTableProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onEdit, onDelete }) => {
  return (
    <table className="task-table">
      <thead>
        <tr>
          <th>Task Name</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Due Date</th>
          <th>Project Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.taskName}</td>
            <td>{task.priority}</td>
            <td>{task.status}</td>
            <td>{task.dueDate}</td>
            <td>{task.projectName}</td>
            <td>
              <button className="edit-btn" onClick={() => onEdit(task)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => onDelete(task)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;