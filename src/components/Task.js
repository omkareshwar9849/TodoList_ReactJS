// src/components/Task.js
import React, { useState } from 'react';

const Task = ({ index, task, modifyTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    modifyTask(index, editedTask);
    setIsEditing(false);
  };

  return (
    <li className="list-group-item">
      {isEditing ? (
        <>
          <input
            type="text"
            className="form-control"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
          <button className="btn btn-success" onClick={handleSave}>
            Save
          </button>
        </>
      ) : (
        <>
          {task}
          <button className="btn btn-warning float-right ml-2" onClick={handleEdit}>
            Edit
          </button>
          <button className="btn btn-danger float-right" onClick={() => deleteTask(index)}>
            Delete
          </button>
        </>
      )}
    </li>
  );
};

export default Task;
