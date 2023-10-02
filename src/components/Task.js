// src/components/Task.js
import React, { useState } from "react";

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
    <>
      <li className="list-group-item">
        {isEditing ? (
          <>
            <input
              type="text"
              className="form-control"
              placeholder="Add a new task"
              value={editedTask}
              onChange={(e) => setEditedTask(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary my-1 btn-sm"
                type="button"
                onClick={handleSave}
              >
                save
              </button>
            </div>
          </>
        ) : (
          <div className="row">
            <div class="col-md-8">{task}</div>
            <div class="col-md-4 text-right">
              <button
                className="btn btn-warning btn-sm float-right mx-2"
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm float-right mx-2"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </li>
    </>
  );
};

export default Task;
