import { useState } from 'react'

const Home = (props) => {
  const [taskLists, setTaskLists] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const addTaskList = () => {
    if (taskText.trim() !== '') {
      const newList = {
        id: Date.now(), // Unique identifier (use a more robust method in production)
        title: taskText,
        tasks: [],
      };
      setTaskLists([...taskLists, newList]);
      setTaskText('');
    }
  };

  const addTask = (listId, taskText) => {
    const updatedLists = taskLists.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          tasks: [...list.tasks, taskText],
        };
      }
      return list;
    });
    setTaskLists(updatedLists);
  };

  const editTask = (listId, taskIndex) => {
    setEditIndex({ listId, taskIndex });
  };

  const saveEditedTask = (listId, taskIndex, newText) => {
    const updatedLists = taskLists.map((list) => {
      if (list.id === listId) {
        const updatedTasks = [...list.tasks];
        updatedTasks[taskIndex] = newText;
        return {
          ...list,
          tasks: updatedTasks,
        };
      }
      return list;
    });
    setTaskLists(updatedLists);
    setEditIndex(null);
  };

  const removeTask = (listId, taskIndex) => {
    const updatedLists = taskLists.map((list) => {
      if (list.id === listId) {
        const updatedTasks = [...list.tasks];
        updatedTasks.splice(taskIndex, 1);
        return {
          ...list,
          tasks: updatedTasks,
        };
      }
      return list;
    });
    setTaskLists(updatedLists);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">ToDo List</h1>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Add a new list"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-success"
                type="button"
                onClick={addTaskList}
              >
                Add List
              </button>
            </div>
          </div>
          {taskLists.map((taskList) => (
            <div key={taskList.id}>
              <h3>{taskList.title}</h3>
              <ul className="list-group">
                {taskList.tasks.map((task, taskIndex) => (
                  <li
                    key={taskIndex}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {editIndex &&
                    editIndex.listId === taskList.id &&
                    editIndex.taskIndex === taskIndex ? (
                      <input
                        type="text"
                        value={task}
                        onChange={(e) =>
                          saveEditedTask(
                            taskList.id,
                            taskIndex,
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      task
                    )}
                    <div>
                      {editIndex &&
                      editIndex.listId === taskList.id &&
                      editIndex.taskIndex === taskIndex ? (
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() =>
                            saveEditedTask(
                              taskList.id,
                              taskIndex,
                              task
                            )
                          }
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          className="btn btn-warning btn-sm mr-2"
                          onClick={() =>
                            editTask(taskList.id, taskIndex)
                          }
                        >
                          Edit
                        </button>
                      )}
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeTask(taskList.id, taskIndex)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-3">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add a task"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-success"
                      type="button"
                      onClick={() => addTask(taskList.id, taskText)}
                    >
                      Add Task
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home

